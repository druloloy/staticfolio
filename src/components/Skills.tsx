import { motion } from 'framer-motion';
import { useScrollReveal, revealVariants, staggerContainer } from '../hooks/useScrollReveal';
import styles from './Skills.module.css';

interface SkillsProps {
  skills: Record<string, string[]>;
}

export function Skills({ skills }: SkillsProps) {
  const { ref, animate, initial } = useScrollReveal();

  return (
    <section className={styles.skills} id="skills" aria-label="Skills">
      <div className="container">
        <p className="sectionLabel">Skills</p>
        <h2 className="sectionHeading">What I work with.</h2>

        <motion.div
          ref={ref}
          className={styles.categories}
          variants={staggerContainer}
          initial={initial}
          animate={animate}
        >
          {Object.entries(skills).map(([category, items]) => (
            <motion.div key={category} className={styles.category} variants={revealVariants}>
              <h3 className={styles.categoryName}>{category}</h3>
              <div className={styles.pills} role="list" aria-label={category}>
                {items.map(skill => (
                  <span key={skill} className={styles.pill} role="listitem">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
