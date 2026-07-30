import React from 'react';

interface SubpageHeroProps {
  backgroundImage: string;
  backgroundAlt?: string;
  imageClassName?: string;
  contentClassName?: string;
  children: React.ReactNode;
}

const SubpageHero: React.FC<SubpageHeroProps> = ({
  backgroundImage,
  backgroundAlt = '',
  imageClassName = '',
  contentClassName = '',
  children,
}) => (
  <section
    data-ui="subpage-hero"
    className="relative flex h-[32rem] items-center justify-center overflow-hidden border-b border-border-custom bg-slate-950 px-6 py-24 text-center md:py-36"
  >
    <div className="pointer-events-none absolute inset-0 z-0 select-none">
      <img
        src={backgroundImage}
        alt={backgroundAlt}
        className={`h-full w-full object-cover ${imageClassName}`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/80 dark:from-black dark:via-black/75 dark:to-black/85" />
    </div>

    <div className={`relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center gap-6 text-white ${contentClassName}`}>
      {children}
    </div>
  </section>
);

export default SubpageHero;
