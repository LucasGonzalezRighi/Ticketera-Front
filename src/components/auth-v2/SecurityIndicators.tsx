import React from 'react';
import { ShieldCheck, Lock, Users } from 'lucide-react';

export const SecurityIndicators = () => {
  return (
    <div className="flex items-center justify-center gap-6 text-xs text-slate-500 mt-8">
      <div className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors cursor-help">
        <ShieldCheck className="w-3.5 h-3.5" />
        <span>SOC 2 Certified</span>
      </div>
      <div className="flex items-center gap-1.5 hover:text-blue-400 transition-colors cursor-help">
        <Lock className="w-3.5 h-3.5" />
        <span>256-bit SSL</span>
      </div>
      <div className="flex items-center gap-1.5 hover:text-purple-400 transition-colors cursor-help">
        <Users className="w-3.5 h-3.5" />
        <span>125k+ teams</span>
      </div>
    </div>
  );
};
