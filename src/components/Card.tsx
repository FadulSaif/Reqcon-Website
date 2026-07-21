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
  const baseStyles = 'rounded-2xl border transition-[transform,box-shadow,border-color] duration-200';
  
  const themeStyles = glass
    ? 'bg-white/80 dark:bg-bg-surface/80 backdrop-blur-md border-slate-200/50 dark:border-border-custom/50'
    : 'bg-gradient-to-br from-white via-white to-accent-primary/[0.14] dark:from-zinc-950 dark:via-bg-surface dark:to-accent-primary/[0.08] border-border-custom text-text-primary';
    
  const hoverStyles = hoverable
    ? 'shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:border-accent-primary'
    : 'shadow-sm';

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
