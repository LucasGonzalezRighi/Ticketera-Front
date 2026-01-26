export interface Ticket {
  _id: string;
  userId: string;
  eventId: string;
  ticketCode: string;
  status: 'PAID' | 'USED' | 'CANCELLED';
  createdAt: string;
  validatedAt?: string;
}

export interface TicketWithEvent extends Ticket {
  event?: {
    title: string;
    venue: string;
    date: string;
  };
}
