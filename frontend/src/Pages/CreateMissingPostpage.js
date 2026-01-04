import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { missingPostCreateAction } from '../actions/missingAnimalActions';
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

export default function CreateMissingPost({ history }) {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [reward, setReward] = useState('');
  const [gender, setGender] = useState("Choose pet's  gender");
  const [breed, setBreed] = useState('');
  const [accessory, setAccessory] = useState('');
  const [date, setDate] = useState('');
  const [attribute, setAttribute] = useState('');
  const [vaccine, setVaccine] = useState('false');
  const [type, setType] = useState("Choose pet's type");
  const [color, setColor] = useState('');
  const [empty, setEmpty] = useState(false);
  const [imageOne, setImageOne] = useState(
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

  const createMissingPost = useSelector((state) => state.missingPostCreated);
  const { loading, success, error, missingPost } = createMissingPost;

  const navigate = useNavigate();
  const { id } = useParams();

  const dataport = {
    name: name,
    breed: breed,
    vaccine: vaccine,
    color: color,
    datemissing: date,
    specificattribute: attribute,
    location: location,
    accessorieslastworn: accessory,
    image: imageOne,
    rewards: reward,
    gender: gender,
    type: type
  };

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }
  }, [userInfo, navigate]);

  // Handle success and navigation
  useEffect(() => {
    if (success) {
      // Clear form after successful submission
      setName('');
      setLocation('');
      setReward('');
      setGender("Choose pet's  gender");
      setBreed('');
      setAccessory('');
      setDate('');
      setAttribute('');
      setVaccine('false');
      setType("Choose pet's type");
      setColor('');
      setImageOne('/assets/Icons/ImagePlaceholder.svg');
      
      // Navigate to missing page after a short delay
      setTimeout(() => {
        navigate('/missing');
      }, 1500);
    }
  }, [success, navigate]);

  var petType = ['Cat', 'Dog'];
  var genderType = ['Male', 'Female'];

  const submitHandler = (e) => {
    e.preventDefault();
    console.log('Missing post form submitted!', { id, dataport, userInfo });
    
    // Validate user is logged in
    if (!userInfo || !userInfo.id) {
      alert('You must be logged in to create a missing post. Please login first.');
      navigate('/login');
      return;
    }
    
    // Check if image is uploaded (not a placeholder)
    const imageIsUploaded = imageOne && !imageOne.includes('ImagePlaceholder.svg');
    
    // Check if gender and type are selected (not default values)
    const genderSelected = gender && gender !== "Choose pet's  gender";
    const typeSelected = type && type !== "Choose pet's type";
    
    if (
      dataport.name &&
      dataport.breed &&
      dataport.color &&
      dataport.datemissing &&
      dataport.specificattribute &&
      dataport.location &&
      dataport.accessorieslastworn &&
      imageIsUploaded &&
      dataport.rewards &&
      genderSelected &&
      typeSelected
    ) {
      setEmpty(false);
      console.log('Dispatching missing post creation...', { userInfo, dataport });
      
      // Always use the logged-in user's ID, not the URL parameter
      const userId = userInfo.id.toString();
      console.log('Using user ID from userInfo:', userId);
      
      dispatch(missingPostCreateAction(userId, dataport))
        .then(() => {
          console.log('Missing post creation dispatched successfully');
        })
        .catch((error) => {
          console.error('Error in missing post creation:', error);
        });
    } else {
      setEmpty(true);
      console.log('Validation failed. Missing fields:', {
        name: !!dataport.name,
        breed: !!dataport.breed,
        color: !!dataport.color,
        datemissing: !!dataport.datemissing,
        specificattribute: !!dataport.specificattribute,
        location: !!dataport.location,
        accessorieslastworn: !!dataport.accessorieslastworn,
        image: imageIsUploaded,
        rewards: !!dataport.rewards,
        gender: genderSelected,
        type: typeSelected
      });
    }
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      console.log('No file selected');
      return;
    }

    // Show preview immediately
    const reader = new FileReader();
    reader.onload = (e) => {
      setImageOne(e.target.result); // Show local preview
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

      // Add auth token if available
      if (userInfo?.jwtdto?.accessToken) {
        config.headers.Authorization = `Bearer ${userInfo.jwtdto.accessToken}`;
      }

      console.log('Uploading file:', file.name, 'Size:', file.size, 'Type:', file.type);
      
      const response = await axios.post(
        `${BASE_URL}/api/files/upload`,
        formData,
        config
      );

      console.log('Upload response:', response);
      
      // Backend returns plain string URL
      let imageUrl = response.data;
      
      // Handle if response is wrapped
      if (typeof imageUrl === 'object') {
        if (imageUrl.success === false) {
          throw new Error(imageUrl.message || 'Upload failed');
        }
        if (imageUrl.success === true && imageUrl.data) {
          imageUrl = imageUrl.data;
        } else if (imageUrl.data) {
          imageUrl = imageUrl.data;
        } else if (imageUrl.url) {
          imageUrl = imageUrl.url;
        }
      }
      
      // Ensure we have a valid URL string
      if (!imageUrl || typeof imageUrl !== 'string') {
        throw new Error('Invalid response from server: ' + JSON.stringify(response.data));
      }

      console.log('Image URL received:', imageUrl);
      
      // Set the uploaded image URL
      setImageOne(imageUrl);
      setUploading(false);
      
      console.log('Image uploaded successfully:', imageUrl);
    } catch (error) {
      console.error('Upload error:', error);
      console.error('Error response:', error.response);
      console.error('Error data:', error.response?.data);
      
      // Keep the local preview even if upload fails
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
    <div className=" lg:w-3/4 w-[90vw] mx-auto mt-[140px] mb-[100px] ">
      <Topbar address={'Home/Missing/Create missing post'} link={'/missing'} />
      <h1 className="text-[30px] font-extrabold mt-14 text-primary  tracking-tighter">
        Please provide details of missing pet
      </h1>
      <p className="text-[14px] text-gray-light mb-8">
        Please enter the details of your pet
      </p>

      {empty && (
        <Message
          message={'Please fill in all the required fields, select gender and type, and upload an image!'}
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
      <form onSubmit={submitHandler}>
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
              label={"Pet's color"}
              placeholder={'Dhaka,Bangladesh'}
              type={'text'}
              setData={setColor}
            />
          </div>
          <div className="lg:w-[32%]">
            <TextInput
              label={"Pet's specific attribute"}
              placeholder={'Any marks or sign'}
              type={'text'}
              setData={setAttribute}
            />
          </div>
        </div>

        <div className="lg:flex justify-between items-center">
          <div className="lg:w-[32%]">
            <TextInput
              label={"Pet's last seen location"}
              placeholder={'Dhaka,Bangladesh'}
              type={'text'}
              setData={setLocation}
            />
          </div>

          <div className="lg:w-[32%]">
            <TextInput
              minHeight={200}
              label={'Pet breed'}
              placeholder={'Ocicocat'}
              data={breed}
              setData={setBreed}
            />
          </div>
          <div className="lg:w-[32%]">
            <TextInput
              label={'Accessories last worn'}
              placeholder={'Accessories'}
              type={'text'}
              setData={setAccessory}
            />
          </div>
        </div>
        <div className="lg:flex justify-between items-center">
          <div className="lg:w-[32%]">
            <TextInput
              label={'Reward'}
              placeholder={'Rewards amount in BDT'}
              type={'text'}
              setData={setReward}
            />
          </div>
          <div className="lg:w-[32%]">
            <TextInput
              label={'Went missing on'}
              placeholder={'27/06/2022'}
              type={'date'}
              setData={setDate}
            />
          </div>
          <div className="lg:w-[32%]">
            <SelectBox
              minHeight={200}
              label={"Pet's gender"}
              choiceList={genderType}
              data={gender}
              setData={setGender}
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
              <div className="w-[100%] lg:border-dashed lg:border-2 custom-round lg:py-5 border-offwhite flex items-center justify-center">
                <label
                  htmlFor="filePicker"
                  style={{
                    backgroundImage: `url(${imageOne})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat'
                  }}
                  className="text-[12px] block  w-[100%] lg:w-[48%] h-[300px] lg:h-[400px] cursor-pointer font-bold text-[transparent] py-[35px] px-[25px]  custom-round"
                ></label>
                <input
                  id="filePicker"
                  onChange={uploadFileHandler}
                  required
                  style={{ visibility: 'hidden' }}
                  className="absolute"
                  type={'file'}
                  accept="image/*"
                ></input>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:flex justify-between items-center">
          <div className="lg:w-[32%]">
            <SelectBox
              minHeight={200}
              label={'Pet Type'}
              choiceList={petType}
              data={type}
              setData={setType}
            />
          </div>
          <div className="flex justify-between lg:w-[60%]">
            <div className="lg:w-[32%]">
              <Checkbox
                label={'Vaccinated'}
                placeholder={'Tommy'}
                type={'checkbox'}
                width={'w-[90px]'}
                setData={setVaccine}
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
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
