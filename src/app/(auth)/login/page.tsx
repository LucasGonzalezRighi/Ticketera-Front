'use client';

import React from 'react';
import Link from 'next/link';
import { LoginForm } from '../../../components/presentation/molecules/LoginForm';
import { AuthCard } from '../../../components/presentation/organisms/AuthCard';

export default function LoginPage() {
  return (
    <AuthCard
      title="Iniciar Sesión"
      subtitle="Accede a tu cuenta para comprar tickets"
      footer={
        <div className="text-center text-sm">
          <span className="text-gray-600">¿No tienes cuenta? </span>
          <Link href="/register" className="font-medium text-blue-600 hover:text-blue-500">
            Regístrate aquí
          </Link>
        </div>
      }
    >
      <LoginForm />
    </AuthCard>
  );
}
