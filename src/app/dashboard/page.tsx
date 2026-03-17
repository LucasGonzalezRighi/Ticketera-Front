'use client';

import React, { useEffect } from 'react';
import { useEvents } from '../../hooks/useEvents';
import { EventsGrid } from '../../components/presentation/organisms/EventsGrid';

export default function DashboardPage() {
  const { events, isLoading, error, refetch } = useEvents();

  // Revalidate on focus to ensure stock/event list is fresh
  useEffect(() => {
    const onFocus = () => {
        refetch();
    };
    window.addEventListener('focus', onFocus);
    return () => window.removeEventListener('focus', onFocus);
  }, [refetch]);

  return (
    <div className="space-y-6 container mx-auto p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">
            Próximos Eventos
            </h1>
            <p className="text-muted-foreground mt-1">
                Descubre y reserva tu lugar en los mejores eventos.
            </p>
        </div>
      </div>
      <EventsGrid events={events} isLoading={isLoading} error={error} />
    </div>
  );
}
