import axios from 'axios';
import {
  MISSING_POSTS_BY_USERID_FAIL,
  MISSING_POSTS_BY_USERID_REQUEST,
  MISSING_POSTS_BY_USERID_SUCCESS,
  MISSING_POST_BY_ID_FAIL,
  MISSING_POST_BY_ID_REQUEST,
  MISSING_POST_BY_ID_SUCCESS,
  MISSING_POST_CREATE_FAIL,
  MISSING_POST_CREATE_REQUEST,
  MISSING_POST_CREATE_SUCCESS,
  MISSING_POST_DELETE_FAIL,
  MISSING_POST_DELETE_REQUEST,
  MISSING_POST_DELETE_SUCCESS,
  MISSING_POST_EDIT_FAIL,
  MISSING_POST_EDIT_REQUEST,
  MISSING_POST_EDIT_SUCCESS,
  MISSING_POST_FAIL,
  MISSING_POST_REQUEST,
  MISSING_POST_SUCCESS
} from '../constants/missingAnimalConstants';

import { PRODUCTION_URL } from '../Utils/Production';

const BASE_URL = PRODUCTION_URL + '/api/missing';

export const missingPostsAction = (pageNo, pageSize) => async (dispatch) => {
  try {
    dispatch({
      type: MISSING_POST_REQUEST
    });

    const { data } = await axios.get(
      `${BASE_URL}/all?pageNo=${pageNo}&pageSize=${pageSize}`
    );

    dispatch({
      type: MISSING_POST_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: MISSING_POST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

export const missingPostByIdAction = (id) => async (dispatch) => {
  try {
    dispatch({
      type: MISSING_POST_BY_ID_REQUEST
    });

    const { data } = await axios.get(`${BASE_URL}/${id}`);

    dispatch({
      type: MISSING_POST_BY_ID_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: MISSING_POST_BY_ID_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

export const missingPostByUserIdAction =
  (id, pageNo, pageSize) => async (dispatch, getState) => {
    try {
      dispatch({
        type: MISSING_POSTS_BY_USERID_REQUEST
      });

      const {
        userLogin: { userInfo }
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.jwtdto.accessToken}`
        }
      };

      const { data } = await axios.get(
        `${BASE_URL}/user/${id}?pageNo=${pageNo}&pageSize=${pageSize}`,
        config
      );

      dispatch({
        type: MISSING_POSTS_BY_USERID_SUCCESS,
        payload: data
      });
    } catch (error) {
      dispatch({
        type: MISSING_POSTS_BY_USERID_FAIL,
        payload:
          error.response && error.response.data
            ? error.response.data
            : error.message
      });
    }
  };

export const missingPostCreateAction =
  (id, dataport) => async (dispatch, getState) => {
    try {
      dispatch({
        type: MISSING_POST_CREATE_REQUEST
      });

      // Try to get userInfo from state (both old and new Redux structure)
      const state = getState();
      let userInfo = null;
      
      // Try new auth slice first
      if (state.auth && state.auth.userInfo) {
        userInfo = state.auth.userInfo;
      }
      // Try old userLogin reducer
      else if (state.userLogin && state.userLogin.userInfo) {
        userInfo = state.userLogin.userInfo;
      }
      // Fallback to localStorage
      else {
        const storedUserInfo = localStorage.getItem('userInfo');
        if (storedUserInfo) {
          try {
            userInfo = JSON.parse(storedUserInfo);
          } catch (e) {
            console.error('Error parsing userInfo from localStorage:', e);
          }
        }
      }

      if (!userInfo) {
        throw new Error('User not logged in. Please login first.');
      }

      if (!userInfo.jwtdto || !userInfo.jwtdto.accessToken) {
        throw new Error('Invalid authentication token. Please login again.');
      }

      console.log('Creating missing post with:', { id, dataport, userId: userInfo.id });

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.jwtdto.accessToken}`
        }
      };

      console.log('API URL:', `${BASE_URL}/${id}/createmissingpost`);
      console.log('Request payload:', JSON.stringify(dataport, null, 2));

      const response = await axios.post(`${BASE_URL}/${id}/createmissingpost`, dataport, config);

      console.log('Missing post created successfully:', response.data);

      // Handle different response formats
      let responseData = response.data;
      if (responseData && typeof responseData === 'object' && responseData.data) {
        responseData = responseData.data;
      }

      dispatch({
        type: MISSING_POST_CREATE_SUCCESS,
        payload: responseData
      });
    } catch (error) {
      console.error('Error creating missing post:', error);
      console.error('Error response:', error.response);
      console.error('Error status:', error.response?.status);
      console.error('Error data:', error.response?.data);
      
      let errorMessage = 'Failed to create missing post';
      
      if (error.response) {
        // Server responded with error
        const errorData = error.response.data;
        
        // Handle ApiResponse wrapper
        if (errorData && typeof errorData === 'object') {
          if (errorData.message) {
            errorMessage = errorData.message;
          } else if (errorData.error) {
            errorMessage = errorData.error;
          } else if (typeof errorData === 'string') {
            errorMessage = errorData;
          }
        } else if (typeof errorData === 'string') {
          errorMessage = errorData;
        }
        
        // Add status-specific messages
        if (error.response.status === 404) {
          errorMessage = 'User not found. Please login again.';
        } else if (error.response.status === 401) {
          errorMessage = 'Authentication failed. Please login again.';
        } else if (error.response.status === 400) {
          errorMessage = errorMessage || 'Invalid data. Please check all fields.';
        }
      } else if (error.request) {
        errorMessage = 'Network error. Please check your connection.';
      } else {
        errorMessage = error.message || 'An unexpected error occurred.';
      }
      
      console.error('Final error message:', errorMessage);
      
      dispatch({
        type: MISSING_POST_CREATE_FAIL,
        payload: errorMessage
      });
      
      // Re-throw so component can handle it
      throw error;
    }
  };

export const missingPostUpdateAction =
  (id, dataport) => async (dispatch, getState) => {
    try {
      dispatch({
        type: MISSING_POST_EDIT_REQUEST
      });

      const {
        userLogin: { userInfo }
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.jwtdto.accessToken}`
        }
      };

      const { data } = await axios.put(`${BASE_URL}/${id}`, dataport, config);

      dispatch({
        type: MISSING_POST_EDIT_SUCCESS
      });
      dispatch({
        type: MISSING_POST_BY_ID_SUCCESS,
        payload: data
      });
    } catch (error) {
      dispatch({
        type: MISSING_POST_EDIT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      });
    }
  };

export const missingPostDeleteAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MISSING_POST_DELETE_REQUEST
    });

    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.jwtdto.accessToken}`
      }
    };

    await axios.delete(`${BASE_URL}/${id}`, config);

    dispatch({
      type: MISSING_POST_DELETE_SUCCESS
    });
  } catch (error) {
    dispatch({
      type: MISSING_POST_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};
