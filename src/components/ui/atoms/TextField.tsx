import React, { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '../../../utils/cn';

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightElement?: React.ReactNode;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, error, className, id, leftIcon, rightElement, ...props }, ref) => {
    return (
      <div className="w-full">
        <label 
          htmlFor={id} 
          className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1"
        >
          {leftIcon && <span className="text-gray-500">{leftIcon}</span>}
          {label}
        </label>
        <div className="relative">
          <input
            ref={ref}
            id={id}
            className={cn(
              'w-full px-3 py-2 bg-white border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
              error ? 'border-red-500' : 'border-gray-300',
              className
            )}
            {...props}
          />
          {rightElement && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {rightElement}
            </div>
          )}
        </div>
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);

TextField.displayName = 'TextField';
