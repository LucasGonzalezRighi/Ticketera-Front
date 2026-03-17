import React from 'react';
import { BackgroundEffects } from '@/components/auth-v2/BackgroundEffects';
import { RegisterContainer } from '@/components/auth-v2/RegisterContainer';

export default function RegisterPage() {
  return (
    <main className="min-h-screen w-full flex items-center justify-center relative bg-slate-950 font-sans selection:bg-violet-500/30">
      <BackgroundEffects />
      <div className="container mx-auto px-4 sm:px-6">
        <RegisterContainer />
      </div>
      <div className="fixed bottom-4 right-6 z-50">
        <div className="px-3 py-1.5 bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-lg flex items-center gap-2 text-[10px] text-slate-500 hover:text-slate-300 transition-colors cursor-pointer group shadow-lg">
          <span className="w-2 h-2 rounded-sm bg-gradient-to-br from-violet-600 to-fuchsia-600 group-hover:scale-110 transition-transform" />
          Made in Aura
        </div>
      </div>
    </main>
  );
}
