import React from "react";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  id?: string;
}

export function Section({ children, id, className = "", ...props }: SectionProps) {
  return (
    <section id={id} className={`py-16 md:py-24 ${className}`} {...props}>
      {children}
    </section>
  );
}
