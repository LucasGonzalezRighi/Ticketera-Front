'use client';

import React, { useState } from 'react';
import { SocialButtons } from './SocialButtons';
import { ArrowRight, Loader2, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { EmailField, PasswordField } from '@/components/ui/fields';

export const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <form className="space-y-6 w-full" onSubmit={handleSubmit} autoComplete="off">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium text-foreground">
            Nombre Completo
          </Label>
          <div className="relative">
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="pl-10 bg-background/50 border-white/10 focus-visible:ring-primary/50 focus-visible:border-primary transition-all duration-300"
              placeholder="Juan Pérez"
              autoComplete="off"
              required
            />
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" size={18} />
          </div>
        </div>

        <EmailField
          id="email"
          label="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="Ingresá tu email"
          required
          autoComplete="off"
        />

        <PasswordField
          id="password"
          label="Contraseña"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          placeholder="Ingresá tu clave"
          required
          autoComplete="new-password"
        />
      </div>

      <Button
        type="submit"
        disabled={loading}
        className={`w-full h-11 font-semibold shadow-lg transition-all duration-200 group relative overflow-hidden
          ${loading
            ? 'bg-slate-800 text-slate-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white shadow-violet-900/20 hover:shadow-violet-900/40'
          }`}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            Creando cuenta...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            Crear cuenta
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </span>
        )}
      </Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-800"></div>
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="px-2 bg-slate-950 text-slate-500">Or register with</span>
        </div>
      </div>

      <SocialButtons />
    </form>
  );
};
