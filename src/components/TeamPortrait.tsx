import React from 'react';

type TeamPortraitSize = 'standard' | 'compact';

interface TeamPortraitProps {
  src: string;
  alt: string;
  size?: TeamPortraitSize;
  className?: string;
}

const sizeClasses: Record<TeamPortraitSize, string> = {
  standard: 'size-[clamp(5.75rem,8vw,7rem)]',
  compact: 'size-[clamp(3.25rem,5vw,3.5rem)]',
};

const TeamPortrait: React.FC<TeamPortraitProps> = ({
  src,
  alt,
  size = 'standard',
  className = '',
}) => (
  <img
    src={src}
    alt={alt}
    className={`${sizeClasses[size]} shrink-0 rounded-full border-2 border-brand-secondary/20 object-cover shadow-md ${className}`}
    loading="lazy"
  />
);

export default TeamPortrait;
