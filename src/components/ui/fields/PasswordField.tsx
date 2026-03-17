import React, { useState } from 'react';
import { Input } from '../input';
import { Label } from '../label';
import { Lock, Eye, EyeOff } from 'lucide-react';
import { UI_TEXTS } from '@/constants/ui';

interface PasswordFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const PasswordField: React.FC<PasswordFieldProps> = ({ 
  id, 
  label = "Contraseña", 
  className,
  ...props 
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
      </Label>
      <div className="relative">
        <Input
          id={id}
          type={showPassword ? "text" : "password"}
          className={`pl-10 pr-10 bg-background/50 border-white/10 focus-visible:ring-primary/50 focus-visible:border-primary transition-all duration-300 ${className || ''}`}
          {...props}
        />
        <Lock 
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" 
          size={18} 
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none"
          aria-label={showPassword ? UI_TEXTS.aria.hidePassword : UI_TEXTS.aria.showPassword}
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>
  );
};
