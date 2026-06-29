import React from "react";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "neutral" | "primary" | "accent";
  children: React.ReactNode;
}

export function Badge({ variant = "neutral", className = "", children, ...props }: BadgeProps) {
  const baseStyles = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium uppercase tracking-widest";
  
  const variants = {
    neutral: "bg-background-muted text-text-secondary border border-border",
    primary: "bg-primary text-primary-text",
    accent: "bg-accent-soft text-accent border border-accent",
  };

  const classes = `${baseStyles} ${variants[variant]} ${className}`;

  return (
    <span className={classes} {...props}>
      {children}
    </span>
  );
}
