import { useRef, useState, useEffect } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { Personal } from '../types/portfolio';
import { useScrollReveal, revealVariants, staggerContainer } from '../hooks/useScrollReveal';
import styles from './About.module.css';

interface AboutProps {
  personal: Pick<Personal, 'bio' | 'location' | 'available'>;
}

function useCountUp(target: number, isInView: boolean, duration = 2000) {
  const [count, setCount] = useState(0);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (!isInView) return;
    if (prefersReduced) { setCount(target); return; }

    const start = performance.now();
    let raf: number;

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setCount(target);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isInView, target, duration, prefersReduced]);

  return count;
}

export function About({ personal }: AboutProps) {
  const { ref, animate, initial } = useScrollReveal();
  const counterRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(counterRef, { once: true, amount: 0.4 });
  const count = useCountUp(3700, isInView);

  return (
    <section className={styles.about} id="about" aria-label="About">
      <div className="container">
        <motion.div
          ref={ref}
          className={styles.grid}
          variants={staggerContainer}
          initial={initial}
          animate={animate}
        >
          <motion.div
            className={styles.counterWrap}
            variants={revealVariants}
            ref={counterRef}
            aria-label="3,700 plus hours worked"
          >
            <p className={styles.counterValue} aria-hidden="true">
              {count.toLocaleString()}<span className={styles.counterPlus}>+</span>
            </p>
            <p className={styles.counterLabel}>hrs worked</p>
          </motion.div>

          <motion.div className={styles.content} variants={revealVariants}>
            <p className="sectionLabel">About</p>
            <p className={styles.bio}>{personal.bio}</p>

            <div className={styles.meta}>
              <span className={styles.location}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                {personal.location}
              </span>

              {personal.available && (
                <span className={styles.availBadge} role="status">
                  <span className={styles.greenDot} aria-hidden="true" />
                  Available for opportunities
                </span>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
