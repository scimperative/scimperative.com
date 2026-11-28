interface AboutPageProps {
  onNavigate: (path: string) => void;
}

export function AboutPage({ onNavigate }: AboutPageProps) {
  return (
    <div className="page-container">
      <header className="page-header">
        <h1 className="page-header__title">About</h1>
      </header>

      <div style={{ lineHeight: 1.75, fontSize: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <p>
          Silicon (<em>Si</em>), the foundation of every digital machine, and carbon (<em>C</em>), the foundation of every biological being, abstractly represent the divide between digital intelligence and biological intelligence.
        </p>
        <p>
          Their compound, silicon carbide, fraught with difficulty in its creation, exists to handle the most adverse of physical environments that are defined by extreme temperatures, pressures, and voltages where either constituent alone can fail.
        </p>
        <p>
          I believe the most imperative challenges of the coming decades will emerge at similarly demanding interfaces: where digital intelligence meets biological intelligence, where software encounters real-world friction, and where machines meet humans, reshaping ordinary lives, organisations, and nations.
        </p>
        <p>
          <em>Silicon Carbide Imperative</em> is an educational initiative that explores these interfaces from first principles, building intuition by identifying binding constraints: what currently limits a system and what changes once it is addressed.
        </p>
        <p>
          It is organised around{' '}
          <a
            href="/threads/"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/threads/');
            }}
          >
            Threads
          </a>{' '}
          — core questions that connect three pillars: the{' '}
          <a
            href="/sandbox/"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/sandbox/');
            }}
          >
            Sandbox
          </a>
          , a set of open-source browser tools that make system limits visible and interactive; the{' '}
          <a
            href="/workshop/"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/workshop/');
            }}
          >
            Workshop
          </a>
          , a hardware testbed that publishes physical measurements from real devices; and the{' '}
          <a
            href="/library/"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/library/');
            }}
          >
            Library
          </a>
          , written research that unpacks the physics, trade-offs, and practical takeaways with the working shown so it can be verified, contested, or extended.
        </p>
        <p>
          The work is driven by my curiosity across fields such as artificial intelligence (AI), space, defence, semiconductors, macroeconomics, supply chains, geopolitics, and critical infrastructure.
        </p>
        <p>
          My perspective is shaped by a career across the aeronautical, space, and defence industries as an AI engineer, published researcher in explainable AI, and builder of autonomous systems across spacecraft, aircraft, missile defence, and radar platforms in Australia and Europe (see my experience on{' '}
          <a href="https://patrickxcapaldo.github.io/" target="_blank" rel="noopener noreferrer">
            my personal website ↗
          </a>{' '}
          and{' '}
          <a href="https://www.linkedin.com/in/patrickxcapaldo/" target="_blank" rel="noopener noreferrer">
            LinkedIn profile ↗
          </a>
          ).
        </p>
        <p>
          The motivation is to reason upwards from the underlying constraints to where we stand today, and where we may be going as a civilisation tomorrow.
        </p>
        <p>
          If you are curious whether a technology claim holds up, read a piece, move the sliders, compare the model with the measurements, and check my numbers.
        </p>
        <p className="about-page__disclaimer">
          <em>
            This is a personal, independent effort written in a purely private capacity, using only publicly available information, for the sole purpose of education. All views and works are exclusively those of the author and do not derive from, nor represent the views or works of, any past, present, or future employers, clients, or affiliated organisations.
          </em>
        </p>
      </div>
    </div>
  );
}
