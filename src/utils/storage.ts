import { STORAGE_KEYS } from '../constants/storage';

export const storage = {
  getToken: () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(STORAGE_KEYS.TOKEN);
    }
    return null;
  },
  setToken: (token: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.TOKEN, token);
    }
  },
  removeToken: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEYS.TOKEN);
    }
  },
};
