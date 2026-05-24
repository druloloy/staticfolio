import { Helmet } from 'react-helmet-async';
import portfolioData from './config/portfolio.json';
import { Portfolio } from './types/portfolio';
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Awards } from './components/Awards';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

const data = portfolioData as Portfolio;

export default function App() {
  const { meta, personal, experience, skills, projects, awards } = data;

  return (
    <>
      <Helmet>
        <title>{meta.siteTitle}</title>
        <meta name="description" content={meta.siteDescription} />
        <meta name="author" content="Andrew Loloy" />
        <meta name="keywords" content="web developer, automation engineer, React, TypeScript, n8n, API integrations, B2B e-commerce, Webflow, HubSpot, Philippines, Manila, Taguig" />
        <meta name="robots" content="index, follow" />
        <meta name="theme-color" content="#0066CC" />
        <link rel="canonical" href={meta.siteUrl} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={meta.siteUrl} />
        <meta property="og:site_name" content="Andrew Loloy" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:title" content={meta.siteTitle} />
        <meta property="og:description" content={meta.siteDescription} />
        <meta property="og:image" content={`${meta.siteUrl}/og-image.png`} />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={meta.siteTitle} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={meta.twitterHandle} />
        <meta name="twitter:creator" content={meta.twitterHandle} />
        <meta name="twitter:title" content={meta.siteTitle} />
        <meta name="twitter:description" content={meta.siteDescription} />
        <meta name="twitter:image" content={`${meta.siteUrl}/og-image.png`} />
        <meta name="twitter:image:alt" content={meta.siteTitle} />
      </Helmet>

      <Nav email={personal.email} />

      <main>
        <Hero tagline={personal.tagline} cvPath="/cv-druloloy-052426.pdf" illustration="/druloloy-hero.png" />
        <About personal={personal} />
        <Skills skills={skills} />
        <Experience experience={experience} />
        <Projects projects={projects} />
        <Awards awards={awards} />
        <Contact email={personal.email} social={personal.social} />
      </main>

      <Footer name={personal.name} />
    </>
  );
}
