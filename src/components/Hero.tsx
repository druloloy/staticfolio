import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Personal } from '../types/portfolio';
import styles from './Hero.module.css';

interface HeroProps {
  tagline: Personal['tagline'];
  cvPath: string;
  illustration: string;
}

const CYCLING_WORDS = ['scale.', 'ship.', 'connect.', 'work.'];
const INTERVAL_MS = 2500;

export function Hero({ tagline, cvPath, illustration }: HeroProps) {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setWordIndex(i => (i + 1) % CYCLING_WORDS.length);
    }, INTERVAL_MS);
    return () => clearInterval(timer);
  }, []);

  const scrollToWork = () => {
    document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className={styles.hero} id="hero" aria-label="Introduction">
      <div className={styles.mesh} aria-hidden="true" />
      <div className={`container ${styles.contentWrap}`}>
        <div className={styles.content}>
          <motion.h1
            className={styles.headline}
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
          >
            I build things that{' '}
            <span className={styles.wordWrap}>
              <AnimatePresence mode="wait">
                <motion.span
                  key={wordIndex}
                  className={styles.word}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.28, ease: 'easeOut' }}
                >
                  {CYCLING_WORDS[wordIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.h1>

          <motion.p
            className={styles.tagline}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.25 }}
          >
            {tagline}
          </motion.p>

          <motion.div
            className={styles.ctas}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.4 }}
          >
            <button className={styles.ctaPrimary} onClick={scrollToWork}>
              See My Work
            </button>
            <a href={cvPath} download className={styles.ctaSecondary}>
              Download CV
            </a>
          </motion.div>
        </div>

        <motion.div
          className={styles.imageCol}
          initial={{ opacity: 0, x: 32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.55 }}
        >
          <img
            src={illustration}
            alt="Illustrated portrait of Dru Loloy"
            className={styles.illustration}
            loading="eager"
          />
        </motion.div>
      </div>
    </section>
  );
}
