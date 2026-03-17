'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useRegister } from '../../../hooks/useRegister';
import { Button } from '../../ui/atoms/Button';
import { TextField } from '../../ui/atoms/TextField';
import { PasswordField } from '../../ui/atoms/PasswordField';
import { storage } from '../../../utils/storage';

export const RegisterForm: React.FC = () => {
  const { register, isLoading, error } = useRegister();
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '', name: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(formData);
      // Check if auto-login happened (token exists)
      if (storage.getToken()) {
        router.push('/dashboard');
      } else {
        router.push('/login');
      }
    } catch (error) {
      // Error handled by hook state
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <TextField
        id="name"
        label="Nombre Completo"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />
      <TextField
        id="email"
        label="Email"
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />
      <PasswordField
        id="password"
        label="Contraseña"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        required
      />
      {error && <div className="p-2 text-sm text-red-700 bg-red-100 rounded">{error}</div>}
      <Button type="submit" className="w-full" isLoading={isLoading}>
        Registrarse
      </Button>
    </form>
  );
};
