import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  IconButton,
  Divider,
  Link as MuiLink,
} from '@mui/material';
import {
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  Twitter as TwitterIcon,
  VideoLibrary as TikTokIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Home as HomeIcon,
  Pets as PetsIcon,
  Search as SearchIcon,
  AttachMoney as DonationIcon,
  Info as InfoIcon,
  ContactMail as ContactIcon,
  Policy as PolicyIcon,
  Description as TermsIcon,
} from '@mui/icons-material';
import { toast } from 'react-toastify';
import { PawConnectLogo } from './Logo/PawConnectLogo';

export default function Footer() {
  const [theme, setTheme] = useState(true);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Show footer on all pages except onboarding
    if (location.pathname === '/') {
      setTheme(false);
    } else {
      setTheme(true);
    }
  }, [location]);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }
    
    setLoading(true);
    // TODO: Implement newsletter subscription API call
    setTimeout(() => {
      toast.success('Thank you for subscribing to our newsletter!');
      setEmail('');
      setLoading(false);
    }, 1000);
  };

  if (!theme) return null;

  const quickLinks = [
    { title: 'Home', link: '/home', icon: <HomeIcon fontSize="small" /> },
    { title: 'Adoption', link: '/adoption', icon: <PetsIcon fontSize="small" /> },
    { title: 'Missing Pets', link: '/missing', icon: <SearchIcon fontSize="small" /> },
    { title: 'Donation', link: '/ongoingdonations', icon: <DonationIcon fontSize="small" /> },
    { title: 'Pet Hotel', link: '/pet-hotel', icon: <HomeIcon fontSize="small" /> },
    { title: 'About', link: '/about', icon: <InfoIcon fontSize="small" /> },
    { title: 'Contact / Feedback', link: '/contact', icon: <ContactIcon fontSize="small" /> },
    { title: 'Privacy Policy', link: '/privacy', icon: <PolicyIcon fontSize="small" /> },
    { title: 'Terms & Conditions', link: '/terms', icon: <TermsIcon fontSize="small" /> },
  ];

  const socialLinks = [
    { name: 'Instagram', icon: <InstagramIcon />, url: 'https://instagram.com' },
    { name: 'Facebook', icon: <FacebookIcon />, url: 'https://facebook.com' },
    { name: 'Twitter/X', icon: <TwitterIcon />, url: 'https://twitter.com' },
    { name: 'TikTok', icon: <TikTokIcon />, url: 'https://tiktok.com' },
  ];

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#14382E',
        color: 'white',
        mt: { xs: 10, md: 15 },
        pt: { xs: 6, md: 8 },
        pb: { xs: 4, md: 6 },
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 4, md: 6 }}>
          {/* About PawConnect */}
          <Grid item xs={12} sm={6} md={3}>
            <Box>
              <Box sx={{ width: '260px', mb: '20px' }}>
                <PawConnectLogo variant="light" height={40} />
              </Box>
              <Typography
                variant="body2"
                sx={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  lineHeight: 1.7,
                  fontSize: '0.875rem',
                }}
              >
                PawConnect brings people together to care for animals who need love, safety, and support. From adoption and missing pet alerts to donations and community help, we create a space where every pet has a chance to be found, protected, and loved.
              </Typography>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                mb: 2,
                fontSize: '1.1rem',
                color: 'white',
              }}
            >
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {quickLinks.map((link) => (
                <MuiLink
                  key={link.link}
                  component={Link}
                  to={link.link}
                  sx={{
                    color: 'rgba(255, 255, 255, 0.8)',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      color: '#FF7A36',
                      transform: 'translateX(4px)',
                    },
                  }}
                >
                  {link.icon}
                  {link.title}
                </MuiLink>
              ))}
            </Box>
          </Grid>

          {/* Contact */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                mb: 2,
                fontSize: '1.1rem',
                color: 'white',
              }}
            >
              Contact
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <EmailIcon sx={{ fontSize: '1.2rem', color: '#FF7B47' }} />
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                  <MuiLink
                    href="mailto:77795@office.mans.org.pl"
                    sx={{
                      color: 'rgba(255, 255, 255, 0.8)',
                      textDecoration: 'none',
                      fontSize: '0.875rem',
                      '&:hover': {
                        color: '#FF7B47',
                      },
                    }}
                  >
                    77795@office.mans.org.pl
                  </MuiLink>
                  <MuiLink
                    href="mailto:oussamaelgana1@gmail.com"
                    sx={{
                      color: 'rgba(255, 255, 255, 0.8)',
                      textDecoration: 'none',
                      fontSize: '0.875rem',
                      '&:hover': {
                        color: '#FF7B47',
                      },
                    }}
                  >
                    oussamaelgana1@gmail.com
                  </MuiLink>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <PhoneIcon sx={{ fontSize: '1.2rem', color: '#FF7A36' }} />
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                  <MuiLink
                    href="https://wa.me/48786615361"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      color: 'rgba(255, 255, 255, 0.8)',
                      textDecoration: 'none',
                      fontSize: '0.875rem',
                      '&:hover': {
                        color: '#FF7B47',
                      },
                    }}
                  >
                    +48 786 615 361
                  </MuiLink>
                  <MuiLink
                    href="https://wa.me/48505866821"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      color: 'rgba(255, 255, 255, 0.8)',
                      textDecoration: 'none',
                      fontSize: '0.875rem',
                      '&:hover': {
                        color: '#FF7B47',
                      },
                    }}
                  >
                    +48 505 866 821
                  </MuiLink>
                </Box>
              </Box>
            </Box>
          </Grid>

          {/* Follow Us */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                mb: 2,
                fontSize: '1.1rem',
                color: 'white',
              }}
            >
              Follow Us
            </Typography>
            <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
              {socialLinks.map((social) => (
                <IconButton
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.8)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    '&:hover': {
                      color: '#FF7A36',
                      borderColor: '#FF7A36',
                      bgcolor: 'rgba(255, 122, 54, 0.1)',
                    },
                    transition: 'all 0.2s ease',
                  }}
                  aria-label={social.name}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Box>
          </Grid>

          {/* Newsletter */}
          <Grid item xs={12} md={3}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                mb: 1,
                fontSize: '1.1rem',
                color: 'white',
              }}
            >
              Newsletter
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'rgba(255, 255, 255, 0.8)',
                mb: 2,
                fontSize: '0.875rem',
                lineHeight: 1.6,
              }}
            >
              Stay updated on new adoption posts and missing animals near you.
            </Typography>
            <Box
              component="form"
              onSubmit={handleNewsletterSubmit}
              sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}
            >
              <TextField
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                size="small"
                sx={{
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: 1,
                  '& .MuiOutlinedInput-root': {
                    color: 'white',
                    '& fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.3)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.5)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#FF7A36',
                    },
                    '& input::placeholder': {
                      color: 'rgba(255, 255, 255, 0.6)',
                      opacity: 1,
                    },
                  },
                }}
              />
              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                sx={{
                  bgcolor: '#FF7A36',
                  color: 'white',
                  fontWeight: 600,
                  textTransform: 'none',
                  py: 1,
                  '&:hover': {
                    bgcolor: '#E55F1F',
                  },
                  '&:disabled': {
                    bgcolor: 'rgba(255, 122, 54, 0.5)',
                  },
                }}
              >
                {loading ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: 'rgba(255, 255, 255, 0.2)' }} />

        {/* Copyright & Creator */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: '0.875rem',
            }}
          >
            © 2025 PawConnect. All rights reserved.
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: '0.875rem',
            }}
          >
            Created with care by{' '}
            <Box
              component="span"
              sx={{
                color: '#FF7A36',
                fontWeight: 600,
              }}
            >
              Oussama El Gana
            </Box>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
