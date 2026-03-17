import React, { useState } from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react';

interface InputPasswordProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

export const InputPassword = ({ value, onChange, error }: InputPasswordProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-1.5 group">
      <label className="text-xs font-medium text-slate-300 ml-1 flex items-center gap-1">
        Password <span className="text-rose-500">*</span>
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Lock className={`h-5 w-5 ${error ? 'text-rose-500' : 'text-slate-500 group-focus-within:text-violet-400'} transition-colors duration-200`} />
        </div>
        <input
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          className={`block w-full pl-10 pr-10 py-2.5 bg-slate-900/50 border ${
            error 
              ? 'border-rose-500/50 focus:border-rose-500 focus:ring-rose-500/20' 
              : 'border-slate-700 focus:border-violet-500 focus:ring-violet-500/20'
          } rounded-lg text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-4 transition-all duration-200`}
          placeholder="••••••••"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-slate-300 transition-colors focus:outline-none"
        >
          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
        </button>
      </div>
      <div className="flex justify-between items-center mt-1">
        <div className="flex items-center">
            <input 
                id="remember-me" 
                name="remember-me" 
                type="checkbox" 
                className="h-4 w-4 rounded border-slate-700 bg-slate-900/50 text-violet-600 focus:ring-violet-500/20 focus:ring-offset-0 transition-colors"
            />
            <label htmlFor="remember-me" className="ml-2 block text-xs text-slate-400 hover:text-slate-300 transition-colors cursor-pointer">
                Remember me for 30 days
            </label>
        </div>
        <a href="#" className="text-xs font-medium text-violet-400 hover:text-violet-300 transition-colors">
            Forgot password?
        </a>
      </div>
    </div>
  );
};
