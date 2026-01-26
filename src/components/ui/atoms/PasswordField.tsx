import React, { forwardRef, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { TextField } from './TextField';

interface PasswordFieldProps extends Omit<React.ComponentProps<typeof TextField>, 'type'> {}

export const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>((props, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <TextField
        {...props}
        ref={ref}
        type={showPassword ? 'text' : 'password'}
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-[34px] text-gray-500 hover:text-gray-700 focus:outline-none"
      >
        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  );
});

PasswordField.displayName = 'PasswordField';
