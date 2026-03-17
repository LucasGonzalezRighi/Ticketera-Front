import { useState, useEffect, useCallback } from 'react';
import { eventsApi } from '../api/events';
import { Event } from '../interfaces/event';
import { extractErrorMessage } from '../utils/extractErrorMessage';

export function useEvent(id: string) {
  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvent = useCallback(async (showLoading = true) => {
    if (!id) return;
    
    if (showLoading) setIsLoading(true);
    setError(null);
    try {
      const response = await eventsApi.getById(id);
      if (response.success && response.data) {
        setEvent(response.data);
      } else {
          setError(response.message || 'Error al cargar evento');
      }
    } catch (err) {
      setError(extractErrorMessage(err));
    } finally {
      if (showLoading) setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchEvent();
  }, [fetchEvent]);

  return { event, isLoading, error, refetch: () => fetchEvent(false) };
}
