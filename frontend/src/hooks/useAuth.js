import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, register, logout, updateUser, clearError } from '../store/slices/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo, loading, error, isAuthenticated } = useSelector((state) => state.auth);

  const handleLogin = async (email, password) => {
    try {
      const result = await dispatch(login({ email, password })).unwrap();
      
      // Wait a bit for state to update, then navigate based on role
      setTimeout(() => {
        // Get updated userInfo from state
        const updatedUserInfo = result || userInfo;
        
        if (updatedUserInfo) {
          // Check if admin (role id 1 or ROLE_ADMIN)
          const isAdmin = updatedUserInfo.role?.some(
            (role) => role.id === 1 || role.name === 'ROLE_ADMIN'
          );
          
          if (isAdmin) {
            navigate('/dashboard');
          } else {
            navigate('/home');
          }
        } else {
          // Fallback navigation
          navigate('/home');
        }
      }, 100);
    } catch (error) {
      // Error is handled by the slice and toast
      console.error('Login error:', error);
      // Don't navigate on error - user stays on login page
    }
  };

  const handleRegister = async (name, email, password, username) => {
    try {
      await dispatch(register({ name, email, password, username })).unwrap();
      navigate('/registration/complete');
    } catch (error) {
      // Error is handled by the slice and toast
      console.error('Registration error:', error);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleUpdateUser = async (id, userData) => {
    try {
      await dispatch(updateUser({ id, userData })).unwrap();
    } catch (error) {
      // Error is handled by the slice and toast
      console.error('Update error:', error);
    }
  };

  const clearAuthError = () => {
    dispatch(clearError());
  };

  const isAdmin = userInfo?.role?.some((role) => role.name === 'ROLE_ADMIN' || role.id === 1);
  const isUser = userInfo?.role?.some((role) => role.name === 'ROLE_USER' || role.id === 2);

  return {
    userInfo,
    loading,
    error,
    isAuthenticated,
    isAdmin,
    isUser,
    handleLogin,
    handleRegister,
    handleLogout,
    handleUpdateUser,
    clearAuthError,
  };
};

