import axios from 'axios';
import { backendConfig, clientConfig } from '../config/api';

// Cliente para el Servidor Next.js -> Backend (Privado/Público)
// SOLO debe usarse desde el servidor (Route Handlers, Server Components)
export const axiosBackendClient = axios.create({
  baseURL: backendConfig.baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000, // Timeout de 5s para no colgar el request
});

// Cliente para Componentes React -> Next.js API
export const axiosNextClient = axios.create({
  baseURL: clientConfig.baseUrl,
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
