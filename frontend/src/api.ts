// src/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8081', // Porta do seu backend Spring
});

export default api;
