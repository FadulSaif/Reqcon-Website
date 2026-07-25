import React from 'react';
import { Image } from 'lucide-react';

interface PlaceholderImageProps {
  label: string;
  className?: string;
  aspectRatio?: string;
}

export const PlaceholderImage: React.FC<PlaceholderImageProps> = ({
  label,
  className = '',
  aspectRatio = 'aspect-video'
}) => {
  return (
    <div
      className={`relative w-full ${aspectRatio} rounded-2xl overflow-hidden border border-dashed border-slate-300 dark:border-slate-800 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900/50 dark:to-slate-900/10 flex flex-col items-center justify-center p-6 text-center select-none group transition-all duration-300 hover:border-brand-secondary/40 ${className}`}
      role="img"
      aria-label={`Placeholder för ${label}`}
    >
      {/* Abstract geometric vector background */}
      <svg
        className="absolute inset-0 w-full h-full text-slate-200/50 dark:text-slate-800/20 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <line x1="0" y1="0" x2="100" y2="100" stroke="currentColor" strokeWidth="0.5" />
        <line x1="100" y1="0" x2="0" y2="100" stroke="currentColor" strokeWidth="0.5" />
        <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="0.5" />
      </svg>

      <div className="relative z-10 flex flex-col items-center gap-3">
        <div className="p-3 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm text-brand-secondary shrink-0 transition-transform duration-300 group-hover:scale-110">
          <Image className="w-6 h-6" />
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-mono text-xs uppercase tracking-wider text-text-primary font-bold">
            {label}
          </span>
          <span className="text-[10px] text-text-muted max-w-[200px] leading-relaxed">
            Ersätt med WebP/AVIF-bild i public-mappen
          </span>
        </div>
      </div>
    </div>
  );
};

export default PlaceholderImage;
