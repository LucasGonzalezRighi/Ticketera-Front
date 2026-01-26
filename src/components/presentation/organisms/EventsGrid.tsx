import React from 'react';
import { Event } from '../../interfaces/event';
import { EventCard } from '../molecules/EventCard';
import { Loader } from '../../ui/atoms/Loader';

interface EventsGridProps {
  events: Event[];
  isLoading: boolean;
  error: string | null;
}

export const EventsGrid: React.FC<EventsGridProps> = ({ events, isLoading, error }) => {
  if (isLoading) return <Loader />;
  
  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No hay eventos disponibles en este momento.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <EventCard key={event._id} event={event} />
      ))}
    </div>
  );
};
