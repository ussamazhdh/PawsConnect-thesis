import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Breadcrumbs,
  Avatar,
} from '@mui/material';
import {
  Home as HomeIcon,
  AttachMoney as MoneyIcon,
  Restaurant as FoodIcon,
  Inventory as SuppliesIcon,
  VolunteerActivism as VolunteerIcon,
  HomeWork as FosterIcon,
  LocalHospital as EmergencyIcon,
  FilterList as FilterIcon,
  Add as AddIcon,
  Pets as PetIcon,
} from '@mui/icons-material';
import { donationPostsAction } from '../actions/donationPostActions';
import Loader from '../Components/Loader';
import DonationListCard from '../Components/Cards/DonationListCard';
import Pagination from '../Components/Pagination';
import Message from '../Components/Message';
import { toast } from 'react-toastify';

export default function DonationPostPage() {
  const [pageNo, setPageNo] = useState(0);
  const [filterType, setFilterType] = useState('all');
  const [filterUrgency, setFilterUrgency] = useState('all');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const donationPostsData = useSelector((state) => state.donationPosts);
  const { loading, error, donationPosts } = donationPostsData;

  useEffect(() => {
    dispatch(donationPostsAction(pageNo, 8));
  }, [dispatch, pageNo]);

  const donationCategories = [
    {
      icon: <MoneyIcon sx={{ fontSize: 40 }} />,
      title: 'Monetary Support',
      subtitle: 'Financial Contributions',
      description: 'Support medical treatments, rescue operations, food, and shelter for animals in need.',
      color: '#1B4D3E',
    },
    {
      icon: <FoodIcon sx={{ fontSize: 40 }} />,
      title: 'Food Donations',
      subtitle: 'Pet Food & Meals',
      description: 'Donate pet food or sponsor meals for rescued animals waiting for their forever homes.',
      color: '#FF7A36',
    },
    {
      icon: <SuppliesIcon sx={{ fontSize: 40 }} />,
      title: 'Supplies & Essentials',
      subtitle: 'Items & Equipment',
      description: 'Contribute toys, blankets, leashes, medicine, crates, beds, and other essential supplies.',
      color: '#1B4D3E',
    },
    {
      icon: <VolunteerIcon sx={{ fontSize: 40 }} />,
      title: 'Volunteer Time',
      subtitle: 'Hands-On Help',
      description: 'Register as a volunteer for rescues, transport, or care activities in your area.',
      color: '#FF7A36',
    },
    {
      icon: <FosterIcon sx={{ fontSize: 40 }} />,
      title: 'Foster Care',
      subtitle: 'Temporary Homes',
      description: 'Sign up as a temporary foster home to provide safe, loving environments for animals.',
      color: '#1B4D3E',
    },
    {
      icon: <EmergencyIcon sx={{ fontSize: 40 }} />,
      title: 'Emergency Help',
      subtitle: 'Urgent Response',
      description: 'Respond to urgent cases needing immediate attention and critical care.',
      color: '#E63946',
    },
  ];

  const handleCreateCampaign = () => {
    if (userInfo) {
      navigate('/donation/createpost');
    } else {
      toast.info('Please login to create a donation campaign');
      navigate('/login');
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', pt: 12, pb: 8 }}>
      <Container maxWidth="lg">
        {loading ? (
          <Loader />
        ) : (
          <>
            {/* Breadcrumbs */}
            <Breadcrumbs sx={{ mb: 4 }} separator="›">
              <Link to="/home" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Typography color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <HomeIcon fontSize="small" />
                  Home
                </Typography>
              </Link>
              <Typography color="text.primary">Donations</Typography>
            </Breadcrumbs>

            {/* Header Section */}
            <Box sx={{ mb: 6 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4, flexWrap: 'wrap', gap: 2 }}>
                <Box sx={{ flex: 1, minWidth: '300px' }}>
                  <Typography variant="h3" component="h1" sx={{ fontWeight: 800, mb: 2, color: 'primary.main', fontSize: { xs: '1.75rem', md: '2.25rem' } }}>
                    Ongoing Donations
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8, fontSize: { xs: '0.9rem', md: '1rem' }, maxWidth: '800px' }}>
                    Please donate to save the lives of the animals in need. These animals have encountered a cruel life where people mistreated or abandoned them and threw them away in unsafe environments. Help us raise money for their treatment and rehabilitation.
                  </Typography>
                </Box>
                {userInfo && userInfo.role && userInfo.role[0] && userInfo.role[0].id === 1 && (
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<AddIcon />}
                    onClick={() => navigate('/donation/createpost')}
                    sx={{
                      bgcolor: 'primary.main',
                      color: 'white',
                      px: 3,
                      py: 1.5,
                      fontWeight: 600,
                      '&:hover': {
                        bgcolor: 'primary.dark',
                      },
                    }}
                  >
                    Create Donation
                  </Button>
                )}
              </Box>

              {/* Donation Categories Grid - Always Visible */}
              <Box sx={{ mb: 6 }}>
                <Typography variant="h5" component="h2" sx={{ fontWeight: 700, mb: 3, color: 'primary.main' }}>
                  Ways You Can Help
                </Typography>
                <Grid container spacing={3}>
                  {donationCategories.map((category, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <Card
                        sx={{
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: 4,
                          },
                          borderRadius: 2,
                          border: '1px solid',
                          borderColor: 'divider',
                          bgcolor: 'background.paper',
                        }}
                      >
                        <CardContent sx={{ flexGrow: 1, p: 3 }}>
                          <Avatar
                            sx={{
                              bgcolor: category.color,
                              width: 64,
                              height: 64,
                              mx: 'auto',
                              mb: 2,
                            }}
                          >
                            <Box sx={{ color: 'white' }}>{category.icon}</Box>
                          </Avatar>
                          <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5, color: 'text.primary', textAlign: 'center' }}>
                            {category.title}
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 600, mb: 1.5, color: category.color, textAlign: 'center', fontSize: '0.75rem' }}>
                            {category.subtitle}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7, textAlign: 'center', fontSize: '0.875rem' }}>
                            {category.description}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>

              {/* Filters Section */}
              <Paper elevation={0} sx={{ p: 3, mb: 4, borderRadius: 2, bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                  <FilterIcon color="primary" />
                  <Typography variant="h6" sx={{ fontWeight: 600, flexGrow: 1, fontSize: '1rem' }}>
                    Filter Donations
                  </Typography>
                  <FormControl size="small" sx={{ minWidth: { xs: '100%', sm: 150 } }}>
                    <InputLabel>Donation Type</InputLabel>
                    <Select value={filterType} label="Donation Type" onChange={(e) => setFilterType(e.target.value)}>
                      <MenuItem value="all">All Types</MenuItem>
                      <MenuItem value="money">Money</MenuItem>
                      <MenuItem value="food">Food</MenuItem>
                      <MenuItem value="supplies">Supplies</MenuItem>
                      <MenuItem value="emergency">Emergency</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl size="small" sx={{ minWidth: { xs: '100%', sm: 150 } }}>
                    <InputLabel>Urgency</InputLabel>
                    <Select value={filterUrgency} label="Urgency" onChange={(e) => setFilterUrgency(e.target.value)}>
                      <MenuItem value="all">All</MenuItem>
                      <MenuItem value="urgent">Urgent</MenuItem>
                      <MenuItem value="normal">Normal</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Paper>
            </Box>

            {/* Featured Campaigns Section */}
            <Box sx={{ mb: 6 }}>
              <Typography variant="h5" component="h2" sx={{ fontWeight: 700, mb: 4, color: 'primary.main' }}>
                Featured Campaigns
              </Typography>

              {donationPosts && donationPosts.totalElements > 0 ? (
                <>
                  <DonationListCard data={donationPosts.content} userInfo={userInfo} />
                  <Box sx={{ mt: 4 }}>
                    <Pagination data={donationPosts} setPageNo={setPageNo} />
                  </Box>
                </>
              ) : (
                <Message
                  message={'No donation post available!'}
                  variant={'danger'}
                  active={true}
                />
              )}
            </Box>

            {/* Create Campaign CTA */}
            <Paper
              elevation={0}
              sx={{
                p: 4,
                borderRadius: 3,
                bgcolor: '#E8F5ED',
                border: '1px solid',
                borderColor: 'primary.main',
                textAlign: 'center',
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: 'primary.main' }}>
                Want to Start a Donation Campaign?
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: '600px', mx: 'auto' }}>
                Create a campaign for an animal in need. Whether it's medical treatment, food, supplies, or emergency care, your campaign can make a real difference.
              </Typography>
              <Button
                variant="contained"
                size="large"
                startIcon={<AddIcon />}
                onClick={handleCreateCampaign}
                sx={{
                  bgcolor: 'primary.main',
                  color: 'white',
                  px: 4,
                  py: 1.5,
                  fontWeight: 600,
                  '&:hover': {
                    bgcolor: 'primary.dark',
                  },
                }}
              >
                Create Donation Campaign
              </Button>
            </Paper>
          </>
        )}
      </Container>
    </Box>
  );
}
