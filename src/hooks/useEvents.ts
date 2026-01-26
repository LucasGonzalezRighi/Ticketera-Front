import { useState, useEffect } from 'react';
import { eventsApi } from '../api/events';
import { Event } from '../interfaces/event';
import { extractErrorMessage } from '../utils/extractErrorMessage';

export function useEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await eventsApi.getAll();
      if (response.success) {
        setEvents(response.data);
      }
    } catch (err) {
      setError(extractErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return { events, isLoading, error, refetch: fetchEvents };
}
