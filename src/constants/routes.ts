export const APP_ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  MY_TICKETS: '/my-tickets',
  VALIDATE: '/validate',
  EVENTS: {
    DETAIL: (id: string) => `/events/${id}`,
  },
};
