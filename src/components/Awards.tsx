import { motion } from 'framer-motion';
import { Award } from '../types/portfolio';
import { useScrollReveal, staggerContainer, revealVariants } from '../hooks/useScrollReveal';
import styles from './Awards.module.css';

interface AwardsProps {
  awards: Award[];
}

function TrophyIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="8 17 12 21 16 17"/>
      <line x1="12" y1="21" x2="12" y2="11"/>
      <path d="M20.88 9.88A10 10 0 0 0 21 9V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v5a10 10 0 0 0 10 10"/>
      <path d="M6.26 17.91A10 10 0 0 0 12 19"/>
    </svg>
  );
}

export function Awards({ awards }: AwardsProps) {
  const { ref, animate, initial } = useScrollReveal();

  return (
    <section className={styles.awards} id="awards" aria-label="Awards and recognition">
      <div className="container">
        <p className="sectionLabel">Recognition</p>
        <h2 className="sectionHeading">Awards.</h2>

        <motion.div
          ref={ref}
          className={styles.row}
          variants={staggerContainer}
          initial={initial}
          animate={animate}
          role="list"
        >
          {awards.map((award, i) => (
            <motion.div key={i} className={styles.card} variants={revealVariants} role="listitem">
              <span className={styles.icon}>
                <TrophyIcon />
              </span>
              <div>
                <p className={styles.title}>{award.title}</p>
                <p className={styles.org}>{award.org}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
