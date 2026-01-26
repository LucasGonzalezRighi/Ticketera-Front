'use client';

import React from 'react';
import Link from 'next/link';
import { RegisterForm } from '../../../components/presentation/molecules/RegisterForm';
import { AuthCard } from '../../../components/presentation/organisms/AuthCard';

export default function RegisterPage() {
  return (
    <AuthCard
      title="Crear Cuenta"
      subtitle="Únete a Ticketera y descubre los mejores eventos"
      footer={
        <div className="text-center text-sm">
          <span className="text-gray-600">¿Ya tienes cuenta? </span>
          <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
            Inicia sesión aquí
          </Link>
        </div>
      }
    >
      <RegisterForm />
    </AuthCard>
  );
}
