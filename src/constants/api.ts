import { apiConfig } from '../lib/config/api';

export const API_ROUTES = {
  AUTH: {
    LOGIN: apiConfig.endpoints.auth.login,
    REGISTER: apiConfig.endpoints.auth.register,
    ME: apiConfig.endpoints.auth.me,
  },
  EVENTS: {
    LIST: apiConfig.endpoints.events.base,
    DETAIL: apiConfig.endpoints.events.detail,
  },
  TICKETS: {
    PURCHASE: apiConfig.endpoints.tickets.purchase,
    MY_TICKETS: apiConfig.endpoints.tickets.myTickets,
    VALIDATE: apiConfig.endpoints.tickets.validate,
  },
};
