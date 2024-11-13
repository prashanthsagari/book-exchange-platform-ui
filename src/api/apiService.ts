import axios from 'axios';


// const BASE_URL = 'http://localhost:9090/';  present in vite.config.ts
const jwtToken = sessionStorage.getItem('token');
const apiClient = axios.create({
  headers: {
    'Content-Type': 'application/json'
  },
});

const apiAuthClient = axios.create({
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${jwtToken}`
  },
});

// GET Request
export const getData = async (url: string) => {
  const response = await apiClient.get(url);
  return response.data;
};


// GET Auth Request
export const getAuthData = async (url: string) => {
  debugger;
  const response = await apiAuthClient.get(url);
  return response.data;
};

// POST Request
export const postData = async (url: string, data: any) => {
  const response = await apiClient.post(url, data);
  return response.data;
};

// PUT Request
export const putData = async (url: string, data: any) => {
  const response = await apiClient.put(url, data);
  return response.data;
};

// PUT Auth Request
export const putAuthData = async (url: string, data: any) => {
  const response = await apiAuthClient.put(url, data);
  return response.data;
};

// DELETE Request
export const deleteData = async (url: string) => {
  const response = await apiClient.delete(url);
  return response.data;
};
