'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { LoginForm } from '@/components/presentation/molecules/LoginForm';
import { AuthLayout } from '@/components/presentation/layout/AuthLayout';
import { UI_TEXTS } from '@/constants/ui';
import { APP_ROUTES } from '@/constants/routes';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

function LoginContent() {
  const searchParams = useSearchParams();
  const reason = searchParams.get('reason');

  return (
    <>
      {reason === 'session_expired' && (
        <div className="mb-6 animate-in fade-in slide-in-from-top-2 duration-300">
           <Alert variant="destructive" className="bg-amber-500/10 border-amber-500/50 text-amber-500 backdrop-blur-sm">
             <AlertCircle className="h-4 w-4" />
             <AlertTitle>Sesión Expirada</AlertTitle>
             <AlertDescription>
               Tu sesión ha expirado. Por favor, volvé a iniciar sesión.
             </AlertDescription>
           </Alert>
        </div>
      )}
      <LoginForm />
    </>
  );
}

export default function LoginPage() {
  return (
    <AuthLayout
      title={UI_TEXTS.auth.login.title}
      subtitle={UI_TEXTS.auth.login.subtitle}
      footerLinkText={UI_TEXTS.auth.login.registerLinkText}
      footerLinkHref={APP_ROUTES.REGISTER}
    >
      <Suspense fallback={<div className="flex justify-center p-4">Cargando...</div>}>
        <LoginContent />
      </Suspense>
    </AuthLayout>
  );
}
