'use client';

import React from 'react';
import { InputEmail } from './InputEmail';
import { InputPassword } from './InputPassword';
import { SocialButtons } from './SocialButtons';
import { ArrowRight, Loader2, AlertTriangle, CheckCircle } from 'lucide-react';
import { useLoginV2 } from '@/hooks/useLoginV2';

export const LoginForm = () => {
  const {
    email,
    password,
    status,
    error,
    emailError,
    isEmailValid,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit
  } = useLoginV2();

  const isLoading = status === 'loading';
  const isSuccess = status === 'success';

  return (
    <form className="space-y-6 w-full" onSubmit={handleSubmit}>
      
      {/* Global Error Message */}
      {error && (
        <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-start gap-3 animate-in slide-in-from-top-2 fade-in">
            <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0" />
            <p className="text-sm text-rose-200">{error}</p>
        </div>
      )}

      {/* Success Message */}
      {isSuccess && (
        <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-start gap-3 animate-in slide-in-from-top-2 fade-in">
            <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
            <p className="text-sm text-emerald-200">Login successful! Redirecting...</p>
        </div>
      )}

      <div className="space-y-4">
        <InputEmail 
            value={email} 
            onChange={handleEmailChange}
            error={emailError}
            isValid={isEmailValid}
        />
        <InputPassword 
            value={password} 
            onChange={handlePasswordChange}
            // We generally don't show validation errors for password on login, only on register
            // But if we wanted to show empty field error:
            // error={!password && status === 'error' ? 'Required' : undefined}
        />
      </div>

      <button
        type="submit"
        disabled={isLoading || isSuccess}
        className={`w-full flex items-center justify-center gap-2 font-medium py-2.5 px-4 rounded-lg shadow-lg transform transition-all duration-200 group relative overflow-hidden
            ${isLoading || isSuccess 
                ? 'bg-slate-800 text-slate-400 cursor-not-allowed translate-y-0 shadow-none' 
                : 'bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white shadow-violet-900/20 hover:shadow-violet-900/40 hover:-translate-y-0.5'
            }`}
      >
        <span className="relative z-10 flex items-center gap-2">
            {isLoading ? (
                <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Signing in...
                </>
            ) : isSuccess ? (
                <>
                    <CheckCircle className="w-4 h-4" />
                    Success
                </>
            ) : (
                <>
                    Sign in securely
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
            )}
        </span>
        
        {/* Ripple effect placeholder - only when active */}
        {!isLoading && !isSuccess && (
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-lg" />
        )}
      </button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-800"></div>
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="px-2 bg-slate-950 text-slate-500">Or continue with</span>
        </div>
      </div>

      <SocialButtons />
    </form>
  );
};
