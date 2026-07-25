import React from 'react';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
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
  // Styles based on Scandinavian minimalism and theme tokens
  const baseStyles = 'inline-flex items-center justify-center btn-typography rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary/60 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none select-none active:scale-[0.98]';
  
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-6 py-3.5 text-base',
  };
  
  const variantStyles = {
    primary: 'bg-gradient-to-br from-[#006897] to-[#00A5D9] text-white hover:from-[#00577F] hover:to-[#008CBA] hover:-translate-y-0.5 hover:shadow-sm active:translate-y-0 active:shadow-none',
    secondary: 'bg-bg-surface border border-border-custom text-text-primary hover:bg-zinc-50 dark:hover:bg-zinc-900 hover:border-brand-secondary/40 hover:-translate-y-0.5 active:translate-y-0',
    ghost: 'text-text-primary hover:bg-accent-bg border border-transparent hover:border-border-custom',
    danger: 'bg-red-600 text-white hover:bg-red-700 hover:-translate-y-0.5 active:translate-y-0',
  };

  return (
    <button
      disabled={disabled || isLoading}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
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
