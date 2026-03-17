import React from 'react';
import { RegisterForm } from './RegisterForm';
import { SecurityIndicators } from './SecurityIndicators';
import { Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';

export const RegisterContainer = () => {
  return (
    <div className="relative z-10 w-full max-w-[420px] p-4 sm:p-0">
      <div className="flex flex-col items-center mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
        <div className="relative w-12 h-12 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-xl flex items-center justify-center shadow-2xl shadow-violet-500/20 mb-4 transform hover:scale-105 transition-transform duration-500 cursor-pointer group">
          <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
          <Zap className="w-6 h-6 text-white fill-current" />
        </div>
      </div>

      <Card className="bg-slate-950/40 backdrop-blur-xl border border-slate-800/50 shadow-2xl ring-1 ring-white/5 relative overflow-hidden group">
        <div className="absolute -inset-px bg-gradient-to-r from-violet-500/10 via-transparent to-fuchsia-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
            Create Account
          </CardTitle>
          <CardDescription className="text-slate-500">Join FlowSync Pro today</CardDescription>
        </CardHeader>

        <CardContent className="p-6 sm:p-8">
          <RegisterForm />
        </CardContent>

        <CardFooter className="flex-col gap-3 p-6 pt-0">
          <div className="p-3 w-full bg-slate-900/50 rounded-lg border border-slate-800/50 flex items-start gap-3 text-left">
            <div className="mt-0.5 min-w-[16px]">
              <div className="w-4 h-4 rounded-full border border-slate-600 flex items-center justify-center text-[10px] text-slate-400">i</div>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              By registering, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>

          <div className="text-center w-full animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
            <p className="text-sm text-slate-500">
              Already have an account?{' '}
              <a href="/new-login" className="text-violet-400 hover:text-violet-300 font-medium transition-colors hover:underline underline-offset-4">
                Sign in
              </a>
            </p>
          </div>
        </CardFooter>
      </Card>

      <SecurityIndicators />
    </div>
  );
};
