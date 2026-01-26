import { axiosNextClient } from '../lib/helpers/axiosClient';
import { storage } from '../utils/storage';

// Utilizamos el cliente pre-configurado para Next.js API
const api = axiosNextClient;

// Interceptor para agregar el token
api.interceptors.request.use(
  (config) => {
    const token = storage.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
