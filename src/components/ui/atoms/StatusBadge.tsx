import React from 'react';
import { cn } from '../../../utils/cn';

interface StatusBadgeProps {
  status: 'PAID' | 'USED' | 'CANCELLED';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const styles = {
    PAID: 'bg-green-100 text-green-800 border-green-200',
    USED: 'bg-gray-100 text-gray-800 border-gray-200',
    CANCELLED: 'bg-red-100 text-red-800 border-red-200',
  };

  const labels = {
    PAID: 'Pagado',
    USED: 'Usado',
    CANCELLED: 'Cancelado',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
        styles[status]
      )}
    >
      {labels[status]}
    </span>
  );
};
