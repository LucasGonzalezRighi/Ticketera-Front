import React, { forwardRef, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { TextField } from './TextField';
import { UI_TEXTS } from '@/constants/ui';

type PasswordFieldProps = Omit<React.ComponentProps<typeof TextField>, 'type' | 'rightElement'>;

export const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>((props, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <TextField
      {...props}
      ref={ref}
      type={showPassword ? 'text' : 'password'}
      className="pr-10"
      rightElement={
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="text-gray-500 hover:text-gray-700 focus:outline-none flex items-center justify-center"
          aria-label={showPassword ? UI_TEXTS.aria.hidePassword : UI_TEXTS.aria.showPassword}
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      }
    />
  );
});

PasswordField.displayName = 'PasswordField';
