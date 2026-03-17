import React from 'react';
import { LoginForm } from './LoginForm';
import { SecurityIndicators } from './SecurityIndicators';
import {  Zap } from 'lucide-react';
import Link from 'next/link';	

export const LoginContainer = () => {
  return (
    <div className="relative z-10 w-full max-w-[420px] p-4 sm:p-0">
      {/* Floating Logo */}
      <div className="flex flex-col items-center mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
        <div className="relative w-12 h-12 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-xl flex items-center justify-center shadow-2xl shadow-violet-500/20 mb-4 transform hover:scale-105 transition-transform duration-500 cursor-pointer group">
            <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <Zap className="w-6 h-6 text-white fill-current" />
        </div>
        <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
          FlowSync Pro
        </h1>
        <p className="text-sm text-slate-500 mt-2">Sign in to your workspace</p>
        <div className="mt-3 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-medium tracking-wide uppercase flex items-center gap-1.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
            </span>
            Protected Session
        </div>
      </div>

      {/* Glass Card */}
      <div className="bg-slate-950/40 backdrop-blur-xl border border-slate-800/50 rounded-2xl p-8 shadow-2xl ring-1 ring-white/5 relative overflow-hidden group">
        {/* Glow effect on hover */}
        <div className="absolute -inset-px bg-gradient-to-r from-violet-500/10 via-transparent to-fuchsia-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        
        <LoginForm />

        <div className="mt-6 text-center">
            <div className="p-3 bg-slate-900/50 rounded-lg border border-slate-800/50 flex items-start gap-3 text-left">
                <div className="mt-0.5 min-w-[16px]">
                    <div className="w-4 h-4 rounded-full border border-slate-600 flex items-center justify-center text-[10px] text-slate-400">i</div>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                    Your connection is secured with 256-bit SSL encryption. We never share your data.
                </p>
            </div>
        </div>
      </div>

      <div className="mt-8 text-center animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
        <p className="text-sm text-slate-500">
            Don't have an account?{' '}
            <Link href="/new-register" className="text-violet-400 hover:text-violet-300 font-medium transition-colors hover:underline underline-offset-4">
                Start your free trial
            </Link>
        </p>
      </div>

      <SecurityIndicators />
    </div>
  );
};
