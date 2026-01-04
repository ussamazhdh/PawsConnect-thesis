import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Rating,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Card,
  CardContent,
  Divider,
  IconButton,
  Chip,
  Breadcrumbs,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import {
  Home as HomeIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  Twitter as TwitterIcon,
  VideoLibrary as TikTokIcon,
  ExpandMore as ExpandMoreIcon,
  Warning as WarningIcon,
  Person as PersonIcon,
  CheckCircle as CheckCircleIcon,
  AccessTime as AccessTimeIcon,
} from '@mui/icons-material';
import { feedbackCreateAction } from '../actions/feedbackActions';
import { CircularProgress } from '@mui/material';

const MAX_FEEDBACK_LENGTH = 300;

export default function ContactPage() {
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState('');
  const [contactPurpose, setContactPurpose] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const feedbackCreateData = useSelector((state) => state.feedbackCreate);
  const { loading, success, error } = feedbackCreateData;

  useEffect(() => {
    if (success) {
      setShowSuccessDialog(true);
      // Reset form
      setRating(0);
      setDescription('');
      setContactPurpose('');
      setName('');
      setEmail('');
    }
  }, [success]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating > 0 && description.trim()) {
      const dataPort = {
        rating: rating,
        description: description,
        contactPurpose: contactPurpose || 'General Feedback',
        name: name || undefined,
        email: email || undefined,
      };
      dispatch(feedbackCreateAction(dataPort));
    }
  };

  const handleCloseDialog = () => {
    setShowSuccessDialog(false);
  };

  const testimonials = [
    {
      quote: "PawConnect helped me find my lost cat within 24 hours! The community support is amazing.",
      author: "Sarah M.",
    },
    {
      quote: "I adopted the most wonderful dog through this platform. The process was smooth and the team was helpful.",
      author: "Michael R.",
    },
    {
      quote: "As a rescue volunteer, I appreciate how easy it is to post animals for adoption. Great platform!",
      author: "Emma L.",
    },
  ];

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
          <Typography color="text.primary">Contact</Typography>
        </Breadcrumbs>

        {/* Back to Home Button */}
        <Box sx={{ mb: 4 }}>
          <Button
            component={Link}
            to="/home"
            startIcon={<HomeIcon />}
            variant="outlined"
            sx={{ borderColor: 'primary.main', color: 'primary.main' }}
          >
            Back to Home
          </Button>
        </Box>

        <Grid container spacing={4}>
          {/* Left Column - Contact Information */}
          <Grid item xs={12} md={4}>
            {/* Contact Information Card */}
            <Paper elevation={0} sx={{ p: 4, mb: 3, borderRadius: 3, bgcolor: 'background.paper' }}>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: 'primary.main' }}>
                Contact Information
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                If you need help, have questions, or want support from our team, feel free to reach out using the contact details below. We are always here to help.
              </Typography>

              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <EmailIcon color="primary" />
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Email
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      <a href="mailto:77795@office.mans.org.pl" style={{ color: 'inherit', textDecoration: 'none' }}>
                        77795@office.mans.org.pl
                      </a>
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600, mt: 0.5 }}>
                      <a href="mailto:oussamaelgana1@gmail.com" style={{ color: 'inherit', textDecoration: 'none' }}>
                        oussamaelgana1@gmail.com
                      </a>
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <PhoneIcon color="primary" />
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Phone & WhatsApp
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      <a href="tel:+48786615361" style={{ color: 'inherit', textDecoration: 'none' }}>
                        +48 786 615 361
                      </a>
                    </Typography>
                    <Typography variant="caption" color="text.secondary" component="a" href="https://wa.me/48786615361" target="_blank" sx={{ textDecoration: 'none', display: 'block', mt: 0.5 }}>
                      Chat on WhatsApp
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600, mt: 1 }}>
                      <a href="tel:+48505866821" style={{ color: 'inherit', textDecoration: 'none' }}>
                        +48 505 866 821
                      </a>
                    </Typography>
                    <Typography variant="caption" color="text.secondary" component="a" href="https://wa.me/48505866821" target="_blank" sx={{ textDecoration: 'none', display: 'block', mt: 0.5 }}>
                      Chat on WhatsApp
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Paper>

            {/* Support Hours */}
            <Paper elevation={0} sx={{ p: 4, mb: 3, borderRadius: 3, bgcolor: 'background.paper' }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                <AccessTimeIcon color="primary" />
                Support Hours
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2">Monday–Friday</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>09:00–18:00</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2">Saturday</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>10:00–16:00</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2">Sunday</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.secondary' }}>Closed</Typography>
                </Box>
              </Box>
            </Paper>

            {/* Social Media */}
            <Paper elevation={0} sx={{ p: 4, mb: 3, borderRadius: 3, bgcolor: 'background.paper' }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                Follow Us
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <IconButton
                  sx={{ bgcolor: 'primary.light', '&:hover': { bgcolor: 'primary.main', color: 'white' } }}
                  href="https://facebook.com" target="_blank"
                >
                  <FacebookIcon />
                </IconButton>
                <IconButton
                  sx={{ bgcolor: 'primary.light', '&:hover': { bgcolor: 'primary.main', color: 'white' } }}
                  href="https://instagram.com" target="_blank"
                >
                  <InstagramIcon />
                </IconButton>
                <IconButton
                  sx={{ bgcolor: 'primary.light', '&:hover': { bgcolor: 'primary.main', color: 'white' } }}
                  href="https://twitter.com" target="_blank"
                >
                  <TwitterIcon />
                </IconButton>
                <IconButton
                  sx={{ bgcolor: 'primary.light', '&:hover': { bgcolor: 'primary.main', color: 'white' } }}
                  href="https://tiktok.com" target="_blank"
                >
                  <TikTokIcon />
                </IconButton>
              </Box>
            </Paper>

            {/* Emergency Notice */}
            <Paper
              elevation={0}
              sx={{
                p: 3,
                mb: 3,
                borderRadius: 3,
                bgcolor: 'error.light',
                borderLeft: '4px solid',
                borderColor: 'error.main',
              }}
            >
              <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                <WarningIcon color="error" />
                <Typography variant="h6" sx={{ fontWeight: 700, color: 'error.dark' }}>
                  Emergency Notice
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: 'error.dark' }}>
                For animals in immediate danger, please contact your local authorities or nearest animal rescue service before using PawConnect. Our platform focuses on adoption, missing pets, and community support.
              </Typography>
            </Paper>

            {/* Meet the Creator */}
            <Paper elevation={0} sx={{ p: 4, borderRadius: 3, bgcolor: 'primary.light' }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: 'primary.dark' }}>
                Created by Oussama El Gana
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.primary', lineHeight: 1.8 }}>
                PawConnect was created by Oussama El Gana, an animal lover dedicated to building tools that protect animals and support the people who care for them. His mission is to use technology to make adoption, reporting, and community support easier and more compassionate.
              </Typography>
            </Paper>
          </Grid>

          {/* Right Column - Feedback Form */}
          <Grid item xs={12} md={8}>
            <Paper elevation={0} sx={{ p: 4, borderRadius: 3, bgcolor: 'background.paper' }}>
              <Typography variant="h4" component="h1" sx={{ fontWeight: 800, mb: 1, color: 'primary.dark' }}>
            Leave us your valuable feedback
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                Your feedback helps us improve PawConnect and serve the community better.
              </Typography>

              {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {error}
                </Alert>
              )}

              <form onSubmit={handleSubmit}>
                {/* Contact Purpose Selector */}
                <FormControl fullWidth sx={{ mb: 3 }}>
                  <InputLabel>Contact Purpose</InputLabel>
                  <Select
                    value={contactPurpose}
                    label="Contact Purpose"
                    onChange={(e) => setContactPurpose(e.target.value)}
                    required
                  >
                    <MenuItem value="General Feedback">General Feedback</MenuItem>
                    <MenuItem value="Adoption Issue">Adoption Issue</MenuItem>
                    <MenuItem value="Missing Pet Issue">Missing Pet Issue</MenuItem>
                    <MenuItem value="Technical Problem">Technical Problem</MenuItem>
                    <MenuItem value="Feature Suggestion">Feature Suggestion</MenuItem>
                    <MenuItem value="Collaboration Request">Collaboration Request</MenuItem>
                  </Select>
                </FormControl>

                {/* Optional Name Field */}
                <TextField
                  fullWidth
                  label="Name (Optional)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  sx={{ mb: 3 }}
                  InputProps={{
                    startAdornment: <PersonIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                  }}
                />

                {/* Optional Email Field */}
                <TextField
                  fullWidth
                  label="Email (Optional)"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{ mb: 3 }}
                  InputProps={{
                    startAdornment: <EmailIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                  }}
                />

                {/* Rating */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body1" sx={{ fontWeight: 600, mb: 2 }}>
            How would you rate your experiences so far with our platform?
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                    <Rating
                      value={rating}
                      onChange={(event, newValue) => {
                        setRating(newValue);
                      }}
                      size="large"
                      max={10}
                    />
                    <Typography variant="body2" color="text.secondary">
                      {rating > 0 ? `${rating}/10` : 'Select a rating'}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                    <Typography variant="caption" color="text.secondary">
                      Poor
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Excellent
                    </Typography>
                  </Box>
                </Box>

                {/* Feedback Textarea */}
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body1" sx={{ fontWeight: 600, mb: 1 }}>
                Tell us how we can improve
                  </Typography>
                  <TextField
                    fullWidth
                    multiline
                    rows={6}
                    placeholder="Your Feedback"
                value={description}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value.length <= MAX_FEEDBACK_LENGTH) {
                        setDescription(value);
                      }
                    }}
                required
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                      },
                    }}
                  />
                  <Typography
                    variant="caption"
                    color={description.length > MAX_FEEDBACK_LENGTH * 0.9 ? 'error' : 'text.secondary'}
                    sx={{ mt: 0.5, display: 'block', textAlign: 'right' }}
                  >
                    {description.length}/{MAX_FEEDBACK_LENGTH} characters
                  </Typography>
                </Box>

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                  disabled={loading || rating === 0 || !description.trim()}
                  sx={{
                    bgcolor: 'primary.main',
                    py: 1.5,
                    '&:hover': {
                      bgcolor: 'primary.dark',
                    },
                  }}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : 'Send Feedback'}
                </Button>
          </form>
            </Paper>

            {/* FAQ Section */}
            <Paper elevation={0} sx={{ p: 4, mt: 4, borderRadius: 3, bgcolor: 'background.paper' }}>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: 'primary.main' }}>
                Frequently Asked Questions
              </Typography>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography sx={{ fontWeight: 600 }}>How do I report a missing pet?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2" color="text.secondary">
                    Navigate to the "Missing" section in the main menu, then click "Create Post" to report a missing pet. Fill in the details including photos, location, and contact information.
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography sx={{ fontWeight: 600 }}>How do I create or edit an adoption post?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2" color="text.secondary">
                    After logging in, go to the "Adoption" page and click "Create Post". You can edit your posts from your profile page under "My Adoption Posts".
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography sx={{ fontWeight: 600 }}>How long does it take to get a reply?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2" color="text.secondary">
                    We aim to respond to all inquiries within 24-48 hours during business days. For urgent matters, please call our support line.
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography sx={{ fontWeight: 600 }}>How do I contact support regarding account issues?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2" color="text.secondary">
                    Use the contact form above and select "Technical Problem" as the contact purpose, or email us directly at 77795@office.mans.org.pl or oussamaelgana1@gmail.com with your account details.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Paper>

            {/* Testimonials Section */}
            <Paper elevation={0} sx={{ p: 4, mt: 4, borderRadius: 3, bgcolor: 'background.paper' }}>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: 'primary.main' }}>
                What Our Community Says
              </Typography>
              <Grid container spacing={3}>
                {testimonials.map((testimonial, index) => (
                  <Grid item xs={12} md={4} key={index}>
                    <Card
                      elevation={0}
                      sx={{
                        height: '100%',
                        bgcolor: 'primary.light',
                        borderRadius: 2,
                        p: 2,
                      }}
                    >
                      <CardContent>
                        <Typography variant="body2" sx={{ fontStyle: 'italic', mb: 2, lineHeight: 1.8 }}>
                          "{testimonial.quote}"
                        </Typography>
                        <Typography variant="caption" sx={{ fontWeight: 600, color: 'primary.dark' }}>
                          — {testimonial.author}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>
        </Grid>

        {/* Success Dialog */}
        <Dialog open={showSuccessDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CheckCircleIcon color="success" />
            Thank You!
          </DialogTitle>
          <DialogContent>
            <Typography>
              Thank you for your message! Your feedback has been received and helps us improve PawConnect.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} variant="contained" color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
}
