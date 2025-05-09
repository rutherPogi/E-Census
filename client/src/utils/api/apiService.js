import axios from 'axios';

//const API_URL = 'http://localhost:3000/api';
const API_URL = import.meta.env.VITE_API_URL;


// Function to get the auth token
const getAuthToken = () => localStorage.getItem('authToken');

// Create an authenticated API request
export const authRequest = async (method, endpoint, data = null, isMultipart = false) => {
  const token = getAuthToken();
  
  const config = {
    method,
    url: `${API_URL}${endpoint}`,
    headers: {
      'Content-Type': isMultipart ? 'multipart/form-data' : 'application/json',
    }
  };
  
  // Add authorization header if token exists
  if (token) { config.headers['Authorization'] = `Bearer ${token}`; }
  
  // Add data to request if provided
  if (data) { config.data = data; }
  
  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {

    if (error.response && error.response.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    throw error;
  }
};

// Convenience methods
export const get = (endpoint) => authRequest('get', endpoint);
export const post = (endpoint, data, isMultipart = false) => authRequest('post', endpoint, data, isMultipart);
export const put = (endpoint, data, isMultipart = false) => authRequest('put', endpoint, data, isMultipart);
export const del = (endpoint) => authRequest('delete', endpoint);