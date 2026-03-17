// file: front-end/src/api/tickets.ts
import api from './base';
import { ApiResponse } from '../interfaces/api';
import { PurchaseResponse, TicketWithEvent } from '../interfaces/ticket';
import { API_ROUTES } from '../constants/api';

export interface ValidateResponse {
  valid: boolean;
  status: string;
  validatedAt?: string;
  ticket?: any; // Avoiding circular dep for now, or use Ticket
  event?: {
    title: string;
    venue: string;
    date: string;
  };
  owner?: {
    name: string;
    email: string;
  };
}

export const ticketsApi = {
  purchase: async (eventId: string, quantity: number) => {
    // Return PurchaseResponse
    const response = await api.post<ApiResponse<PurchaseResponse>>(API_ROUTES.TICKETS.PURCHASE, { eventId, quantity });
    return response.data;
  },

  getMyTickets: async () => {
    const response = await api.get<ApiResponse<TicketWithEvent[]>>(API_ROUTES.TICKETS.MY_TICKETS);
    return response.data;
  },

  validate: async (ticketCode: string) => {
    const response = await api.post<ApiResponse<ValidateResponse>>(API_ROUTES.TICKETS.VALIDATE, { ticketCode });
    return response.data;
  },
};
