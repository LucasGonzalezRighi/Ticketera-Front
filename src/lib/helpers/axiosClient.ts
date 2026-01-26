import axios from 'axios';
import { apiConfig, apiNextConfig } from '../config/api';

// Cliente para el Servidor Next.js -> Backend (Privado/Público)
export const axiosBackendClient = axios.create({
  baseURL: apiConfig.baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Cliente para Componentes React -> Next.js API
export const axiosNextClient = axios.create({
  baseURL: apiNextConfig.baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para manejar errores globalmente si es necesario
axiosBackendClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

axiosNextClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);
