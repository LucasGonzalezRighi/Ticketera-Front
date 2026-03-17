// file: front-end/src/interfaces/ticket.ts
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
  event: {
    _id: string;
    title: string;
    venue: string;
    date: string;
    price: number;
    description: string;
    stock: number;
  };
}

export interface PurchaseResponse {
  _id: string; // Order ID (primary ticket ID)
  ticketCode: string;
  status: string;
  quantity: number;
  emailSent: boolean;
  qrDataUrl: string;
  event: {
    title: string;
    venue: string;
    date: string;
    price: number;
  };
  eventId: string;
}

export interface TicketPurchase {
  orderId: string;
  eventId: string;
  eventTitle: string;
  quantity: number;
  total: number;
  date: string; // ISO string
  venue: string;
}
