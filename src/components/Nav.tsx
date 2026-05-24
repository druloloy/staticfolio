import { useState, useEffect, useCallback } from 'react';
import { Personal } from '../types/portfolio';
import styles from './Nav.module.css';

interface NavProps {
  email: Personal['email'];
}

const NAV_LINKS = [
  { label: 'Work', id: 'work' },
  { label: 'Skills', id: 'skills' },
  { label: 'Contact', id: 'contact' },
];

export function Nav({ email }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  }, []);

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`} role="navigation" aria-label="Main navigation">
      <div className={styles.inner}>
        <button
          className={styles.logo}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Scroll to top"
        >
          druloloy
        </button>

        <ul className={`${styles.links} ${open ? styles.open : ''}`} role="list">
          {NAV_LINKS.map(link => (
            <li key={link.id}>
              <button onClick={() => scrollTo(link.id)} className={styles.navLink}>
                {link.label}
              </button>
            </li>
          ))}
          <li>
            <a href={`mailto:${email}`} className={styles.cta}>
              Hire Me
            </a>
          </li>
        </ul>

        <button
          className={`${styles.hamburger} ${open ? styles.hamburgerOpen : ''}`}
          onClick={() => setOpen(prev => !prev)}
          aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={open}
          aria-controls="nav-links"
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
      </div>
    </nav>
  );
}
