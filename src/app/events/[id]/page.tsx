'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useEvent } from '../../../hooks/useEvent';
import { useAuth } from '../../../context/AuthContext';
import { ticketsApi } from '../../../api/tickets';
import { ticketStorage } from '../../../lib/tickets/storage';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../../../components/ui/card';
import { Skeleton } from '../../../components/ui/skeleton';
import { Badge } from '../../../components/ui/badge';
import { Separator } from '../../../components/ui/separator';
import { Input } from '../../../components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { Calendar, MapPin, Ticket, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../../../components/ui/alert';
import { toast } from 'sonner';

export default function EventDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const { event, isLoading, error, refetch } = useEvent(id);
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();
  
  const [quantity, setQuantity] = useState(1);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [purchaseError, setPurchaseError] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Revalidate on focus to ensure stock is fresh
  useEffect(() => {
    const onFocus = () => {
        refetch();
    };
    window.addEventListener('focus', onFocus);
    return () => window.removeEventListener('focus', onFocus);
  }, [refetch]);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value);
    if (!isNaN(val) && val >= 1 && event && val <= event.stock) {
      setQuantity(val);
    }
  };

  const handlePurchase = async () => {
    if (!isAuthenticated) {
      router.push(`/login?redirect=/events/${id}`);
      return;
    }

    if (!event) return;

    setIsPurchasing(true);
    setPurchaseError(null);

    try {
      const response = await ticketsApi.purchase(event._id, quantity);
      
      // Check normalized response structure
      if (response && response.success && response.data) {
        // Save to local storage for "My Tickets" view (MVP)
        ticketStorage.savePurchase(user?.id || 'guest', {
          orderId: response.data._id || Math.random().toString(36).substr(2, 9),
          eventId: event._id,
          eventTitle: event.title,
          quantity: quantity,
          total: event.price * quantity,
          date: new Date().toISOString(),
          venue: event.venue
        });

        toast.success(`Compra exitosa! Orden #${response.data._id.slice(-6)}`);
        router.push('/dashboard/tickets?success=true');
      } else {
        // Handle explicit failures
        throw new Error(response.message || 'Error al procesar la compra');
      }
    } catch (err: any) {
      console.error("Purchase error:", err);
      
      // Handle 401 specifically
      if (err.response?.status === 401 || err.code === 'UNAUTHORIZED') {
          logout('/login?reason=session_expired'); 
          return;
      }

      // Handle 409/400 (Stock issues)
      if (err.response?.status === 409 || err.message?.includes('stock')) {
          setPurchaseError('No hay suficiente stock disponible.');
          refetch(); // Update stock immediately
      } else {
          setPurchaseError(err.message || 'Error de conexión. Intenta nuevamente.');
      }
    } finally {
      setIsPurchasing(false);
      setIsDialogOpen(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-6 max-w-4xl space-y-6">
        <Skeleton className="h-64 w-full rounded-xl" />
        <div className="space-y-4">
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-24 w-full" />
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="container mx-auto p-6 flex justify-center">
         <Alert variant="destructive" className="max-w-lg bg-destructive/10 border-destructive/20 text-destructive">
           <AlertCircle className="h-4 w-4" />
           <AlertTitle>Error</AlertTitle>
           <AlertDescription>{error || 'El evento no existe o fue eliminado.'}</AlertDescription>
           <Button variant="outline" className="mt-4 w-full border-destructive/30 hover:bg-destructive/20" onClick={() => router.push('/dashboard')}>
             Volver al Dashboard
           </Button>
         </Alert>
      </div>
    );
  }

  const isSoldOut = event.stock <= 0;
  const totalPrice = event.price * quantity;

  return (
    <div className="container mx-auto p-4 sm:p-6 max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden bg-gradient-to-br from-teal-900/50 to-emerald-900/50 border border-teal-500/20 shadow-2xl backdrop-blur-md flex items-center justify-center group">
             {/* Placeholder for Event Image */}
             <Ticket className="h-32 w-32 text-teal-500/30 group-hover:scale-110 transition-transform duration-500" />
             <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
             <div className="absolute bottom-0 left-0 p-6">
               <Badge className={`mb-2 border ${isSoldOut ? 'bg-destructive/20 text-destructive border-destructive/50' : 'bg-teal-500/20 text-teal-300 border-teal-500/50'}`}>
                 {isSoldOut ? 'Agotado' : 'Entradas Disponibles'}
               </Badge>
               <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">{event.title}</h1>
             </div>
          </div>

          <Card className="bg-card/30 backdrop-blur-md border-white/10">
            <CardHeader>
              <CardTitle>Acerca del evento</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-teal-400" />
                <span>{new Date(event.date).toLocaleDateString()} - {new Date(event.date).toLocaleTimeString()}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-teal-400" />
                <span>{event.venue}</span>
              </div>
              <Separator className="bg-white/10 my-4" />
              <p>
                {event.description || `¡No te pierdas ${event.title} en ${event.venue}! Una experiencia única que no olvidarás.`}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar / Purchase */}
        <div className="lg:col-span-1">
          <Card className={`sticky top-24 backdrop-blur-xl shadow-xl ring-1 transition-all duration-300 ${isSoldOut ? 'bg-card/20 border-white/5 ring-white/5 grayscale opacity-80' : 'bg-card/40 border-teal-500/30 ring-teal-500/20'}`}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Entradas</span>
                <span className={`text-2xl font-bold ${isSoldOut ? 'text-muted-foreground' : 'text-teal-400'}`}>${event.price}</span>
              </CardTitle>
              <CardDescription>
                  {isSoldOut ? 'Este evento ya no tiene entradas disponibles.' : 'Selecciona la cantidad de entradas'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {!isSoldOut && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Cantidad</label>
                    <div className="flex items-center gap-4">
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        disabled={quantity <= 1}
                      >
                        -
                      </Button>
                      <Input 
                        type="number" 
                        value={quantity} 
                        onChange={handleQuantityChange}
                        className="text-center font-bold bg-background/50"
                        min={1}
                        max={event.stock}
                      />
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => setQuantity(Math.min(event.stock, quantity + 1))}
                        disabled={quantity >= event.stock}
                      >
                        +
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground text-right">
                      Máximo {event.stock} entradas
                    </p>
                  </div>
              )}

              <Separator className="bg-white/10" />

              <div className="flex justify-between items-center font-bold text-lg">
                <span>Total</span>
                <span>${totalPrice}</span>
              </div>
            </CardContent>
            <CardFooter>
              {isSoldOut ? (
                  <Button className="w-full" variant="destructive" disabled>
                      Agotado
                  </Button>
              ) : (
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button 
                        className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white shadow-lg shadow-teal-900/20" 
                        size="lg"
                      >
                        Comprar Entradas
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md bg-card border-white/10 backdrop-blur-xl">
                      <DialogHeader>
                        <DialogTitle>Confirmar Compra</DialogTitle>
                        <DialogDescription>
                          Revisa los detalles de tu compra antes de confirmar.
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="space-y-4 py-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="text-muted-foreground">Evento</div>
                          <div className="font-medium text-right">{event.title}</div>
                          
                          <div className="text-muted-foreground">Fecha</div>
                          <div className="font-medium text-right">{new Date(event.date).toLocaleDateString()}</div>
                          
                          <div className="text-muted-foreground">Cantidad</div>
                          <div className="font-medium text-right">{quantity} x ${event.price}</div>
                          
                          <Separator className="col-span-2 bg-white/10" />
                          
                          <div className="font-bold">Total a Pagar</div>
                          <div className="font-bold text-right text-teal-400 text-lg">${totalPrice}</div>
                        </div>

                        {purchaseError && (
                          <Alert variant="destructive" className="bg-red-900/20 border-red-900/50">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>{purchaseError}</AlertDescription>
                          </Alert>
                        )}
                      </div>

                      <DialogFooter className="gap-2 sm:gap-0">
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)} disabled={isPurchasing}>
                          Cancelar
                        </Button>
                        <Button 
                          onClick={handlePurchase} 
                          disabled={isPurchasing}
                          className="bg-teal-600 hover:bg-teal-500"
                        >
                          {isPurchasing ? 'Procesando...' : 'Confirmar Pago'}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
