import api from './base';
import { ApiResponse } from '../interfaces/api';
import { Event } from '../interfaces/event';
import { API_ROUTES } from '../constants/api';

export const eventsApi = {
  getAll: async () => {
    const response = await api.get<ApiResponse<Event[]>>(API_ROUTES.EVENTS.LIST);
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get<ApiResponse<Event>>(API_ROUTES.EVENTS.DETAIL(id));
    return response.data;
  },
};
