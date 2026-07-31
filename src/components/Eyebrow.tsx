import React from 'react';

export interface EyebrowProps {
  children: React.ReactNode;
  margin?: 'default' | 'none' | 'compact';
  nowrap?: boolean;
}

const marginClasses = {
  default: 'mb-4',
  none: 'mb-0',
  compact: 'mb-2',
};

const responsivePillStyle: React.CSSProperties = {
  fontSize: 'clamp(0.75rem, 0.68rem + 0.31vw, 0.875rem)',
  padding: '0.285714em 0.857143em',
  borderRadius: '999em',
  boxShadow:
    '0 0.071429em 0.214286em 0 rgba(0, 0, 0, 0.1), 0 0.071429em 0.142857em -0.071429em rgba(0, 0, 0, 0.1)',
};

export const Eyebrow: React.FC<EyebrowProps> = ({
  children,
  margin = 'default',
  nowrap = true,
}) => (
  <span
    data-ui="eyebrow"
    style={responsivePillStyle}
    className={`block w-fit select-none border border-brand-secondary/15 bg-brand-secondary/10 font-heading font-medium leading-[1.6] tracking-[0.12em] text-brand-secondary ${
      marginClasses[margin]
    } ${nowrap ? 'whitespace-nowrap' : ''}`}
  >
    {children}
  </span>
);

export default Eyebrow;
