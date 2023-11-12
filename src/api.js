// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:80'  // Endereço do seu backend
});

export default api;
