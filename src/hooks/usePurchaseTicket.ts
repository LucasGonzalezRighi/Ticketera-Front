import { useState } from 'react';
import { ticketsApi } from '../api/tickets';
import { Ticket } from '../interfaces/ticket';
import { extractErrorMessage } from '../utils/extractErrorMessage';

export function usePurchaseTicket() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ticket, setTicket] = useState<Ticket | null>(null);

  const purchase = async (eventId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await ticketsApi.purchase(eventId);
      if (response.success) {
        setTicket(response.data);
        return response.data;
      }
    } catch (err) {
      setError(extractErrorMessage(err));
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { purchase, ticket, isLoading, error };
}
