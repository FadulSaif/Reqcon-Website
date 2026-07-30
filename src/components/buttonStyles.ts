export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonStyleOptions {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

const baseStyles = 'inline-flex cursor-pointer items-center justify-center btn-typography rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary/60 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:transform-none select-none active:scale-[0.98]';

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-6 py-3.5 text-base',
};

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-gradient-to-br from-[#006897] to-[#00A5D9] text-white hover:from-[#00577F] hover:to-[#008CBA] hover:-translate-y-0.5 hover:shadow-sm active:translate-y-0 active:shadow-none',
  secondary: 'bg-bg-surface border border-border-custom text-text-primary hover:bg-zinc-50 dark:hover:bg-zinc-900 hover:border-brand-secondary/40 hover:-translate-y-0.5 active:translate-y-0',
  ghost: 'text-text-primary hover:bg-accent-bg border border-transparent hover:border-border-custom',
  danger: 'bg-red-600 text-white hover:bg-red-700 hover:-translate-y-0.5 active:translate-y-0',
};

export const getButtonClassName = ({
  variant = 'primary',
  size = 'md',
  className = '',
}: ButtonStyleOptions = {}) => (
  `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`
);
