import React from 'react';
import { Loader2 } from 'lucide-react';
import {
  getButtonClassName,
  type ButtonSize,
  type ButtonVariant,
} from './buttonStyles';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  disabled,
  ...props
}) => {
  return (
    <button
      disabled={disabled || isLoading}
      className={getButtonClassName({ variant, size, className })}
      {...props}
    >
      {isLoading && (
        <Loader2 className="w-4 h-4 mr-2 animate-spin" aria-hidden="true" />
      )}
      {!isLoading && leftIcon && (
        <span className="mr-2 inline-flex items-center justify-center">{leftIcon}</span>
      )}
      <span>{children}</span>
      {!isLoading && rightIcon && (
        <span className="ml-2 inline-flex items-center justify-center">{rightIcon}</span>
      )}
    </button>
  );
};

export default Button;
