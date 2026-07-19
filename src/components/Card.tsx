import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
  glass?: boolean;
  borderAccent?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hoverable = true,
  glass = false,
  borderAccent = false,
  ...props
}) => {
  const baseStyles = 'rounded-2xl border transition-all duration-300';
  
  const themeStyles = glass
    ? 'bg-white/80 dark:bg-bg-surface/80 backdrop-blur-md border-slate-200/50 dark:border-border-custom/50'
    : 'bg-bg-surface border-border-custom text-text-primary';
    
  const hoverStyles = hoverable
    ? 'shadow-card hover:shadow-card-hover hover:-translate-y-1 hover:border-zinc-300 dark:hover:border-zinc-800'
    : 'shadow-card';

  const accentStyles = borderAccent
    ? 'border-l-4 border-l-accent-primary'
    : '';

  return (
    <div
      className={`${baseStyles} ${themeStyles} ${hoverStyles} ${accentStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
