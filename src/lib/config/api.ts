// SERVER-SIDE CONFIG (Next.js Route Handlers -> Backend)
// This config should ONLY be used in server components/route handlers
export const backendConfig = {
  // Strict server-side URL, fallback to localhost for dev
  baseUrl: process.env.BACKEND_URL || 'http://localhost:4000',
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

// CLIENT-SIDE CONFIG (React Components -> Next.js Proxy)
export const clientConfig = {
  baseUrl: '/api',
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
