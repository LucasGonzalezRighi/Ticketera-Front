import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { extractErrorMessage } from '../utils/extractErrorMessage';

export function useLogin() {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (data: { email: string; password: string }) => {
    setIsLoading(true);
    setError(null);
    try {
      await login(data);
    } catch (err) {
      setError(extractErrorMessage(err));
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { login: handleLogin, isLoading, error };
}
