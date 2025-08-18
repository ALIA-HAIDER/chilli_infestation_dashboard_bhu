import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:5000',
  timeout: 30000, // 30 seconds timeout for file uploads
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});