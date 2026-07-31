import React from 'react';

export type CareerBenefitIcon = React.ComponentType<React.SVGProps<SVGSVGElement>>;

const iconClassName = 'h-full w-full';

const commonSvgProps = {
  viewBox: '0 0 96 96',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2.75,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  shapeRendering: 'geometricPrecision' as const,
  focusable: false,
  'aria-hidden': true,
};

const Hand = ({ rotation, accent = false }: { rotation: number; accent?: boolean }) => (
  <g
    transform={`rotate(${rotation} 48 48)`}
    className={accent ? 'text-accent-primary' : undefined}
    strokeWidth="2.35"
  >
    <path d="M34 31V22.5a3 3 0 0 1 6 0V28" />
    <path d="M40 28V16.5a3 3 0 0 1 6 0V27" />
    <path d="M46 27V14.5a3 3 0 0 1 6 0V27" />
    <path d="M52 27V17.5a3 3 0 0 1 6 0V30" />
    <path d="M58 25.5a3 3 0 0 1 6 0V33c0 6.8-5.2 12-12 12h-7c-7.8 0-13.5-5.7-13.5-13.5V29a3 3 0 0 1 6 0v4" />
    <path d="M40.5 45v5h15v-5" />
  </g>
);

export const InterlockingHandsIcon: CareerBenefitIcon = ({ className = '', ...props }) => (
  <svg className={`${iconClassName} ${className}`} {...commonSvgProps} {...props}>
    <Hand rotation={0} />
    <Hand rotation={90} accent />
    <Hand rotation={180} />
    <Hand rotation={270} accent />
  </svg>
);

export const LearningTogetherIcon: CareerBenefitIcon = ({ className = '', ...props }) => (
  <svg className={`${iconClassName} ${className}`} {...commonSvgProps} {...props}>
    <path
      d="M34 31.5C34 22.9 40.3 16 48 16s14 6.9 14 15.5c0 6.2-3.1 10.2-7.7 14.2V51H41.7v-5.3C37.1 41.7 34 37.7 34 31.5Z"
      className="text-brand-secondary"
      fill="currentColor"
      fillOpacity="0.1"
    />
    <path d="M39.5 49.5h17M41.5 54.5h13M44.5 59h7" />
    <path className="text-accent-primary" d="m46.5 25.5-4 8h5l-2 7 8-10h-5l2-5Z" />
    <path className="text-accent-primary" d="M48 8V3M29 15l-4-4M67 15l4-4M25 32h-6M71 32h6" />
    <circle cx="48" cy="70" r="6" />
    <circle cx="25" cy="73" r="5.5" />
    <circle cx="71" cy="73" r="5.5" />
    <path d="M36 91v-5.5C36 78.6 41.4 73 48 73s12 5.6 12 12.5V91" />
    <path d="M9 91v-4.5C9 79.9 15 75 25 75c4 0 7.8 1.2 10.7 3.4M87 91v-4.5C87 79.9 81 75 71 75c-4 0-7.8 1.2-10.7 3.4" />
  </svg>
);

export const GrowingTogetherIcon: CareerBenefitIcon = ({ className = '', ...props }) => (
  <svg className={`${iconClassName} ${className}`} {...commonSvgProps} {...props}>
    <path className="text-accent-primary" d="M42 20v26" />
    <path
      className="text-accent-primary"
      d="M43 21h29l-6.5 7L72 35H43Z"
      fill="currentColor"
      fillOpacity="0.14"
    />
    <circle cx="48" cy="56" r="6.5" />
    <circle cx="24" cy="61" r="5.5" />
    <circle cx="72" cy="61" r="5.5" />
    <path d="M37.5 91V78.5C37.5 69.8 42 63 48 63s10.5 6.8 10.5 15.5V91" />
    <path d="M10 91V77c0-7 5.8-11.5 14-11.5 4.6 0 8.3 2 11.2 6.5L43 83" />
    <path d="M86 91V77c0-7-5.8-11.5-14-11.5-4.6 0-8.3 2-11.2 6.5L53 83" />
    <path className="text-accent-primary" d="M10 74 4 65M86 74l6-9M6 62 5 54M90 62l1-8" />
  </svg>
);

export const IdeasInMotionIcon: CareerBenefitIcon = ({ className = '', ...props }) => (
  <svg className={`${iconClassName} ${className}`} {...commonSvgProps} {...props}>
    <path
      d="M25 37.5C25 23 35.3 12 48 12s23 11 23 25.5c0 9.6-4.6 15.7-12.5 22.2V69h-21v-9.3C29.6 53.2 25 47.1 25 37.5Z"
      className="text-brand-secondary"
      fill="currentColor"
      fillOpacity="0.1"
    />
    <path d="M36 69h24M38.5 75h19M42.5 81h11" />
    <path className="text-accent-primary" d="M48 4v-7M24 12l-5-5M72 12l5-5M17 36h-7M79 36h7" />
    <path
      className="text-accent-primary"
      d="m48 25 3 4.2 5-.7.9 5 4.6 2.1-2.3 4.5 2.3 4.5-4.6 2.1-.9 5-5-.7-3 4.2-3-4.2-5 .7-.9-5-4.6-2.1 2.3-4.5-2.3-4.5 4.6-2.1.9-5 5 .7Z"
      fill="currentColor"
      fillOpacity="0.14"
    />
    <circle className="text-accent-primary" cx="48" cy="40" r="6.25" />
  </svg>
);

export const TargetGoalIcon: CareerBenefitIcon = ({ className = '', ...props }) => (
  <svg className={`${iconClassName} ${className}`} {...commonSvgProps} {...props}>
    <circle
      cx="43"
      cy="53"
      r="31"
      className="text-accent-secondary dark:text-accent-light"
      fill="currentColor"
      fillOpacity="0.06"
    />
    <circle cx="43" cy="53" r="20" className="text-accent-light" />
    <circle
      cx="43"
      cy="53"
      r="8"
      className="text-brand-secondary"
      fill="currentColor"
      fillOpacity="0.14"
    />
    <path className="text-brand-secondary" d="M43 53 72 24" />
    <path
      className="text-accent-light dark:text-brand-secondary"
      d="m72 24 1-12 8-8 3 9 9 3-8 8Z"
      fill="currentColor"
      fillOpacity="0.12"
    />
  </svg>
);
