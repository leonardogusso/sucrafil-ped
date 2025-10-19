import { Variants } from 'framer-motion';

export const ANIMATION_DURATIONS = {
  fast: 0.2,
  normal: 0.3,
  slow: 0.5,
  verySlow: 0.8,
} as const;

export const EASING = {
  easeOut: [0.16, 1, 0.3, 1],
  easeInOut: [0.43, 0.13, 0.23, 0.96],
  spring: { type: 'spring', stiffness: 100, damping: 15 },
} as const;

export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: ANIMATION_DURATIONS.slow,
      ease: EASING.easeOut,
    },
  },
};

export const fadeIn: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: ANIMATION_DURATIONS.normal,
    },
  },
};

export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: ANIMATION_DURATIONS.normal,
      ease: EASING.easeOut,
    },
  },
};

export const staggerContainer: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

export const viewportConfig = {
  once: true,
  amount: 0.2,
};

export default {
  fadeInUp,
  fadeIn,
  scaleIn,
  staggerContainer,
  viewportConfig,
};
