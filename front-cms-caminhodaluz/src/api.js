// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.15.8'  // Endereço do seu backend
});

export default api;
