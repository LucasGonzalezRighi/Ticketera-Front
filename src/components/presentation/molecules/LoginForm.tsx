import React, { useState } from 'react';
import { useLogin } from '../../../hooks/useLogin';
import { Button } from '../../ui/atoms/Button';
import { TextField } from '../../ui/atoms/TextField';
import { PasswordField } from '../../ui/atoms/PasswordField';

export const LoginForm: React.FC = () => {
  const { login, isLoading, error } = useLogin();
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
        Ingresar
      </Button>
    </form>
  );
};
