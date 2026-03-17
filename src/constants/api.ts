import { clientConfig } from '../lib/config/api';

export const API_ROUTES = {
  AUTH: {
    LOGIN: clientConfig.endpoints.auth.login,
    REGISTER: clientConfig.endpoints.auth.register,
    ME: clientConfig.endpoints.auth.me,
  },
  EVENTS: {
    LIST: clientConfig.endpoints.events.base,
    DETAIL: clientConfig.endpoints.events.detail,
  },
  TICKETS: {
    PURCHASE: clientConfig.endpoints.tickets.purchase,
    MY_TICKETS: clientConfig.endpoints.tickets.myTickets,
    VALIDATE: clientConfig.endpoints.tickets.validate,
  },
};
