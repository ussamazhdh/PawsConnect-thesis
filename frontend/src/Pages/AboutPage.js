import React from 'react';
import {
  Container,
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Divider,
  Avatar,
} from '@mui/material';
import {
  Pets as PetsIcon,
  Home as HomeIcon,
  Favorite as FavoriteIcon,
  Visibility as VisionIcon,
  Person as PersonIcon,
  Search as SearchIcon,
  AttachMoney as DonationIcon,
  Message as MessageIcon,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '@mui/material';

export default function AboutPage() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', pt: 12, pb: 8 }}>
      <Container maxWidth="lg">
        {/* Breadcrumbs */}
        <Breadcrumbs sx={{ mb: 4 }} separator="›">
          <Link to="/home" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <HomeIcon fontSize="small" />
              Home
            </Typography>
          </Link>
          <Typography color="text.primary">About</Typography>
        </Breadcrumbs>

        {/* Hero Section */}
        <Paper
          elevation={0}
          sx={{
            background: 'linear-gradient(135deg, #1B4D3E 0%, #FF7A36 100%)',
            borderRadius: 4,
            p: { xs: 4, md: 6 },
            mb: 6,
            color: 'white',
            textAlign: 'center',
          }}
        >
          <PetsIcon sx={{ fontSize: 80, mb: 2, opacity: 0.9 }} />
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 800,
              mb: 2,
              fontSize: { xs: '2rem', md: '3rem' },
            }}
          >
            About PawConnect
          </Typography>
          <Typography
            variant="h6"
            sx={{
              opacity: 0.95,
              maxWidth: '800px',
              mx: 'auto',
              lineHeight: 1.8,
              fontSize: { xs: '1rem', md: '1.25rem' },
            }}
          >
            PawConnect was created with a clear and heartfelt purpose: to protect animals and support the people who care for them. Around the world, countless animals depend on compassion, community, and a second chance. PawConnect brings these efforts together in one unified platform—built to give every animal the opportunity to be seen, helped, and rescued.
          </Typography>
        </Paper>

        {/* What We Do Section */}
        <Box sx={{ mb: 6 }}>
          <Typography
            variant="h3"
            component="h2"
            sx={{
              fontWeight: 700,
              mb: 4,
              display: 'flex',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <FavoriteIcon color="primary" sx={{ fontSize: 40 }} />
            What We Do
          </Typography>
          <Typography
            variant="body1"
            sx={{ mb: 4, fontSize: '1.1rem', lineHeight: 1.8, color: 'text.secondary' }}
          >
            PawConnect provides a reliable, easy-to-use system that empowers individuals and communities to act when it matters most:
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <Card
                sx={{
                  height: '100%',
                  textAlign: 'center',
                  p: 3,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 6,
                  },
                  borderRadius: 3,
                }}
              >
                <CardContent>
                  <Avatar
                    sx={{
                      bgcolor: 'primary.main',
                      width: 64,
                      height: 64,
                      mx: 'auto',
                      mb: 2,
                    }}
                  >
                    <PetsIcon sx={{ fontSize: 32 }} />
                  </Avatar>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    Adoption Listings
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Users can create, browse, and manage posts for pets seeking a safe and loving home.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card
                sx={{
                  height: '100%',
                  textAlign: 'center',
                  p: 3,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 6,
                  },
                  borderRadius: 3,
                }}
              >
                <CardContent>
                  <Avatar
                    sx={{
                      bgcolor: 'error.main',
                      width: 64,
                      height: 64,
                      mx: 'auto',
                      mb: 2,
                    }}
                  >
                    <SearchIcon sx={{ fontSize: 32 }} />
                  </Avatar>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    Missing Animals
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Anyone can report a missing pet or help locate one by exploring real-time community posts.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card
                sx={{
                  height: '100%',
                  textAlign: 'center',
                  p: 3,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 6,
                  },
                  borderRadius: 3,
                }}
              >
                <CardContent>
                  <Avatar
                    sx={{
                      bgcolor: 'success.main',
                      width: 64,
                      height: 64,
                      mx: 'auto',
                      mb: 2,
                    }}
                  >
                    <DonationIcon sx={{ fontSize: 32 }} />
                  </Avatar>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    Donations
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    A dedicated donation system supports shelters, rescue groups, and urgent animal cases.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card
                sx={{
                  height: '100%',
                  textAlign: 'center',
                  p: 3,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 6,
                  },
                  borderRadius: 3,
                }}
              >
                <CardContent>
                  <Avatar
                    sx={{
                      bgcolor: 'info.main',
                      width: 64,
                      height: 64,
                      mx: 'auto',
                      mb: 2,
                    }}
                  >
                    <MessageIcon sx={{ fontSize: 32 }} />
                  </Avatar>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    Communication & Support
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Built-in messaging and contact features make it simple for adopters, rescuers, and pet owners to connect quickly and safely.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ my: 6 }} />

        {/* Mission Section */}
        <Box sx={{ mb: 6 }}>
          <Typography
            variant="h3"
            component="h2"
            sx={{
              fontWeight: 700,
              mb: 3,
              display: 'flex',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <FavoriteIcon color="primary" sx={{ fontSize: 40 }} />
            Our Mission
          </Typography>
          <Paper
            elevation={0}
            sx={{
              p: 4,
              bgcolor: 'primary.light',
              borderRadius: 3,
              borderLeft: '4px solid',
              borderColor: 'primary.main',
            }}
          >
            <Typography
              variant="body1"
              sx={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'text.primary' }}
            >
              PawConnect encourages kindness, compassion, and responsible pet care. Our mission is to make information accessible, simplify adoption and reporting processes, and support individuals who want to take action. Every adoption, report, or shared post has the power to change an animal's life.
            </Typography>
          </Paper>
        </Box>

        {/* Vision Section */}
        <Box sx={{ mb: 6 }}>
          <Typography
            variant="h3"
            component="h2"
            sx={{
              fontWeight: 700,
              mb: 3,
              display: 'flex',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <VisionIcon color="primary" sx={{ fontSize: 40 }} />
            Our Vision
          </Typography>
          <Paper
            elevation={0}
            sx={{
              p: 4,
              bgcolor: 'background.paper',
              borderRadius: 3,
              borderLeft: '4px solid',
              borderColor: 'primary.main',
              boxShadow: 2,
            }}
          >
            <Typography
              variant="body1"
              sx={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'text.primary' }}
            >
              We envision a world where every lost animal finds its way home, every abandoned pet finds a loving family, and every community works together to protect vulnerable animals. Through the combination of technology and compassion, PawConnect aims to create safer, more caring environments everywhere.
            </Typography>
          </Paper>
        </Box>

        <Divider sx={{ my: 6 }} />

        {/* Creator Section */}
        <Box>
          <Typography
            variant="h3"
            component="h2"
            sx={{
              fontWeight: 700,
              mb: 4,
              textAlign: 'center',
            }}
          >
            Created by Oussama El Gana
          </Typography>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 4, md: 6 },
              bgcolor: 'background.paper',
              borderRadius: 4,
              textAlign: 'center',
              boxShadow: 3,
            }}
          >
            <Avatar
              sx={{
                bgcolor: 'primary.main',
                width: 120,
                height: 120,
                mx: 'auto',
                mb: 3,
                fontSize: 48,
              }}
            >
              <PersonIcon sx={{ fontSize: 64 }} />
            </Avatar>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 600,
                mb: 3,
                color: 'primary.main',
              }}
            >
              Oussama El Gana
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: '1.1rem',
                lineHeight: 1.8,
                color: 'text.secondary',
                maxWidth: '800px',
                mx: 'auto',
                mb: 3,
              }}
            >
              PawConnect was created by Oussama El Gana, an animal lover with a deep commitment to helping animals in need. He believes that technology should serve the most vulnerable—including missing pets and abandoned animals who depend on human compassion.
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: '1.1rem',
                lineHeight: 1.8,
                color: 'text.secondary',
                maxWidth: '800px',
                mx: 'auto',
              }}
            >
              With a passion for meaningful digital solutions, Oussama built PawConnect to be more than a platform—it is a movement rooted in kindness and community. His goal is to make it easier for people to help animals and provide a space where love, care, and responsibility come together.
            </Typography>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
}

