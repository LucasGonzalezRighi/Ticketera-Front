import { useState, useEffect } from 'react';
import { eventsApi } from '../api/events';
import { Event } from '../interfaces/event';
import { extractErrorMessage } from '../utils/extractErrorMessage';

export function useEventDetail(id: string) {
  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchEvent = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await eventsApi.getById(id);
        if (response.success) {
          setEvent(response.data);
        }
      } catch (err) {
        setError(extractErrorMessage(err));
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  return { event, isLoading, error };
}
