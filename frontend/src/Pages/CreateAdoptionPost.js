import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { adoptionPostCreateAction } from '../actions/adoptionActions';
import Button from '../Components/Button';
import Checkbox from '../Components/IO/Checkbox';
import SelectBox from '../Components/IO/SelectBox';
import TextInput from '../Components/IO/TextInput';
import Loader from '../Components/Loader';
import UploadLoader from '../Components/UploadLoader/UploadLoader';
import Message from '../Components/Message';
import Topbar from '../Components/Topbar';

import { PRODUCTION_URL } from '../Utils/Production';

const BASE_URL = PRODUCTION_URL;

const FileUpload = ({ rawData, setData, setUploading, userInfo, id }) => {
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      console.log('No file selected');
      return;
    }

    // Show preview immediately
    const reader = new FileReader();
    reader.onload = (e) => {
      setData(e.target.result); // Show local preview
    };
    reader.readAsDataURL(file);

    const formData = new FormData();
    formData.append('file', file);
    setUploading(true);

    try {
      // Build config - don't set Content-Type for FormData, let axios handle it
      const config = {
        headers: {}
      };

      // Add auth token if available (endpoint is permitAll but token might be needed)
      if (userInfo?.jwtdto?.accessToken) {
        config.headers.Authorization = `Bearer ${userInfo.jwtdto.accessToken}`;
      }

      // Don't set Content-Type - axios will set it automatically with boundary for FormData
      console.log('Uploading file:', file.name, 'Size:', file.size, 'Type:', file.type);
      console.log('Upload URL:', `${BASE_URL}/api/files/upload`);
      
      const response = await axios.post(
        `${BASE_URL}/api/files/upload`,
        formData,
        config
      );

      console.log('Upload response:', response);
      console.log('Response data:', response.data);
      console.log('Response data type:', typeof response.data);
      
      // Backend can return:
      // 1. Plain string URL (direct return from controller)
      // 2. Wrapped in ApiResponse { success: true, data: "url" }
      // 3. Error wrapped in ApiResponse { success: false, message: "error" }
      
      let imageUrl = response.data;
      
      // Handle ApiResponse wrapper
      if (typeof imageUrl === 'object') {
        // Check if it's an error response
        if (imageUrl.success === false) {
          throw new Error(imageUrl.message || 'Upload failed');
        }
        // Check if it's a success response with data
        if (imageUrl.success === true && imageUrl.data) {
          imageUrl = imageUrl.data;
        } else if (imageUrl.data) {
          imageUrl = imageUrl.data;
        } else if (imageUrl.url) {
          imageUrl = imageUrl.url;
        } else if (imageUrl.message && imageUrl.success === false) {
          throw new Error(imageUrl.message);
        }
      }
      
      // Ensure we have a valid URL string
      if (!imageUrl || typeof imageUrl !== 'string') {
        console.error('Unexpected response format:', response.data);
        throw new Error('Invalid response from server. Expected image URL but got: ' + JSON.stringify(response.data));
      }
      
      // Validate it's a valid URL
      if (!imageUrl.startsWith('http://') && !imageUrl.startsWith('https://') && !imageUrl.startsWith('data:')) {
        console.warn('Received URL might be invalid:', imageUrl);
      }

      console.log('Image URL received:', imageUrl);
      
      // Set the uploaded image URL
      setData(imageUrl);
      setUploading(false);
      
      console.log('Image uploaded successfully:', imageUrl);
    } catch (error) {
      console.error('Upload error:', error);
      console.error('Error response:', error.response);
      console.error('Error status:', error.response?.status);
      console.error('Error data:', error.response?.data);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
      
      // Keep the local preview even if upload fails
      // Don't reset to placeholder - let user see what they selected
      setUploading(false);
      
      // Show more detailed error message
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error ||
                          error.message || 
                          'Failed to upload image. Please check your connection and try again.';
      
      alert(`Upload failed: ${errorMessage}`);
    }
  };
  
  return (
    <>
      <label
        htmlFor={id}
        style={{
          backgroundImage: `url(${rawData})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundColor: rawData.includes('ImagePlaceholder') ? '#f3f4f6' : 'transparent'
        }}
        className="text-[12px] block mt-5 lg:mt-0 w-[100%] lg:w-[32%] h-[300px] lg:h-[200px] xl:h-[300px] 2xl:h-[400px] cursor-pointer font-bold text-[transparent] py-[35px] px-[25px] custom-round border-2 border-dashed border-gray-300 hover:border-primary transition-colors"
      >
        {rawData.includes('ImagePlaceholder') && (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <svg className="w-16 h-16 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span className="text-sm">Click to upload</span>
          </div>
        )}
      </label>
      <input
        id={id}
        onChange={uploadFileHandler}
        required
        style={{ visibility: 'hidden', position: 'absolute' }}
        type={'file'}
        accept="image/*"
      />
    </>
  );
};

export default function CreateAdoptionPost() {
  const [name, setName] = useState('');
  const [behaviour, setBehaviour] = useState('');
  const [location, setLocation] = useState('');
  const [food, setFood] = useState('');
  const [description, setDescription] = useState('');
  const [gender, setGender] = useState('');
  const [breed, setBreed] = useState('');
  const [physicalcondition, setPhysicalcondition] = useState('');
  const [vaccine, setVaccine] = useState(false);
  const [type, setType] = useState('');
  const [training, setTraining] = useState(false);
  const [color, setColor] = useState('');
  const [empty, setEmpty] = useState(false);
  const [mobile, setMobile] = useState();
  const [imageOne, setImageOne] = useState(
    '/assets/Icons/ImagePlaceholder.svg'
  );
  const [imageTwo, setImageTwo] = useState(
    '/assets/Icons/ImagePlaceholder.svg'
  );
  const [imageThree, setImageThree] = useState(
    '/assets/Icons/ImagePlaceholder.svg'
  );

  const [uploading, setUploading] = useState('');

  const dispatch = useDispatch();

  // Try to get userInfo from both old and new Redux structure
  const userLogin = useSelector((state) => state.userLogin);
  const authState = useSelector((state) => state.auth);
  
  // Get userInfo with fallback to localStorage
  let userInfo = authState?.userInfo || userLogin?.userInfo;
  if (!userInfo) {
    try {
      const stored = localStorage.getItem('userInfo');
      userInfo = stored ? JSON.parse(stored) : null;
    } catch (e) {
      console.error('Error parsing userInfo from localStorage:', e);
      userInfo = null;
    }
  }

  const createAdoptionPost = useSelector((state) => state.adoptionPostCreated);
  const { loading, success, error, adoptionPost } = createAdoptionPost;

  const navigate = useNavigate();
  const { id } = useParams();

  const dataport = {
    behaviour: behaviour,
    breed: breed,
    color: color,
    description: description,
    food: food,
    gender: gender,
    location: location,
    name: name,
    physicalcondition: physicalcondition,
    training: training,
    vaccine: vaccine,
    type: type,
    imageone: imageOne,
    imagetwo: imageTwo,
    imagethree: imageThree,
    mobile: mobile
  };

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }
  }, [userInfo]);

  var petType = ['Cat', 'Dog'];
  var genderType = ['Male', 'Female'];
  var healthType = ['Healthy', 'Conditioned'];
  var behaviourType = ['Playful', 'Calm'];

  const submitHandler = (e) => {
    e.preventDefault();
    console.log('Form submitted!', { id, dataport });
    
    // Check if at least one image is uploaded (not a placeholder)
    const imageOneIsUploaded = imageOne && !imageOne.includes('ImagePlaceholder.svg');
    const imageTwoIsUploaded = imageTwo && !imageTwo.includes('ImagePlaceholder.svg');
    const imageThreeIsUploaded = imageThree && !imageThree.includes('ImagePlaceholder.svg');
    const hasAtLeastOneImage = imageOneIsUploaded || imageTwoIsUploaded || imageThreeIsUploaded;
    
    // Convert booleans to strings for backend (backend expects strings)
    const trainingString = training ? 'Trained' : 'Not trained';
    const vaccineString = vaccine ? 'Vaccinated' : 'Not vaccinated';
    
    // Update dataport with actual image values (empty string if placeholder) and converted booleans
    const updatedDataport = {
      ...dataport,
      imageone: imageOneIsUploaded ? imageOne : '',
      imagetwo: imageTwoIsUploaded ? imageTwo : '',
      imagethree: imageThreeIsUploaded ? imageThree : '',
      training: trainingString,
      vaccine: vaccineString
    };
    
    // Validate user is logged in
    if (!userInfo || !userInfo.id) {
      alert('You must be logged in to create an adoption post. Please login first.');
      navigate('/login');
      return;
    }

    if (
      updatedDataport.behaviour &&
      updatedDataport.breed &&
      updatedDataport.color &&
      updatedDataport.description &&
      updatedDataport.food &&
      updatedDataport.gender &&
      updatedDataport.location &&
      updatedDataport.name &&
      updatedDataport.physicalcondition &&
      updatedDataport.type &&
      updatedDataport.mobile &&
      hasAtLeastOneImage
    ) {
      setEmpty(false);
      console.log('Dispatching adoption post creation...', { userInfo, updatedDataport });
      
      // Always use the logged-in user's ID, not the URL parameter
      const userId = userInfo.id.toString();
      console.log('Using user ID from userInfo:', userId);
      console.log('User info:', { id: userInfo.id, email: userInfo.email, username: userInfo.username });
      
      dispatch(adoptionPostCreateAction(userId, updatedDataport))
        .then(() => {
          console.log('Adoption post creation dispatched successfully');
        })
        .catch((error) => {
          console.error('Error in adoption post creation:', error);
          // Error is already handled by the action and displayed via error state
        });
    } else {
      setEmpty(true);
      console.log('Validation failed. Missing fields:', {
        behaviour: !!updatedDataport.behaviour,
        breed: !!updatedDataport.breed,
        color: !!updatedDataport.color,
        description: !!updatedDataport.description,
        food: !!updatedDataport.food,
        gender: !!updatedDataport.gender,
        location: !!updatedDataport.location,
        name: !!updatedDataport.name,
        physicalcondition: !!updatedDataport.physicalcondition,
        type: !!updatedDataport.type,
        mobile: !!updatedDataport.mobile,
        hasImage: hasAtLeastOneImage
      });
    }
  };

  // Handle success and navigation
  useEffect(() => {
    if (success) {
      // Clear form after successful submission
      setBehaviour('');
      setBreed('');
      setColor('');
      setDescription('');
      setFood('');
      setGender('');
      setLocation('');
      setName('');
      setPhysicalcondition('');
      setTraining(false);
      setVaccine(false);
      setType('');
      setMobile('');
      setImageOne('/assets/Icons/ImagePlaceholder.svg');
      setImageTwo('/assets/Icons/ImagePlaceholder.svg');
      setImageThree('/assets/Icons/ImagePlaceholder.svg');
      
      // Navigate to adoption page after a short delay
      setTimeout(() => {
        navigate('/adoption');
      }, 1500);
    }
  }, [success, navigate]);

  return (
    <div className=" lg:w-3/4 w-[90vw] mx-auto mt-[140px] mb-[100px] ">
      <Topbar
        address={'Home/Adoption/Create adoption post'}
        link={'/adoption'}
      />
      <h1 className="text-[30px] font-extrabold mt-14 text-primary  tracking-tighter">
        Please enter the details of your pet
      </h1>
      <p className="text-[14px] text-gray-light mb-8">
        Please enter the details of your pet
      </p>
      {empty && (
        <Message
          message={'Please fill in all the required fields and upload at least one image!'}
          variant={'danger'}
        />
      )}
      {error && (
        <Message
          message={error || 'Failed to create post. Please try again.'}
          variant={'danger'}
        />
      )}
      {success && (
        <Message message={'Post created successfully! Redirecting...'} variant={'success'} />
      )}
      {loading && <Loader />}
      <form onSubmit={submitHandler} id="create-adoption-form">
        <div className="lg:flex justify-between items-center">
          <div className="lg:w-[32%]">
            <TextInput
              label={'Pet name'}
              placeholder={'Tommy'}
              type={'text'}
              setData={setName}
            />
          </div>
          <div className="lg:w-[32%]">
            <TextInput
              label={'Location'}
              placeholder={'Dhaka,Bangladesh'}
              type={'text'}
              setData={setLocation}
            />
          </div>

          <div className="lg:w-[32%]">
            <SelectBox
              minHeight={200}
              label={'Pet type'}
              choiceList={petType}
              data={type}
              setData={setType}
            />
          </div>
        </div>

        <div className="lg:flex justify-between items-center">
          <div className="lg:w-[32%]">
            <TextInput
              label={'Pet description'}
              placeholder={'Lorep impsum ...'}
              type={'text'}
              setData={setDescription}
            />
          </div>
          <div className="lg:w-[32%]">
            <SelectBox
              minHeight={200}
              label={'Pet gender'}
              choiceList={genderType}
              data={gender}
              setData={setGender}
            />
          </div>
          {uploading && (
            <div className="fixed z-[999] top-[80px] bg-primary-light bg-opacity-25 left-0 right-0 bottom-0 flex items-center justify-center">
              <UploadLoader />
            </div>
          )}
          <div className="lg:w-[32%]">
            <TextInput
              minHeight={200}
              label={'Pet breed'}
              data={breed}
              setData={setBreed}
            />
          </div>
        </div>
        <div className="lg:flex justify-between items-center">
          <div className="lg:w-[32%]">
            <SelectBox
              minHeight={200}
              label={'Pet behaviour'}
              choiceList={behaviourType}
              data={behaviour}
              setData={setBehaviour}
            />
          </div>
          <div className="lg:w-[32%]">
            <TextInput
              label={"Pet's food"}
              placeholder={'Meat'}
              type={'text'}
              setData={setFood}
            />
          </div>
          <div className="lg:w-[32%]">
            <TextInput
              label={'Mobile Number'}
              placeholder={'017xxxxxxx'}
              type={'number'}
              setData={setMobile}
            />
          </div>
        </div>
        <div className="lg:flex relative justify-between items-center my-4">
          <div className="w-[100%]">
            <h2 className="font-bold text-primary text-[14px] mb-4">
              Plase Upload Image of your pet
            </h2>
            <div className="w-[100%] lg:w-[100%] ">
              {uploading && (
                <div className="fixed z-[999] top-[80px] bg-primary-light bg-opacity-25 left-0 right-0 bottom-0 flex items-center justify-center">
                  <UploadLoader />
                </div>
              )}
              <div className="w-[100%] lg:border-dashed lg:border-2 custom-round lg:py-3 lg:px-3 border-offwhite lg:flex items-center justify-between">
                <FileUpload
                  rawData={imageOne}
                  setData={setImageOne}
                  setUploading={setUploading}
                  userInfo={userInfo}
                  id={'one'}
                />
                <FileUpload
                  rawData={imageTwo}
                  setData={setImageTwo}
                  setUploading={setUploading}
                  userInfo={userInfo}
                  id={'two'}
                />
                <FileUpload
                  rawData={imageThree}
                  setData={setImageThree}
                  setUploading={setUploading}
                  userInfo={userInfo}
                  id={'three'}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="lg:flex relative justify-between items-center my-4">
          <div className="lg:w-[48%]">
            <TextInput
              label={"Pet's color"}
              placeholder={'Dhaka,Bangladesh'}
              type={'text'}
              setData={setColor}
            />
          </div>
          <div className="lg:w-[48%]">
            <SelectBox
              minHeight={200}
              label={"Pet's physical condition"}
              choiceList={healthType}
              data={physicalcondition}
              setData={setPhysicalcondition}
            />
          </div>
        </div>

        <div className="flex justify-between">
          <Checkbox
            label={'Vaccinated'}
            placeholder={'Tommy'}
            type={'checkbox'}
            width={'w-[90px]'}
            setData={setVaccine}
          />
          <Checkbox
            label={'Trained'}
            placeholder={'Tommy'}
            type={'checkbox'}
            width={'w-[70px]'}
            setData={setTraining}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          onClick={(e) => {
            console.log('Button clicked!', e);
            // Form's onSubmit will handle it, but this ensures click is registered
          }}
          className="bg-brand primary-button w-full h-[50px] text-white text-[16px] py-3 my-5 tracking-[-0.5px] relative"
          style={{ 
            position: 'relative', 
            zIndex: 100, 
            cursor: loading ? 'not-allowed' : 'pointer',
            pointerEvents: loading ? 'none' : 'auto'
          }}
        >
          <span 
            className="font-[600] lg:font-[500] text-[14px]"
            style={{ 
              pointerEvents: 'none', 
              position: 'relative', 
              zIndex: 1
            }}
          >
            {loading ? 'Creating...' : 'Create Post'}
          </span>
        </button>
      </form>
    </div>
  );
}
