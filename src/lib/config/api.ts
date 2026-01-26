export const apiNextConfig = {
  baseUrl: '/api',
};

export const apiConfig = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api',
  endpoints: {
    auth: {
      login: '/auth/login',
      register: '/auth/register',
      me: '/auth/me',
    },
    events: {
      base: '/events',
      detail: (id: string) => `/events/${id}`,
    },
    tickets: {
      purchase: '/tickets/purchase',
      myTickets: '/tickets/my-tickets',
      validate: '/tickets/validate',
    },
  },
};
