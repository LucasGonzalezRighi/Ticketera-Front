'use client';

import React from 'react';
import { useEvents } from '../../hooks/useEvents';
import { EventsGrid } from '../../components/presentation/organisms/EventsGrid';

import { ProtectedRoute } from '../../components/presentation/layout/ProtectedRoute';

export default function DashboardPage() {
  const { events, isLoading, error } = useEvents();

  return (
    <ProtectedRoute>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Próximos Eventos</h1>
        </div>
        <EventsGrid events={events} isLoading={isLoading} error={error} />
      </div>
    </ProtectedRoute>
  );
}
