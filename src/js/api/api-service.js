// src/js/api/api-service.js
import axios from 'axios';

const BASE_URL = 'https://story-api.dicoding.dev/v1';

// Create axios instance with base configuration
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Authentication services
export const authService = {
  async register(name, email, password) {
    try {
      const response = await apiClient.post('/register', {
        name,
        email,
        password,
      });
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  async login(email, password) {
    try {
      const response = await apiClient.post('/login', {
        email,
        password,
      });
      // Save token to localStorage
      const { token, name, userId } = response.data.loginResult;
      localStorage.setItem('token', token);
      localStorage.setItem('name', name);
      localStorage.setItem('userId', userId);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('userId');
    window.location.hash = '#/login';
  },

  isLoggedIn() {
    return !!localStorage.getItem('token');
  },

  getUserName() {
    return localStorage.getItem('name');
  },
};

// Story services
export const storyService = {
  async getStories() {
    try {
      const response = await apiClient.get('/stories');
      return response.data.listStory;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  async addStory(description, photoFile) {
    try {
      const formData = new FormData();
      formData.append('description', description);
      formData.append('photo', photoFile);

      const response = await axios.post(`${BASE_URL}/stories`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
};

// Error handling helper
function handleApiError(error) {
  if (error.response) {
    // Server responded with error status
    const errorMessage = error.response.data.message || 'Server error occurred';
    return new Error(errorMessage);
  } else if (error.request) {
    // Request made but no response
    return new Error('No response from server. Please check your internet connection.');
  } else {
    // Error in request setup
    return new Error('Error setting up request: ' + error.message);
  }
}
