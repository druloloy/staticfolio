import { useState } from 'react';
import { motion } from 'framer-motion';
import { Project } from '../types/portfolio';
import { useScrollReveal, staggerContainer, revealVariants } from '../hooks/useScrollReveal';
import styles from './Projects.module.css';

interface ProjectsProps {
  projects: Project[];
}

type Filter = 'all' | 'featured';

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className={styles.card} aria-label={project.title}>
      {project.placeholder && (
        <div className={styles.overlay} aria-label="Coming soon">
          <span className={styles.overlayText}>Coming Soon</span>
        </div>
      )}

      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{project.title}</h3>
        <p className={styles.cardDesc}>{project.description}</p>

        <div className={styles.tags} aria-label="Technologies used">
          {project.tags.map(tag => (
            <span key={tag} className={styles.tag}>{tag}</span>
          ))}
        </div>

        {!project.placeholder && (
          <div className={styles.cardLinks}>
            {project.repo && (
              <a href={project.repo} target="_blank" rel="noopener noreferrer" className={styles.cardLink}>
                GitHub
              </a>
            )}
            {project.link && (
              <a href={project.link} target="_blank" rel="noopener noreferrer" className={styles.cardLink}>
                Live ↗
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export function Projects({ projects }: ProjectsProps) {
  const [filter, setFilter] = useState<Filter>('all');
  const { ref, animate, initial } = useScrollReveal();

  const filtered = filter === 'featured'
    ? projects.filter(p => p.featured)
    : projects;

  return (
    <section className={styles.projects} id="work" aria-label="Projects">
      <div className="container">
        <p className="sectionLabel">Work</p>
        <h2 className="sectionHeading">Things I've built.</h2>

        <div className={styles.filterBar} role="group" aria-label="Filter projects">
          {(['all', 'featured'] as Filter[]).map(f => (
            <button
              key={f}
              className={`${styles.filterBtn} ${filter === f ? styles.filterActive : ''}`}
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
            >
              {f === 'all' ? 'All' : 'Featured'}
            </button>
          ))}
        </div>

        <motion.div
          ref={ref}
          className={styles.grid}
          variants={staggerContainer}
          initial={initial}
          animate={animate}
          key={filter}
        >
          {filtered.map(project => (
            <motion.div key={project.id} variants={revealVariants}>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
