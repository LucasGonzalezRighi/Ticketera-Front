'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../../../context/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LogOut, Ticket, LayoutDashboard, QrCode } from 'lucide-react';
import { APP_ROUTES } from '../../../constants/routes';
import { Loader } from '@/components/ui/atoms/Loader';

export const LayoutWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout, isLoading } = useAuth();
  const pathname = usePathname();

  const isAuthPage = [
    APP_ROUTES.LOGIN,
    APP_ROUTES.REGISTER,
    '/login',
    '/register',
  ].includes(pathname);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <Link 
                href={user ? APP_ROUTES.DASHBOARD : APP_ROUTES.HOME} 
                className="flex items-center gap-2 text-primary hover:text-primary/90 transition-colors"
              >
                <div className="bg-primary/10 p-2 rounded-lg">
                  <Ticket className="w-5 h-5 text-primary" />
                </div>
                <span className="font-bold text-xl tracking-tight text-foreground">Ticketera</span>
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              {user && (
                <>
                  <Link 
                    href={APP_ROUTES.DASHBOARD} 
                    className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    Eventos
                  </Link>
                  <Link 
                    href={APP_ROUTES.MY_TICKETS} 
                    className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                  >
                    <Ticket className="w-4 h-4" />
                    Mis Tickets
                  </Link>
                  <Link 
                    href={APP_ROUTES.VALIDATE} 
                    className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                  >
                    <QrCode className="w-4 h-4" />
                    Validar
                  </Link>
                </>
              )}
            </nav>

            {/* Auth Actions */}
            <div className="flex items-center gap-4">
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:bg-muted">
                      <Avatar className="h-10 w-10 border border-border/50">
                        <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`} alt={user.email} />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {user.email.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.name || 'Usuario'}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href={APP_ROUTES.MY_TICKETS} className="cursor-pointer w-full flex items-center">
                        <Ticket className="mr-2 h-4 w-4" />
                        <span>Mis Tickets</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={APP_ROUTES.VALIDATE} className="cursor-pointer w-full flex items-center">
                        <QrCode className="mr-2 h-4 w-4" />
                        <span>Validar Entradas</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={logout}
                      className="text-destructive focus:text-destructive cursor-pointer"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Cerrar Sesión</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex items-center gap-3">
                  <Button variant="ghost" asChild className="text-muted-foreground hover:text-foreground">
                    <Link href={APP_ROUTES.LOGIN}>
                      Ingresar
                    </Link>
                  </Button>
                  <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm">
                    <Link href={APP_ROUTES.REGISTER}>
                      Registrarse
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      <footer className="border-t border-border/40 bg-muted/20">
        <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Ticket className="w-4 h-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                &copy; {new Date().getFullYear()} Ticketera App.
              </p>
            </div>
            <div className="flex gap-6">
              <span className="text-sm text-muted-foreground hover:text-foreground cursor-pointer transition-colors">Términos</span>
              <span className="text-sm text-muted-foreground hover:text-foreground cursor-pointer transition-colors">Privacidad</span>
              <span className="text-sm text-muted-foreground hover:text-foreground cursor-pointer transition-colors">Ayuda</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
