import React from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, Button } from '@mui/material';
import { Home as HomeIcon, Pets as PetsIcon, Security as SecurityIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';

export default function PetHotelPage() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1B4D3E 0%, #2d6b5a 100%)',
        pt: { xs: '100px', md: '120px' },
        pb: 8,
      }}
    >
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Box sx={{ textAlign: 'center', mb: 6, color: 'white' }}>
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 700,
              mb: 2,
              fontSize: { xs: '2rem', md: '3rem' },
            }}
          >
            PawConnect Pet Hotel & Hosting
          </Typography>
          <Typography
            variant="h6"
            sx={{
              maxWidth: '800px',
              mx: 'auto',
              opacity: 0.9,
              lineHeight: 1.8,
              fontSize: { xs: '1rem', md: '1.25rem' },
            }}
          >
            Find trusted pet hosts and safe boarding options when you need a temporary place for your pet to stay.
          </Typography>
        </Box>

        {/* Features Grid */}
        <Grid container spacing={4} sx={{ mb: 6 }}>
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                height: '100%',
                textAlign: 'center',
                p: 3,
                borderRadius: 3,
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                transition: 'transform 0.3s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                },
              }}
            >
              <HomeIcon sx={{ fontSize: 60, color: '#1B4D3E', mb: 2 }} />
              <Typography variant="h5" component="h2" sx={{ fontWeight: 600, mb: 2 }}>
                Safe Boarding
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Trusted hosts provide a safe and comfortable environment for your pet while you're away.
              </Typography>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card
              sx={{
                height: '100%',
                textAlign: 'center',
                p: 3,
                borderRadius: 3,
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                transition: 'transform 0.3s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                },
              }}
            >
              <PetsIcon sx={{ fontSize: 60, color: '#1B4D3E', mb: 2 }} />
              <Typography variant="h5" component="h2" sx={{ fontWeight: 600, mb: 2 }}>
                Pet Care
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Experienced caregivers ensure your pet receives proper attention, exercise, and care.
              </Typography>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card
              sx={{
                height: '100%',
                textAlign: 'center',
                p: 3,
                borderRadius: 3,
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                transition: 'transform 0.3s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                },
              }}
            >
              <SecurityIcon sx={{ fontSize: 60, color: '#1B4D3E', mb: 2 }} />
              <Typography variant="h5" component="h2" sx={{ fontWeight: 600, mb: 2 }}>
                Verified Hosts
              </Typography>
              <Typography variant="body1" color="text.secondary">
                All hosts are verified and reviewed to ensure the highest standards of pet care.
              </Typography>
            </Card>
          </Grid>
        </Grid>

        {/* Coming Soon Section */}
        <Box
          sx={{
            textAlign: 'center',
            bgcolor: 'white',
            borderRadius: 3,
            p: 6,
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          }}
        >
          <Typography variant="h4" component="h2" sx={{ fontWeight: 600, mb: 2, color: '#1B4D3E' }}>
            Coming Soon
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: '600px', mx: 'auto' }}>
            We're working hard to bring you a comprehensive pet hotel and hosting service. 
            Soon you'll be able to browse verified hosts, read reviews, and book safe boarding for your pets.
          </Typography>
          <Button
            component={Link}
            to="/home"
            variant="contained"
            sx={{
              bgcolor: '#1B4D3E',
              color: 'white',
              px: 4,
              py: 1.5,
              borderRadius: 2,
              textTransform: 'none',
              fontSize: '1rem',
              '&:hover': {
                bgcolor: '#2d6b5a',
              },
            }}
          >
            Back to Home
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

