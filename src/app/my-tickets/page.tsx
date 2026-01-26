'use client';

import React from 'react';
import { useMyTickets } from '../../hooks/useMyTickets';
import { TicketsList } from '../../components/presentation/organisms/TicketsList';

import { ProtectedRoute } from '../../components/presentation/layout/ProtectedRoute';

export default function MyTicketsPage() {
  const { tickets, isLoading, error } = useMyTickets();

  return (
    <ProtectedRoute>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Mis Tickets</h1>
        <TicketsList tickets={tickets} isLoading={isLoading} error={error} />
      </div>
    </ProtectedRoute>
  );
}
