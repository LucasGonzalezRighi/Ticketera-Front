import { useState } from 'react';
import { ticketsApi, ValidateResponse } from '../api/tickets';
import { extractErrorMessage } from '../utils/extractErrorMessage';

export function useValidateTicket() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ValidateResponse | null>(null);

  const validate = async (ticketCode: string) => {
    setIsLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await ticketsApi.validate(ticketCode);
      if (response.success) {
        setResult(response.data);
        return response.data;
      }
    } catch (err) {
      const msg = extractErrorMessage(err);
      setError(msg);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setResult(null);
    setError(null);
  };

  return { validate, result, isLoading, error, reset };
}
