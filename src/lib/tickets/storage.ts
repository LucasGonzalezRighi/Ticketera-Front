import { TicketPurchase } from '../../interfaces/ticket';

const getPurchaseKey = (userId: string) => `ticketera_purchases_${userId}`;

export const ticketStorage = {
  savePurchase: (userId: string, purchase: TicketPurchase) => {
    if (typeof window === 'undefined') return;
    
    const key = getPurchaseKey(userId);
    const existingStr = localStorage.getItem(key);
    const purchases: TicketPurchase[] = existingStr ? JSON.parse(existingStr) : [];
    
    purchases.unshift(purchase); // Add to top
    localStorage.setItem(key, JSON.stringify(purchases));
  },

  getPurchases: (userId: string): TicketPurchase[] => {
    if (typeof window === 'undefined') return [];
    
    const key = getPurchaseKey(userId);
    const existingStr = localStorage.getItem(key);
    return existingStr ? JSON.parse(existingStr) : [];
  }
};
