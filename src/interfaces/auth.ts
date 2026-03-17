import { User } from './user';

export interface LoginResponse {
  token: string;
  user: User;
}

export interface RegisterResponse {
  _id: string;
  email: string;
  token?: string; // Optional if backend returns it on register
  user?: User;    // Optional if backend returns it on register
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
