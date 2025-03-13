import axios from 'axios';

// Create a base URL for all API requests
const API_URL = 'http://localhost:3000/api';

// Function to get the auth token
const getAuthToken = () => localStorage.getItem('authToken');

// Create an authenticated API request
export const authRequest = async (method, endpoint, data = null) => {
  const token = getAuthToken();
  
  const config = {
    method,
    url: `${API_URL}${endpoint}`,
    headers: {
      'Content-Type': 'application/json',
    }
  };
  
  // Add authorization header if token exists
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  
  // Add data to request if provided
  if (data) {
    config.data = data;
  }
  
  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    // Handle token expiration
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    throw error;
  }
};

// Convenience methods
export const get = (endpoint) => authRequest('get', endpoint);
export const post = (endpoint, data) => authRequest('post', endpoint, data);
export const put = (endpoint, data) => authRequest('put', endpoint, data);
export const del = (endpoint) => authRequest('delete', endpoint);