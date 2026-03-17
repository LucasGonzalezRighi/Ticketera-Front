export const APP_ROUTES = {
  HOME: '/',
  LOGIN: '/new-login',
  REGISTER: '/new-register',
  DASHBOARD: '/dashboard',
  MY_TICKETS: '/dashboard/tickets',
  VALIDATE: '/validate',
  EVENTS: {
    DETAIL: (id: string) => `/events/${id}`,
  },
};
