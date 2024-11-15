import axios from 'axios';


// const BASE_URL = 'http://localhost:9090/';  present in vite.config.ts
const jwtToken = sessionStorage.getItem('token');

const checkToken = () => {
  const jwtToken = sessionStorage.getItem('token');
  if (!jwtToken) {
    // Optionally handle the error (e.g., redirect to login)
    console.error('JWT token is missing. Please log in.');
    // You can redirect the user to the login page if needed
    // window.location.href = '/login';
    return false;
  }
  return true;
};

const apiClient = axios.create({
  headers: {
    'Content-Type': 'application/json'
  },
});

const apiAuthClient = axios.create({
  headers: {
    'Content-Type': 'application/json',
    Authorization: jwtToken ? `Bearer ${jwtToken}` : ''
  },
});

// This interceptor will automatically add the Authorization header to every request made using 
// apiAuthClient once the token is available, even if it's loaded after the initial request.
apiAuthClient.interceptors.request.use((config) => {
  const jwtToken = sessionStorage.getItem('token');
  if (jwtToken) {
    config.headers['Authorization'] = `Bearer ${jwtToken}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// GET Request
export const getData = async (url: string) => {
  const response = await apiClient.get(url);
  return response;
};


// GET Auth Request
export const getAuthData = async (url: string) => {
  debugger;
  if (!checkToken()) return;
  const response = await apiAuthClient.get(url);
  return response;
};

// PUT Auth Request
export const postAuthData = async (url: string, data: any) => {
  if (!checkToken()) return;
  const response = await apiAuthClient.post(url, data);
  return response;
};

// PUT Auth Request
export const deleteAuthData = async (url: string, data: any) => {
  if (!checkToken()) return;
  const response = await apiAuthClient.delete(url, data);
  return response;
};

// PUT Auth Request
export const putAuthData = async (url: string, data: any) => {
  if (!checkToken()) return;
  const response = await apiAuthClient.put(url, data);
  return response;
};

// POST Request
export const postData = async (url: string, data: any) => {
  debugger;
  const response = await apiClient.post(url, data);
  return response;
};

// PUT Request
export const putData = async (url: string, data: any) => {
  debugger;
  const response = await apiClient.put(url, data);
  return response;
};

// DELETE Request
export const deleteData = async (url: string) => {
  const response = await apiClient.delete(url);
  return response;
};
