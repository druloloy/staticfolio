import { useRef } from 'react';
import { useInView, useReducedMotion, Variants } from 'framer-motion';

export const revealVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(threshold = 0.1) {
  const ref = useRef<T>(null);
  const isInView = useInView(ref, { once: true, amount: threshold });
  const prefersReduced = useReducedMotion();

  const animate: 'visible' | 'hidden' = prefersReduced || isInView ? 'visible' : 'hidden';

  return { ref, animate, initial: 'hidden' as const };
}
