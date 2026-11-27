interface HelpPageProps {
  onNavigate: (path: string) => void;
}

export function HelpPage({ onNavigate }: HelpPageProps) {
  return (
    <div className="page-container">
      <header className="page-header">
        <h1 className="page-header__title">Help</h1>
        <p className="page-header__description">
          How Silicon Carbide Imperative is organised, what the IDs mean, and how to navigate between models, measurements, and research.
        </p>
      </header>

      <div style={{ lineHeight: 1.75, fontSize: '1rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <section>
          <h2>Threads &amp; Pillars</h2>
          <p>
            The site is organised around{' '}
            <a
              href="/threads/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/threads/');
              }}
            >
              Threads
            </a>
            — core questions that connect three pillars:
          </p>
          <ul>
            <li>
              <strong>
                <a
                  href="/sandbox/"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/sandbox/');
                  }}
                >
                  Sandbox
                </a>
              </strong>
              : Interactive browser models that make physical and system constraints visible.
            </li>
            <li>
              <strong>
                <a
                  href="/workshop/"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/workshop/');
                  }}
                >
                  Workshop
                </a>
              </strong>
              : Hardware testbeds, protocols, and physical measurements from real devices.
            </li>
            <li>
              <strong>
                <a
                  href="/library/"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/library/');
                  }}
                >
                  Library
                </a>
              </strong>
              : Written research, notes, standards, and reports with the working shown.
            </li>
          </ul>
          <p>
            Opening any Thread groups all related entries from Sandbox, Workshop, and Library so you can move directly between a model, its hardware measurements, and its written analysis.
          </p>
        </section>

        <section>
          <h2>Understanding Entity IDs</h2>
          <p>
            Every entry has a structured identifier in the form <code>PILLAR-TYPE-NNN</code> (for example, <code>SBX-MOD-001</code>):
          </p>
          <ul>
            <li>
              <strong>Pillar</strong>: <code>SBX</code> (Sandbox), <code>WKS</code> (Workshop), or <code>LIB</code> (Library).
            </li>
            <li>
              <strong>Type</strong>: <code>MOD</code> (Interactive Model), <code>EXP</code> (Hardware Experiment), <code>NTE</code> (Research Note), <code>STD</code> (Standard / Reference), or <code>RPT</code> (Report).
            </li>
            <li>
              <strong>Number</strong>: A three-digit sequence number within that pillar and type (<code>001</code>, <code>002</code>, …).
            </li>
          </ul>
        </section>

        <section>
          <h2>Search &amp; Tags</h2>
          <p>
            Press <kbd>/</kbd> anywhere on the site (or click the search button in the header) to search across all Threads, Sandbox models, Workshop experiments, and Library entries by title, ID, or <code>#tag</code>. Clicking any <code>#tag</code> chip on a card or page opens search filtered to that tag.
          </p>
        </section>
      </div>
    </div>
  );
}
