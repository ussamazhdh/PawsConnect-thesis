import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  CircularProgress,
  Alert,
} from '@mui/material';
import gsap from 'gsap';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { handleLogin, loading, userInfo, isAuthenticated, error, clearAuthError } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    gsap.from('.request-form-animation', {
      y: '+=60',
      opacity: 0,
    });
    gsap.to('.request-form-animation', {
      y: '0',
      opacity: 1,
      stagger: 0.1,
    });
  }, []);

  useEffect(() => {
    // Clear any previous errors when component mounts
    clearAuthError();
  }, [clearAuthError]);

  // Note: Navigation is now handled in handleLogin after successful login

  const submitHandler = async (e) => {
    e.preventDefault();
    if (email && password) {
      // Clear any previous errors
      clearAuthError();
      await handleLogin(email, password);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: { xs: 10, md: 15 }, mb: { xs: 10, md: 15 } }}>
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={6} order={{ xs: 2, md: 2 }}>
          <Box className="request-form-animation">
            <Typography
              variant="h4"
              component="h1"
              sx={{ fontWeight: 800, mb: 1, color: 'primary.dark' }}
            >
              Hey, Welcome back to PawConnect!
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
              Login to adopt paws
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 3 }} onClose={clearAuthError}>
                {error}
              </Alert>
            )}

            <Paper
              component="form"
              onSubmit={submitHandler}
              elevation={0}
              sx={{ p: 0 }}
            >
              <TextField
                fullWidth
                label="Email or Username"
                placeholder="example@gmail.com or username"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                sx={{ mb: 3 }}
                className="request-form-animation"
              />

              <TextField
                fullWidth
                label="Password"
                placeholder="123456Easy"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                sx={{ mb: 3 }}
                className="request-form-animation"
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading || !email || !password}
                sx={{
                  mb: 3,
                  py: 1.5,
                  bgcolor: 'primary.main',
                  '&:hover': {
                    bgcolor: 'primary.dark',
                  },
                }}
                className="request-form-animation"
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
              </Button>

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: 1,
                }}
                className="request-form-animation"
              >
                <Typography variant="body2" color="text.secondary">
                  Don't have an account?{' '}
                  <Link
                    to="/registration"
                    style={{
                      color: '#FF7A36',
                      fontWeight: 600,
                      textDecoration: 'none',
                    }}
                  >
                    Signup
                  </Link>
                </Typography>
                <Link
                  to="/forgot"
                  style={{
                    color: '#1B4D3E',
                    textDecoration: 'none',
                    fontSize: '14px',
                  }}
                >
                  <Typography variant="body2" color="primary.dark">
                    Forgot password?
                  </Typography>
                </Link>
              </Box>
            </Paper>
          </Box>
        </Grid>

        <Grid item xs={12} md={6} order={{ xs: 1, md: 1 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            className="request-form-image-animation"
          >
            <img
              src="/assets/dogcat secondary.svg"
              alt="Dogcat Secondary"
              style={{
                width: '100%',
                maxWidth: '400px',
                height: 'auto',
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
