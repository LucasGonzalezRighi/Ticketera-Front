'use client';

import React from 'react';
import { RefreshCw, CalendarOff, ServerCrash } from 'lucide-react';
import { Event } from '../../../interfaces/event';
import { EventCard } from '../molecules/EventCard';
import { Skeleton } from '../../ui/skeleton';
import { Card, CardContent } from '../../ui/card';
import { Button } from '../../ui/button';
import { UI_TEXTS } from '../../../constants/ui';
import { Alert, AlertDescription, AlertTitle } from '../../ui/alert';

interface EventsGridProps {
  events: Event[];
  isLoading: boolean;
  error: string | null;
}

const EventCardSkeleton = () => (
  <Card className="flex flex-col h-full bg-card/50 backdrop-blur-sm border-border/50">
    <div className="p-6 space-y-4">
        <div className="flex justify-between">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-5 w-16" />
        </div>
        <div className="space-y-2">
            <Skeleton className="h-7 w-3/4" />
            <Skeleton className="h-7 w-1/2" />
        </div>
        <div className="space-y-3 pt-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
        </div>
    </div>
    <div className="p-6 pt-0 mt-auto flex items-center justify-between gap-4 border-t border-border/50">
        <div className="space-y-1">
            <Skeleton className="h-3 w-10" />
            <Skeleton className="h-6 w-24" />
        </div>
        <Skeleton className="h-9 w-28" />
    </div>
  </Card>
);

export const EventsGrid: React.FC<EventsGridProps> = ({ events, isLoading, error }) => {
  const gridClasses = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6";

  if (isLoading) {
    return (
      <div className={gridClasses}>
        {Array.from({ length: 8 }).map((_, i) => (
          <EventCardSkeleton key={i} />
        ))}
      </div>
    );
  }
  
  if (error) {
    const isBackendDown = error.includes('503') || error.toLowerCase().includes('backend') || error.toLowerCase().includes('servicio');
    
    return (
      <div className="flex justify-center items-center py-12 w-full">
         <Alert variant="destructive" className="max-w-lg bg-destructive/10 border-destructive/20 text-destructive">
           <ServerCrash className="h-4 w-4" />
           <AlertTitle>{isBackendDown ? 'Servicio no disponible' : 'Error al cargar eventos'}</AlertTitle>
           <AlertDescription className="mt-2">
             {isBackendDown 
               ? 'El servicio se encuentra temporalmente no disponible. Por favor intenta nuevamente en unos instantes.' 
               : error}
           </AlertDescription>
           <Button 
             variant="outline" 
             className="mt-4 w-full border-destructive/30 hover:bg-destructive/20" 
             onClick={() => window.location.reload()}
           >
             <RefreshCw className="mr-2 h-4 w-4" />
             Reintentar
           </Button>
         </Alert>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="flex justify-center items-center py-12 w-full">
        <Card className="w-full max-w-md bg-card/50 backdrop-blur-sm border-border/50">
          <CardContent className="flex flex-col items-center text-center p-6 space-y-4">
            <div className="p-3 bg-muted rounded-full">
                <CalendarOff className="h-8 w-8 text-muted-foreground" />
            </div>
            <div className="space-y-2">
                <h3 className="font-semibold text-xl tracking-tight">
                    {UI_TEXTS.events.empty.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                    {UI_TEXTS.events.empty.description}
                </p>
            </div>
            <Button variant="outline" onClick={() => window.location.reload()}>
                <RefreshCw className="mr-2 h-4 w-4" />
                {UI_TEXTS.events.empty.cta}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className={gridClasses}>
      {events.map((event) => (
        <EventCard key={event._id} event={event} />
      ))}
    </div>
  );
};
