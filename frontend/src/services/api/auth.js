import apiClient from './client';

export const authAPI = {
  login: (email, password) =>
    apiClient.post('/api/auth/signin', { email, password }),

  register: (name, email, password, username) =>
    apiClient.post('/api/auth/signup', { name, email, password, username }),

  verify: (token) =>
    apiClient.post(`/api/auth/verify?token=${token}`),

  forgotPassword: (email) =>
    apiClient.post(`/api/auth/resetrequest?email=${email}`),

  resetPassword: (token, password) =>
    apiClient.put(`/api/auth/reset/${token}`, { password }),

  updateUser: (id, userData) =>
    apiClient.put(`/api/auth/user/${id}/update`, userData),

  getAllUsers: (pageNo = 0, pageSize = 10, sortBy = 'id', sortDir = 'asc') =>
    apiClient.get(`/api/auth/users?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`),

  banUser: (id) =>
    apiClient.put(`/api/auth/admin/user/${id}/ban`),
};

