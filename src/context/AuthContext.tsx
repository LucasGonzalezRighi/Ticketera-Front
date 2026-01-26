'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '../interfaces/user';
import { authApi } from '../api/auth';
import { storage } from '../utils/storage';
import { APP_ROUTES } from '../constants/routes';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (data: { email: string; password: string }) => Promise<void>;
  register: (data: { email: string; password: string; name: string }) => Promise<void>;
  logout: () => void;
  loadSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const loadSession = async () => {
    const storedToken = storage.getToken();
    if (!storedToken) {
      setIsLoading(false);
      return;
    }

    try {
      setToken(storedToken);
      const response = await authApi.getMe();
      if (response.success && response.data) {
        setUser(response.data);
      } else {
        throw new Error('Sesión inválida');
      }
    } catch (error) {
      console.error('Error cargando sesión:', error);
      storage.removeToken();
      setToken(null);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSession();
  }, []);

  const login = async (data: { email: string; password: string }) => {
    const response = await authApi.login(data);
    if (response.success) {
      storage.setToken(response.data.token);
      setToken(response.data.token);
      setUser(response.data.user);
      router.push(APP_ROUTES.DASHBOARD);
    }
  };

  const register = async (data: { email: string; password: string; name: string }) => {
    await authApi.register(data);
    // Auto login or redirect to login
    router.push(APP_ROUTES.LOGIN);
  };

  const logout = () => {
    storage.removeToken();
    setToken(null);
    setUser(null);
    router.push(APP_ROUTES.LOGIN);
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, register, logout, loadSession }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
