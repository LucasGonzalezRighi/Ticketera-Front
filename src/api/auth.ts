import api from './base';
import { ApiResponse } from '../interfaces/api';
import { LoginResponse, RegisterResponse } from '../interfaces/auth';
import { User } from '../interfaces/user';
import { API_ROUTES } from '../constants/api';

export const authApi = {
  register: async (data: { email: string; password: string; name: string }) => {
    const response = await api.post<ApiResponse<RegisterResponse>>(API_ROUTES.AUTH.REGISTER, data);
    return response.data;
  },

  login: async (data: { email: string; password: string }) => {
    const response = await api.post<ApiResponse<LoginResponse>>(API_ROUTES.AUTH.LOGIN, data);
    return response.data;
  },

  getMe: async () => {
    const response = await api.get<ApiResponse<User>>(API_ROUTES.AUTH.ME);
    return response.data;
  },
  
  logout: async () => {
    // Optional: Call backend to invalidate token if implemented
    // await api.post(API_ROUTES.AUTH.LOGOUT);
    return Promise.resolve(); 
  }
};
