'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '../../../context/AuthContext';
import { useMyTickets } from '../../../hooks/useMyTickets';
import { TicketWithEvent } from '../../../interfaces/ticket';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '../../../components/ui/alert';
import { CheckCircle2, Ticket, Calendar, MapPin, ShoppingBag, Download, Eye, QrCode } from 'lucide-react';
import { Skeleton } from '../../../components/ui/skeleton';
import { Badge } from '../../../components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import { Separator } from '../../../components/ui/separator';

export default function MyTicketsPage() {
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth();
  const { tickets, isLoading: isTicketsLoading, error } = useMyTickets();
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [selectedTicket, setSelectedTicket] = useState<TicketWithEvent | null>(null);
  const showSuccess = searchParams.get('success') === 'true';

  const isLoading = isAuthLoading || isTicketsLoading;

  const handleDownloadReceipt = () => {
    window.print();
  };

  if (isLoading) {
    return (
      <div className="space-y-6 container mx-auto p-4 sm:p-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Mis Entradas</h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-48 w-full rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  // Auth check handled by AuthGuard ideally, but double check
  if (!isAuthenticated && !isAuthLoading) {
      // router.push('/login'); // Optional: Let AuthGuard handle it
  }

  return (
    <div className="space-y-6 container mx-auto p-4 sm:p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">Mis Entradas</h1>
        <Button variant="outline" onClick={() => router.push('/dashboard')}>
          Explorar Eventos
        </Button>
      </div>

      {showSuccess && (
        <div className="animate-in fade-in slide-in-from-top-4 duration-500">
          <Alert className="bg-teal-900/20 border-teal-500/50 text-teal-200">
            <CheckCircle2 className="h-4 w-4 text-teal-400" />
            <AlertTitle>¡Compra Exitosa!</AlertTitle>
            <AlertDescription>
              Tus entradas han sido confirmadas. Te enviamos un correo con los detalles.
            </AlertDescription>
          </Alert>
        </div>
      )}
      
      {error && (
         <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
         </Alert>
      )}

      {tickets.length === 0 ? (
        <Card className="bg-card/30 backdrop-blur-md border-white/10">
          <CardContent className="flex flex-col items-center justify-center py-12 space-y-4">
            <div className="p-4 bg-muted/20 rounded-full">
              <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-xl font-semibold">No tienes entradas aún</h3>
              <p className="text-muted-foreground">Explora los eventos disponibles y asegura tu lugar.</p>
            </div>
            <Button onClick={() => router.push('/dashboard')} className="mt-4">
              Ver Eventos
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {tickets.map((ticket) => (
            <Card key={ticket._id} className="bg-card/40 backdrop-blur-md border-white/10 hover:bg-card/50 transition-colors group relative overflow-hidden flex flex-col">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
                <Ticket className="h-24 w-24 -rotate-12" />
              </div>
              
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <Badge variant="outline" className={`
                    ${ticket.status === 'PAID' ? 'bg-teal-500/10 text-teal-300 border-teal-500/30' : ''}
                    ${ticket.status === 'USED' ? 'bg-gray-500/10 text-gray-300 border-gray-500/30' : ''}
                    ${ticket.status === 'CANCELLED' ? 'bg-red-500/10 text-red-300 border-red-500/30' : ''}
                  `}>
                    {ticket.status === 'PAID' ? 'Válido' : ticket.status}
                  </Badge>
                  <span className="text-xs text-muted-foreground font-mono">#{ticket.ticketCode.slice(-6)}</span>
                </div>
                <CardTitle className="mt-2 line-clamp-1 text-lg">{ticket.event.title}</CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <Calendar className="h-3 w-3" />
                  {new Date(ticket.event.date).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-3 flex-grow">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                   <MapPin className="h-3 w-3" />
                   <span className="line-clamp-1">{ticket.event.venue}</span>
                </div>
                <div className="flex justify-between items-center text-sm pt-2 border-t border-white/5">
                   <span>Precio</span>
                   <span className="font-bold text-foreground">${ticket.event.price}</span>
                </div>
              </CardContent>

              <CardFooter className="pt-2 gap-2">
                 <Button variant="secondary" size="sm" className="w-full" onClick={() => router.push(`/events/${ticket.event._id}`)}>
                    <Eye className="h-4 w-4 mr-2" />
                    Evento
                 </Button>
                 <Button variant="outline" size="sm" className="w-full" onClick={() => setSelectedTicket(ticket)}>
                    <QrCode className="h-4 w-4 mr-2" />
                    Ticket
                 </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Ticket/Receipt Modal */}
      <Dialog open={!!selectedTicket} onOpenChange={(open) => !open && setSelectedTicket(null)}>
        <DialogContent className="sm:max-w-md bg-card border-white/10 backdrop-blur-xl">
            <DialogHeader>
                <DialogTitle>Tu Entrada</DialogTitle>
                <DialogDescription>
                    Presentá este código en la entrada del evento.
                </DialogDescription>
            </DialogHeader>

            {selectedTicket && (
                <div className="space-y-6 py-4">
                    <div className="flex flex-col items-center justify-center p-6 bg-white rounded-xl border border-white/10">
                        {/* Placeholder for QR Code - In real app, render actual QR */}
                        <div className="bg-black p-2 rounded">
                            <img 
                                src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${selectedTicket.ticketCode}`} 
                                alt="QR Code" 
                                className="w-32 h-32"
                            />
                        </div>
                        <p className="mt-2 text-xs font-mono text-gray-500">{selectedTicket.ticketCode}</p>
                    </div>

                    <div className="text-center">
                         <h3 className="text-xl font-bold">{selectedTicket.event.title}</h3>
                         <p className="text-muted-foreground text-sm mt-1">{new Date(selectedTicket.event.date).toLocaleString()}</p>
                    </div>

                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Lugar</span>
                            <span className="font-medium text-right">{selectedTicket.event.venue}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Estado</span>
                            <Badge variant="outline" className="text-xs">{selectedTicket.status}</Badge>
                        </div>
                        <Separator className="bg-white/10 my-2" />
                        <div className="flex justify-between text-lg font-bold">
                            <span>Valor</span>
                            <span className="text-teal-400">${selectedTicket.event.price}</span>
                        </div>
                    </div>
                </div>
            )}

            <DialogFooter className="sm:justify-center">
                <Button className="w-full sm:w-auto" onClick={handleDownloadReceipt}>
                    <Download className="mr-2 h-4 w-4" />
                    Descargar
                </Button>
            </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
