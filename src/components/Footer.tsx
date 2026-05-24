import styles from './Footer.module.css';

interface FooterProps {
  name: string;
}

export function Footer({ name }: FooterProps) {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className={styles.footer} aria-label="Site footer">
      <div className={`container ${styles.inner}`}>
        <p className={styles.copy}>
          © {new Date().getFullYear()} {name}. Built with React.
        </p>
        <button
          className={styles.toTop}
          onClick={scrollToTop}
          aria-label="Scroll to top of page"
        >
          ↑ Top
        </button>
      </div>
    </footer>
  );
}
