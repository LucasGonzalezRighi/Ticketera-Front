'use client';

import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '../interfaces/user';
import { authApi } from '../api/auth';
import { storage } from '../utils/storage';
import { tokenHelper } from '../lib/auth/token';
import { APP_ROUTES } from '../constants/routes';
import { AuthState } from '../interfaces/auth';

interface AuthContextType extends AuthState {
  login: (data: { email: string; password: string }) => Promise<void>;
  register: (data: { email: string; password: string; name: string }) => Promise<void>;
  logout: (redirectUrl?: string) => void;
  loadSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  const router = useRouter();
  const isMounted = useRef(false);

  // Helper to update state partials
  const updateState = (updates: Partial<AuthState>) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  const loadSession = async () => {
    const storedToken = tokenHelper.getToken();
    const storedUser = storage.getUser();
    
    // 1. Optimistic load check
    if (storedToken) {
      // Optimistic restore for user object if available
      if (storedUser) {
        updateState({ user: storedUser });
      }

      // Keep isLoading = true while validating
      try {
        const response = await authApi.getMe();
        if (response.success && response.data) {
          // Update with fresh data from server
          updateState({ 
            user: response.data,
            isAuthenticated: true,
            isLoading: false,
            error: null
          });
          // Update storage with fresh data
          storage.setUser(response.data);
        } else {
            throw new Error('Sesión inválida');
        }
      } catch (error: any) {
        console.warn('Session validation failed:', error.message);
        
        // Handle 401 specifically
        if (error.response?.status === 401 || error.code === 'UNAUTHORIZED') {
            tokenHelper.clearToken();
            storage.removeUser();
            updateState({ 
                user: null, 
                isAuthenticated: false, 
                isLoading: false, 
                error: null 
            });
            router.push('/login?reason=session_expired');
        } else {
            // Other errors (network, 500) -> Logout to be safe or retry?
            // User requested clean handling. If backend is down, maybe don't logout?
            // For now, logout on validation failure is safest.
            logout(); 
        }
      }
    } else {
      updateState({ isLoading: false, isAuthenticated: false });
    }
  };

  useEffect(() => {
    if (!isMounted.current) {
        loadSession();
        isMounted.current = true;
    }
  }, []);

  const login = async (data: { email: string; password: string }) => {
    updateState({ isLoading: true, error: null });
    try {
      const response = await authApi.login(data);
      if (response.success) {
        tokenHelper.setToken(response.data.token);
        storage.setUser(response.data.user);
        
        updateState({
          user: response.data.user,
          isAuthenticated: true,
          isLoading: false,
          error: null
        });
      }
    } catch (err: any) {
        const msg = err.response?.data?.message || err.message || 'Error al iniciar sesión';
        updateState({
            isLoading: false,
            isAuthenticated: false,
            error: msg
        });
        throw err;
    }
  };

  const register = async (data: { email: string; password: string; name: string }) => {
    updateState({ isLoading: true, error: null });
    try {
      const response = await authApi.register(data);
      if (response.success) {
        // Auto-login if token present
        if (response.data.token && response.data.user) {
             tokenHelper.setToken(response.data.token);
             storage.setUser(response.data.user);
             updateState({
                user: response.data.user,
                isAuthenticated: true,
                isLoading: false,
                error: null
             });
        } else {
             updateState({ isLoading: false });
        }
      }
    } catch (err: any) {
        const msg = err.response?.data?.message || err.message || 'Error al registrarse';
        updateState({
            isLoading: false,
            error: msg
        });
        throw err;
    }
  };

  const logout = (redirectUrl?: string) => {
    tokenHelper.clearToken();
    storage.removeUser();
    updateState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null
    });
    router.push(redirectUrl || APP_ROUTES.LOGIN);
  };

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout, loadSession }}>
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
