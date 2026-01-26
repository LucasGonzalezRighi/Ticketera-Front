import React from 'react';
import Link from 'next/link';
import { Calendar, MapPin } from 'lucide-react';
import { Event } from '../../../interfaces/event';
import { formatDate, formatPrice } from '../../../utils/formatDate';

interface EventCardProps {
  event: Event;
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <div className="flex flex-col h-full p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <h3 className="text-lg font-bold text-gray-900 mb-2">{event.title}</h3>
      <div className="flex items-center text-gray-500 mb-1">
        <Calendar className="w-4 h-4 mr-2" />
        <span className="text-sm">{formatDate(event.date)}</span>
      </div>
      <div className="flex items-center text-gray-500 mb-4">
        <MapPin className="w-4 h-4 mr-2" />
        <span className="text-sm">{event.venue}</span>
      </div>
      <div className="mt-auto flex items-center justify-between">
        <span className="text-lg font-bold text-blue-600">{formatPrice(event.price)}</span>
        <Link 
          href={`/events/${event._id}`}
          className="inline-flex items-center justify-center px-3 py-1.5 text-sm rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-blue-500"
        >
          Ver Detalle
        </Link>
      </div>
    </div>
  );
};
