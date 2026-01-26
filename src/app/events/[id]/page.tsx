'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useEventDetail } from '../../../hooks/useEventDetail';
import { usePurchaseTicket } from '../../../hooks/usePurchaseTicket';
import { Button } from '../../../components/ui/atoms/Button';
import { Loader } from '../../../components/ui/atoms/Loader';
import { formatDate, formatPrice } from '../../../utils/formatDate';
import { Calendar, MapPin, Ticket as TicketIcon } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { ProtectedRoute } from '../../../components/presentation/layout/ProtectedRoute';

export default function EventDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();
  const { user } = useAuth();
  const { event, isLoading, error } = useEventDetail(id);
  const { purchase, isLoading: isPurchasing } = usePurchaseTicket();

  const handlePurchase = async () => {
    if (!user) {
      router.push('/login');
      return;
    }
    try {
      await purchase(id);
      router.push('/my-tickets');
    } catch (err) {
      // Error is handled by hook
    }
  };

  if (isLoading) return <Loader />;
  if (error || !event) return <div className="text-center py-12 text-red-600">{error || 'Evento no encontrado'}</div>;

  return (
    <ProtectedRoute>
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="h-48 bg-blue-600 flex items-center justify-center">
          <TicketIcon className="w-24 h-24 text-white opacity-50" />
        </div>
        
        <div className="p-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{event.title}</h1>
              <div className="space-y-3 text-gray-600">
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 mr-3" />
                  <span>{formatDate(event.date)}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-3" />
                  <span>{event.venue}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-blue-600">{formatPrice(event.price)}</p>
              <p className="text-sm text-gray-500 mt-1">Stock: {event.stock}</p>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-100 flex justify-end">
            <Button 
              size="lg" 
              onClick={handlePurchase} 
              isLoading={isPurchasing}
              disabled={event.stock <= 0}
            >
              {event.stock > 0 ? 'Comprar Ticket' : 'Agotado'}
            </Button>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
