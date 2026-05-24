import { motion } from 'framer-motion';
import { Personal } from '../types/portfolio';
import { useScrollReveal, revealVariants, staggerContainer } from '../hooks/useScrollReveal';
import styles from './About.module.css';

interface AboutProps {
  personal: Pick<Personal, 'bio' | 'location' | 'available'>;
}

export function About({ personal }: AboutProps) {
  const { ref, animate, initial } = useScrollReveal();

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
          <motion.div className={styles.letterWrap} variants={revealVariants} aria-hidden="true">
            <span className={styles.letter}>D</span>
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
