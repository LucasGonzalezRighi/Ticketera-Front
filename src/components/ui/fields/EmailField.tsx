import React from 'react';
import { Input } from '../input';
import { Label } from '../label';
import { Mail } from 'lucide-react';

interface EmailFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const EmailField: React.FC<EmailFieldProps> = ({ 
  id, 
  label = "Email", 
  className,
  ...props 
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
      </Label>
      <div className="relative">
        <Input
          id={id}
          type="email"
          className={`pl-10 bg-background/50 border-white/10 focus-visible:ring-primary/50 focus-visible:border-primary transition-all duration-300 ${className || ''}`}
          {...props}
        />
        <Mail 
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" 
          size={18} 
        />
      </div>
    </div>
  );
};
