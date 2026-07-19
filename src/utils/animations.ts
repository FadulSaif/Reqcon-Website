import type { Variants } from 'framer-motion';

// Standardized Framer Motion presets for modern, subtle transitions

export const fadeIn = (duration = 0.5): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration, ease: 'easeOut' },
  },
});

export const slideUp = (duration = 0.6, delay = 0): Variants => ({
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration, ease: [0.16, 1, 0.3, 1], delay }, // Custom cubic bezier curve
  },
});

export const slideInLeft = (duration = 0.6, delay = 0): Variants => ({
  hidden: { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration, ease: [0.16, 1, 0.3, 1], delay },
  },
});

export const staggerContainer = (staggerChildren = 0.1, delayChildren = 0): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

export const scaleUp = (duration = 0.4): Variants => ({
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration, ease: [0.16, 1, 0.3, 1] },
  },
});
