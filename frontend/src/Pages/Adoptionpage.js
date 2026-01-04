import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  TextField,
  InputAdornment,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Pagination,
  Stack,
  Paper,
  Fade,
  CircularProgress,
  IconButton,
  Breadcrumbs,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  Pets as PetsIcon,
  Add as AddIcon,
  LocationOn as LocationIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Home as HomeIcon,
} from '@mui/icons-material';
import { adoptionPostsAction } from '../actions/adoptionActions';
import { useAuth } from '../hooks/useAuth';

export default function Adoptionpage() {
  const [searchName, setSearchName] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterAvailability, setFilterAvailability] = useState('all');
  const [pageNo, setPageNo] = useState(0);
  const [filteredList, setFilteredList] = useState(null);

  const dispatch = useDispatch();
  const { userInfo } = useAuth();
  const navigate = useNavigate();

  const adoptionPostsData = useSelector((state) => state.adoptionPosts);
  const { loading, adoptionPosts } = adoptionPostsData;

  useEffect(() => {
    dispatch(adoptionPostsAction(pageNo, 12));
  }, [dispatch, pageNo]);

  useEffect(() => {
    if (adoptionPosts && adoptionPosts.content) {
      let filtered = [...adoptionPosts.content];

      // Apply search filter
      if (searchName.trim()) {
        filtered = filtered.filter((item) =>
          item.name?.toLowerCase().includes(searchName.toLowerCase())
        );
      }

      // Apply type filter
      if (filterType !== 'all') {
        filtered = filtered.filter((item) => item.type === filterType);
      }

      // Apply availability filter
      if (filterAvailability !== 'all') {
        const isAvailable = filterAvailability === 'available';
        filtered = filtered.filter((item) => item.availability === isAvailable);
      }

      setFilteredList(filtered);
    } else {
      setFilteredList(null);
    }
  }, [searchName, filterType, filterAvailability, adoptionPosts]);

  const handlePageChange = (event, value) => {
    setPageNo(value - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCreatePost = () => {
    if (userInfo) {
      navigate(`/adoption/${userInfo.id}/createpost`);
    } else {
      navigate('/login');
    }
  };

  const displayList = filteredList || (adoptionPosts?.content || []);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', pt: 12, pb: 8 }}>
      <Container maxWidth="xl">
        {/* Breadcrumbs */}
        <Breadcrumbs sx={{ mb: 4 }} separator="›">
          <Link to="/home" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <HomeIcon fontSize="small" />
              Home
            </Typography>
          </Link>
          <Typography color="text.primary">Adoption</Typography>
          <Typography color="text.secondary">Page {pageNo + 1}</Typography>
        </Breadcrumbs>

        {/* Hero Section */}
        <Paper
          elevation={0}
          sx={{
            background: 'linear-gradient(135deg, #1B4D3E 0%, #FF7A36 100%)',
            borderRadius: 4,
            p: { xs: 4, md: 6 },
            mb: 6,
            position: 'relative',
            overflow: 'hidden',
            color: 'white',
          }}
        >
          <Box sx={{ position: 'relative', zIndex: 2 }}>
            <Typography
              variant="h3"
              component="h1"
              sx={{
                fontWeight: 800,
                mb: 2,
                fontSize: { xs: '1.75rem', md: '2.5rem' },
              }}
            >
              Adopt a Furry Friend Today
            </Typography>
            <Typography
              variant="body1"
              sx={{
                mb: 4,
                opacity: 0.95,
                maxWidth: '70%',
                fontSize: { xs: '0.9rem', md: '1rem' },
              }}
            >
              Give a loving home to animals in need. These wonderful companions are waiting for someone like you to bring joy, laughter, and unconditional love into their lives.
            </Typography>
            <Button
              variant="contained"
              size="large"
              startIcon={<AddIcon />}
              onClick={handleCreatePost}
              sx={{
                bgcolor: 'white',
                color: 'primary.main',
                fontWeight: 600,
                px: 4,
                py: 1.5,
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.9)',
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Create Post
            </Button>
          </Box>
          <Box
            sx={{
              position: 'absolute',
              right: { xs: -50, md: 0 },
              bottom: 0,
              opacity: 0.3,
              zIndex: 1,
            }}
          >
            <img
              src="/assets/dog.png"
              alt="Dog"
              style={{
                width: '300px',
                height: 'auto',
                maxWidth: '100%',
              }}
            />
          </Box>
        </Paper>

        {/* Search and Filter Section */}
        <Box sx={{ mb: 4 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search by name..."
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  bgcolor: 'background.paper',
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <InputLabel>Type</InputLabel>
                <Select
                  value={filterType}
                  label="Type"
                  onChange={(e) => setFilterType(e.target.value)}
                  sx={{ bgcolor: 'background.paper', borderRadius: 2 }}
                >
                  <MenuItem value="all">All Types</MenuItem>
                  <MenuItem value="Dog">Dog</MenuItem>
                  <MenuItem value="Cat">Cat</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <InputLabel>Availability</InputLabel>
                <Select
                  value={filterAvailability}
                  label="Availability"
                  onChange={(e) => setFilterAvailability(e.target.value)}
                  sx={{ bgcolor: 'background.paper', borderRadius: 2 }}
                >
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="available">Available</MenuItem>
                  <MenuItem value="unavailable">Unavailable</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>

        {/* Results Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <PetsIcon color="primary" />
            Paws for Adoption
          </Typography>
          {adoptionPosts && (
            <Typography variant="body2" color="text.secondary">
              {adoptionPosts.totalElements} {adoptionPosts.totalElements === 1 ? 'animal' : 'animals'} found
            </Typography>
          )}
        </Box>

        {/* Loading State */}
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress size={60} />
          </Box>
        )}

        {/* Empty State */}
        {!loading && (!displayList || displayList.length === 0) && (
          <Paper
            elevation={0}
            sx={{
              p: 6,
              textAlign: 'center',
              bgcolor: 'background.paper',
              borderRadius: 3,
            }}
          >
            <PetsIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 2, opacity: 0.5 }} />
            <Typography variant="h5" color="text.secondary" gutterBottom>
              No adoption posts available
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              {searchName || filterType !== 'all' || filterAvailability !== 'all'
                ? 'Try adjusting your search or filters'
                : 'Be the first to create an adoption post!'}
            </Typography>
            {userInfo && (
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleCreatePost}
                sx={{ mt: 2 }}
              >
                Create First Post
              </Button>
            )}
          </Paper>
        )}

        {/* Animal Cards Grid */}
        {!loading && displayList && displayList.length > 0 && (
          <Fade in={true}>
            <Grid container spacing={3} sx={{ mb: 4 }}>
              {displayList.map((item) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                  <Card
                    component={Link}
                    to={`/adoption/${item.id}`}
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: 6,
                      },
                      borderRadius: 3,
                      overflow: 'hidden',
                    }}
                  >
                    <Box sx={{ position: 'relative', height: 250, overflow: 'hidden' }}>
                      <CardMedia
                        component="img"
                        image={item.imageone || '/assets/dog.png'}
                        alt={item.name}
                        sx={{
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.3s ease',
                          '&:hover': {
                            transform: 'scale(1.1)',
                          },
                        }}
                      />
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 12,
                          right: 12,
                        }}
                      >
                        <Chip
                          icon={
                            item.availability ? (
                              <CheckCircleIcon sx={{ color: 'white !important' }} />
                            ) : (
                              <CancelIcon sx={{ color: 'white !important' }} />
                            )
                          }
                          label={item.availability ? 'Available' : 'Unavailable'}
                          size="small"
                          sx={{
                            bgcolor: item.availability ? 'success.main' : 'error.main',
                            color: 'white',
                            fontWeight: 600,
                          }}
                        />
                      </Box>
                    </Box>
                    <CardContent sx={{ flexGrow: 1, p: 2.5 }}>
                      <Typography
                        variant="h6"
                        component="h3"
                        sx={{
                          fontWeight: 700,
                          mb: 1,
                          color: 'text.primary',
                          textTransform: 'capitalize',
                        }}
                      >
                        {item.name}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
                        <LocationIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                          {item.location}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1.5 }}>
                        <Chip
                          label={item.type}
                          size="small"
                          sx={{ bgcolor: 'primary.light', color: 'primary.dark' }}
                        />
                        <Chip
                          label={item.breed}
                          size="small"
                          variant="outlined"
                          sx={{ borderColor: 'primary.main' }}
                        />
                      </Box>
                    </CardContent>
                    <CardActions sx={{ p: 2, pt: 0 }}>
                      <Button
                        fullWidth
                        variant="contained"
                        sx={{
                          bgcolor: 'primary.main',
                          '&:hover': {
                            bgcolor: 'primary.dark',
                          },
                        }}
                      >
                        View Details
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Fade>
        )}

        {/* Pagination */}
        {!loading && adoptionPosts && adoptionPosts.totalPages > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Stack spacing={2}>
              <Pagination
                count={adoptionPosts.totalPages}
                page={pageNo + 1}
                onChange={handlePageChange}
                color="primary"
                size="large"
                showFirstButton
                showLastButton
              />
            </Stack>
          </Box>
        )}
      </Container>
    </Box>
  );
}
