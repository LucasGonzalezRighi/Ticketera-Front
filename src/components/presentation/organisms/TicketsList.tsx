import React from 'react';
import { TicketWithEvent } from '../../../interfaces/ticket';
import { TicketCard } from '../molecules/TicketCard';
import { Loader } from '../../ui/atoms/Loader';

interface TicketsListProps {
  tickets: TicketWithEvent[];
  isLoading: boolean;
  error: string | null;
}

export const TicketsList: React.FC<TicketsListProps> = ({ tickets, isLoading, error }) => {
  if (isLoading) return <Loader />;
  
  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (tickets.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No has comprado tickets aún.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {tickets.map((ticket) => (
        <TicketCard key={ticket._id} ticket={ticket} />
      ))}
    </div>
  );
};
