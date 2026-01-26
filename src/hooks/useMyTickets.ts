import { useState, useEffect } from 'react';
import { ticketsApi } from '../api/tickets';
import { TicketWithEvent } from '../interfaces/ticket';
import { extractErrorMessage } from '../utils/extractErrorMessage';

export function useMyTickets() {
  const [tickets, setTickets] = useState<TicketWithEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTickets = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await ticketsApi.getMyTickets();
      if (response.success) {
        setTickets(response.data);
      }
    } catch (err) {
      setError(extractErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return { tickets, isLoading, error, refetch: fetchTickets };
}
