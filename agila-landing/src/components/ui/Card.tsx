import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Card({ children, className = "", ...props }: CardProps) {
  return (
    <div 
      className={`bg-surface border border-border rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden ${className}`} 
      {...props}
    >
      {children}
    </div>
  );
}
