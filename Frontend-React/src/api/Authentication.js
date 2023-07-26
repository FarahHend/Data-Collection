// apiService.js

import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/v1/auth'; // Replace with your backend base URL

const apiService = axios.create({
  baseURL: BASE_URL,
});

export const register = async (registerData) => {
  try {
    const response = await apiService.post('/register', registerData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const login = async (loginData) => {
  try {
    const response = await apiService.post('/authenticate', loginData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const refreshToken = async () => {
  try {
    const response = await apiService.post('/refresh-token');
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
