import React from 'react';
import { Mail, AlertCircle, CheckCircle2 } from 'lucide-react';

interface InputEmailProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  isValid?: boolean;
}

export const InputEmail = ({ value, onChange, error, isValid }: InputEmailProps) => {
  return (
    <div className="space-y-1.5 group">
      <label className="text-xs font-medium text-slate-300 ml-1 flex items-center gap-1">
        Email address <span className="text-rose-500">*</span>
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Mail className={`h-5 w-5 ${error ? 'text-rose-500' : isValid ? 'text-emerald-500' : 'text-slate-500 group-focus-within:text-violet-400'} transition-colors duration-200`} />
        </div>
        <input
          type="email"
          value={value}
          onChange={onChange}
          className={`block w-full pl-10 pr-10 py-2.5 bg-slate-900/50 border ${
            error 
              ? 'border-rose-500/50 focus:border-rose-500 focus:ring-rose-500/20' 
              : isValid
                ? 'border-emerald-500/50 focus:border-emerald-500 focus:ring-emerald-500/20'
                : 'border-slate-700 focus:border-violet-500 focus:ring-violet-500/20'
          } rounded-lg text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-4 transition-all duration-200`}
          placeholder="name@company.com"
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          {error && <AlertCircle className="h-5 w-5 text-rose-500 animate-in fade-in zoom-in duration-200" />}
          {!error && isValid && <CheckCircle2 className="h-5 w-5 text-emerald-500 animate-in fade-in zoom-in duration-200" />}
        </div>
      </div>
      {error && (
        <p className="text-xs text-rose-400 ml-1 animate-in slide-in-from-top-1 fade-in duration-200">
          {error}
        </p>
      )}
    </div>
  );
};
