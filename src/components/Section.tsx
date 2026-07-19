import React from 'react';
import { motion } from 'framer-motion';
import { slideUp } from '../utils/animations';

export interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  badge?: string;
  background?: 'default' | 'alt' | 'dark';
  align?: 'left' | 'center';
  animate?: boolean;
}

export const Section: React.FC<SectionProps> = ({
  children,
  className = '',
  title,
  subtitle,
  badge,
  background = 'default',
  align = 'center',
  animate = true,
  ...props
}) => {
  const bgStyles = {
    default: 'bg-bg-page text-text-primary',
    alt: 'bg-zinc-50 dark:bg-zinc-950/30 text-text-primary border-y border-border-custom/50',
    dark: 'bg-zinc-900 dark:bg-zinc-950 text-white border-y border-zinc-800/80',
  };

  const alignStyles = {
    left: 'text-left items-start',
    center: 'text-center items-center',
  };

  // Section heading block
  const headingBlock = (title || subtitle || badge) && (
    <div className={`flex flex-col ${alignStyles[align]} mb-12 md:mb-16 max-w-3xl ${align === 'center' ? 'mx-auto' : ''}`}>
      {badge && (
        <span className="text-xs font-bold uppercase tracking-widest text-brand-secondary px-3 py-1 rounded-full bg-brand-secondary/10 mb-4 select-none">
          {badge}
        </span>
      )}
      {title && (
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-current mb-4">
          {title}
        </h2>
      )}
      {subtitle && (
        <p className={`text-base md:text-lg leading-relaxed ${background === 'dark' ? 'text-slate-400' : 'text-text-muted'}`}>
          {subtitle}
        </p>
      )}
    </div>
  );

  return (
    <section className={`py-12 md:py-16 px-6 overflow-hidden ${bgStyles[background]} ${className}`} {...props}>
      <div className="max-w-7xl mx-auto flex flex-col">
        {animate ? (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={slideUp()}
          >
            {headingBlock}
            {children}
          </motion.div>
        ) : (
          <>
            {headingBlock}
            {children}
          </>
        )}
      </div>
    </section>
  );
};

export default Section;
