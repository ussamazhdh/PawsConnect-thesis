import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authAPI } from '../../services/api/auth';
import { toast } from 'react-toastify';

// Load user info from localStorage
const loadUserFromStorage = () => {
  try {
    const userInfo = localStorage.getItem('userInfo');
    return userInfo ? JSON.parse(userInfo) : null;
  } catch (error) {
    console.error('Error loading user from storage:', error);
    return null;
  }
};

// Async thunks
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await authAPI.login(email, password);
      
      // Backend returns ApiResponse wrapper: { success, message, data }
      // apiClient interceptor already extracts response.data, so we get the ApiResponse object
      let userInfo;
      
      if (response && typeof response === 'object') {
        // Check if it's wrapped in ApiResponse
        if (response.success !== undefined && response.data) {
          userInfo = response.data;
        } else if (response.data) {
          // Already extracted
          userInfo = response.data;
        } else {
          // Direct user object
          userInfo = response;
        }
      } else {
        userInfo = response;
      }
      
      // Validate userInfo has required fields
      if (!userInfo || !userInfo.id) {
        throw new Error('Invalid response from server');
      }
      
      // Store in localStorage
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      
      toast.success('Login successful!');
      return userInfo;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 
                           error.message || 
                           'Login failed. Please check your credentials.';
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async ({ name, email, password, username }, { rejectWithValue }) => {
    try {
      const response = await authAPI.register(name, email, password, username);
      
      // Backend returns ApiResponse wrapper
      let userData;
      if (response && typeof response === 'object') {
        if (response.success !== undefined && response.data) {
          userData = response.data;
        } else if (response.data) {
          userData = response.data;
        } else {
          userData = response;
        }
      } else {
        userData = response;
      }
      
      toast.success('Registration successful! Please check your email to verify your account.');
      return userData;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 
                           error.message || 
                           'Registration failed. Please try again.';
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const updateUser = createAsyncThunk(
  'auth/updateUser',
  async ({ id, userData }, { rejectWithValue }) => {
    try {
      const response = await authAPI.updateUser(id, userData);
      const updatedUser = response.data || response;
      
      // Update localStorage
      localStorage.setItem('userInfo', JSON.stringify(updatedUser));
      
      toast.success('Profile updated successfully!');
      return updatedUser;
    } catch (error) {
      return rejectWithValue(error.message || 'Update failed');
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  localStorage.removeItem('userInfo');
  toast.info('Logged out successfully');
});

// Initial state
const initialState = {
  userInfo: loadUserFromStorage(),
  loading: false,
  error: null,
  isAuthenticated: !!loadUserFromStorage(),
};

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
      state.isAuthenticated = !!action.payload;
      if (action.payload) {
        localStorage.setItem('userInfo', JSON.stringify(action.payload));
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
        state.isAuthenticated = true;
        state.error = null;
        
        // Ensure userInfo is stored in localStorage
        if (action.payload) {
          localStorage.setItem('userInfo', JSON.stringify(action.payload));
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      // Register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update User
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.userInfo = null;
        state.isAuthenticated = false;
        state.error = null;
      });
  },
});

export const { clearError, setUserInfo } = authSlice.actions;
export default authSlice.reducer;

