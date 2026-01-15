import axios from 'axios';

const backendApi = axios.create({
  baseURL: 'http://localhost:5000', // Replace with your backend API URL
  timeout: 10000, // 10 seconds timeout
});

export default backendApi;