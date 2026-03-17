import React from 'react';
import Link from 'next/link';
import { Calendar, MapPin, Ticket } from 'lucide-react';
import { Event } from '../../../interfaces/event';
import { formatDate, formatPrice } from '../../../utils/formatDate';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import { APP_ROUTES } from '../../../constants/routes';

interface EventCardProps {
  event: Event;
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <Card className="flex flex-col h-full bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group">
      <CardHeader className="space-y-2 pb-4">
        <div className="flex justify-between items-start gap-4">
          <Badge variant={event.stock > 0 ? "outline" : "destructive"} className="mb-2">
            {event.stock > 0 ? `${event.stock} disponibles` : 'Agotado'}
          </Badge>
          <Badge variant="secondary" className="font-mono text-xs">
            {event.venue.split(',')[0]}
          </Badge>
        </div>
        <CardTitle className="text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors line-clamp-2">
          {event.title}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-3 flex-grow">
        <div className="flex items-center text-muted-foreground text-sm">
          <Calendar className="w-4 h-4 mr-2 text-primary/70" />
          <span>{formatDate(event.date)}</span>
        </div>
        <div className="flex items-center text-muted-foreground text-sm">
          <MapPin className="w-4 h-4 mr-2 text-primary/70" />
          <span className="line-clamp-1">{event.venue}</span>
        </div>
      </CardContent>

      <CardFooter className="pt-4 border-t border-border/50 flex items-center justify-between gap-4">
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Precio</span>
          <span className="text-xl font-bold text-primary">{formatPrice(event.price)}</span>
        </div>
        <Button asChild size="sm" className="shadow-sm hover:shadow-primary/20">
          <Link href={APP_ROUTES.EVENTS.DETAIL(event._id)}>
            Ver detalle
            <Ticket className="w-4 h-4 ml-2" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
