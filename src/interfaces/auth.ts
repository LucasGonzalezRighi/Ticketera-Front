import { User } from './user';

export interface LoginResponse {
  token: string;
  user: User;
}

export interface RegisterResponse {
  _id: string;
  email: string;
}
