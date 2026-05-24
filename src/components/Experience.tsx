import { useState } from 'react';
import { motion } from 'framer-motion';
import { Experience as ExperienceType } from '../types/portfolio';
import { useScrollReveal, staggerContainer, revealVariants } from '../hooks/useScrollReveal';
import styles from './Experience.module.css';

interface ExperienceProps {
  experience: ExperienceType[];
}

const VISIBLE_BULLETS = 3;

function ExperienceCard({ job }: { job: ExperienceType }) {
  const [expanded, setExpanded] = useState(false);
  const hasMore = job.highlights.length > VISIBLE_BULLETS;
  const visibleHighlights = expanded ? job.highlights : job.highlights.slice(0, VISIBLE_BULLETS);

  return (
    <div className={styles.card}>
      <div className={styles.dotWrap} aria-hidden="true">
        <span className={`${styles.dot} ${job.current ? styles.dotActive : ''}`} />
      </div>

      <div className={styles.cardBody}>
        <div className={styles.header}>
          <div>
            <h3 className={styles.role}>{job.role}</h3>
            <p className={styles.company}>{job.company}</p>
            <p className={styles.meta}>
              <span className={styles.type}>{job.type}</span>
              <span className={styles.location}>{job.location}</span>
            </p>
            <p className={styles.period}>{job.period}</p>
          </div>
          {job.current && (
            <span className={styles.currentBadge} aria-label="Current role">Current</span>
          )}
        </div>

        <ul className={styles.highlights} aria-label="Highlights">
          {visibleHighlights.map((h, i) => (
            <li key={i} className={styles.highlight}>{h}</li>
          ))}
        </ul>

        {hasMore && (
          <button
            className={styles.toggle}
            onClick={() => setExpanded(prev => !prev)}
            aria-expanded={expanded}
          >
            {expanded ? 'Show less' : `Show ${job.highlights.length - VISIBLE_BULLETS} more`}
          </button>
        )}
      </div>
    </div>
  );
}

export function Experience({ experience }: ExperienceProps) {
  const { ref, animate, initial } = useScrollReveal();

  return (
    <section className={styles.experience} id="experience" aria-label="Work experience">
      <div className="container">
        <p className="sectionLabel">Experience</p>
        <h2 className="sectionHeading">Where I've worked.</h2>

        <motion.div
          ref={ref}
          className={styles.timeline}
          variants={staggerContainer}
          initial={initial}
          animate={animate}
        >
          {experience.map(job => (
            <motion.div key={job.id} variants={revealVariants}>
              <ExperienceCard job={job} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
