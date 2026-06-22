import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export function Button({ variant = "primary", size = "md", className = "", children, ...props }: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center font-brand font-medium uppercase tracking-wider rounded-md transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    primary: "bg-primary text-primary-text hover:bg-primary-hover shadow-md hover:shadow-lg",
    secondary: "bg-surface-elevated text-text-primary border border-border hover:border-primary hover:text-primary",
    outline: "bg-transparent text-text-primary border border-border-strong hover:bg-background-muted hover:border-primary",
    ghost: "bg-transparent text-text-secondary hover:text-primary hover:bg-background-muted"
  };

  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base"
  };

  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
