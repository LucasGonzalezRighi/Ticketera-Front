import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { extractErrorMessage } from '../utils/extractErrorMessage';

export function useRegister() {
  const { register } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (data: { email: string; password: string; name: string }) => {
    setIsLoading(true);
    setError(null);
    try {
      await register(data);
    } catch (err) {
      setError(extractErrorMessage(err));
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { register: handleRegister, isLoading, error };
}
