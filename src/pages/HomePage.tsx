import React from 'react';

interface HomePageProps {
  onNavigate: (path: string) => void;
  onSelectTag?: (tag: string) => void;
}

const PILLARS = [
  {
    title: 'Threads',
    tagline: 'Question it.',
    description:
      'Core questions and investigation themes connecting models, measurements, and analysis.',
    path: '/threads/',
  },
  {
    title: 'Sandbox',
    tagline: 'Model it.',
    description:
      'Interactive calculators for testing physical constraints and what-if assumptions.',
    path: '/sandbox/',
  },
  {
    title: 'Workshop',
    tagline: 'Test it.',
    description:
      'Hands-on measurements that put real hardware against what the model expects.',
    path: '/workshop/',
  },
  {
    title: 'Library',
    tagline: 'Explain it.',
    description:
      'Written analysis unpacking the physics, trade-offs, and practical takeaways behind a question.',
    path: '/library/',
  },
];

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div className="page-container">
      <header className="home-front-door">
        <picture>
          <source srcSet="/silicon_carbide_logo_dark.png" media="(prefers-color-scheme: dark)" />
          <img
            src="/silicon_carbide_logo_light.png"
            alt="Silicon Carbide Imperative"
            className="home-front-door__logo"
            style={{ width: '80px', height: '80px', objectFit: 'contain' }}
          />
        </picture>
        <h1 className="home-front-door__title">Silicon Carbide Imperative</h1>
        <p className="home-front-door__tagline">
          First-principles engineering, economics, and geopolitics where machines meet physical reality.
        </p>
      </header>

      <section className="home-section">
        <div className="pillars-grid">
          {PILLARS.map((pillar) => (
            <a
              key={pillar.path}
              href={pillar.path}
              className="pillar-card"
              onClick={(e) => {
                e.preventDefault();
                onNavigate(pillar.path);
              }}
            >
              <div className="pillar-card__title">{pillar.title}</div>
              <div className="pillar-card__tagline">{pillar.tagline}</div>
              <p className="pillar-card__description">{pillar.description}</p>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
};
