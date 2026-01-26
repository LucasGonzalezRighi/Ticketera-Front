import React, { useState } from 'react';
import { TicketWithEvent } from '../../../interfaces/ticket';
import { StatusBadge } from '../../ui/atoms/StatusBadge';
import { formatDate } from '../../../utils/formatDate';
import { QrCode } from 'lucide-react';
import { Button } from '../../ui/atoms/Button';

interface TicketCardProps {
  ticket: TicketWithEvent;
}

export const TicketCard: React.FC<TicketCardProps> = ({ ticket }) => {
  const [showQr, setShowQr] = useState(false);

  return (
    <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900">{ticket.event?.title || 'Evento Desconocido'}</h3>
          <p className="text-sm text-gray-500">{formatDate(ticket.event?.date || '')}</p>
          <p className="text-sm text-gray-500">{ticket.event?.venue}</p>
        </div>
        <StatusBadge status={ticket.status} />
      </div>

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
        <div className="text-xs text-gray-400 font-mono">ID: {ticket.ticketCode.slice(0, 8)}...</div>
        <Button variant="secondary" onClick={() => setShowQr(!showQr)} className="text-sm py-1">
          <QrCode className="w-4 h-4 mr-2" />
          {showQr ? 'Ocultar QR' : 'Ver QR'}
        </Button>
      </div>

      {showQr && (
        <div className="mt-4 flex justify-center p-4 bg-gray-50 rounded-lg">
          {/* En una app real, aquí generarías el QR usando una librería o un endpoint de imagen */}
          <div className="text-center">
             <img 
                src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${ticket.ticketCode}`} 
                alt="QR Code" 
                className="mx-auto"
             />
             <p className="mt-2 text-xs text-gray-500 font-mono">{ticket.ticketCode}</p>
          </div>
        </div>
      )}
    </div>
  );
};
