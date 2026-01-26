'use client'
import React from 'react';
import Link from 'next/link';
import { useAuth } from '../../../context/AuthContext';
import { Button } from '../../ui/atoms/Button';
import { LogOut, Ticket, User as UserIcon } from 'lucide-react';
import { APP_ROUTES } from '../../../constants/routes';

export const LayoutWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout, isLoading } = useAuth();

  if (isLoading) return null; // Or a global loader

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href={user ? APP_ROUTES.DASHBOARD : APP_ROUTES.HOME} className="flex items-center text-blue-600 font-bold text-xl">
                <Ticket className="w-6 h-6 mr-2" />
                Ticketera
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <Link href={APP_ROUTES.DASHBOARD} className="text-gray-600 hover:text-gray-900 font-medium">
                    Eventos
                  </Link>
                  <Link href={APP_ROUTES.MY_TICKETS} className="text-gray-600 hover:text-gray-900 font-medium">
                    Mis Tickets
                  </Link>
                  <Link href={APP_ROUTES.VALIDATE} className="text-gray-600 hover:text-gray-900 font-medium">
                    Validar
                  </Link>
                  <div className="flex items-center pl-4 border-l border-gray-200">
                    <span className="text-sm text-gray-500 mr-4 hidden md:block">{user.email}</span>
                    <Button variant="outline" size="sm" onClick={logout} className="p-2">
                      <LogOut className="w-4 h-4" />
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <Link href={APP_ROUTES.LOGIN}>
                    <Button variant="outline" size="sm">Ingresar</Button>
                  </Link>
                  <Link href={APP_ROUTES.REGISTER}>
                    <Button variant="primary" size="sm">Registrarse</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Ticketera App. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};
