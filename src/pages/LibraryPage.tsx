import { LIBRARY_ENTRIES } from '../../library/src/entries';

interface LibraryPageProps {
  onGoHome: () => void;
}

export function LibraryPage({ onGoHome }: LibraryPageProps) {
  return (
    <div
      style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '3.5rem 1.5rem 4rem',
        fontFamily: 'var(--sans)',
        color: 'var(--text)',
      }}
    >
      <header style={{ marginBottom: '2rem' }}>
        <button
          onClick={onGoHome}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            background: 'none',
            border: 'none',
            color: 'var(--link)',
            cursor: 'pointer',
            font: '600 0.9rem var(--sans)',
            padding: '0 0 1rem',
          }}
        >
          ← Home
        </button>
        <h1 style={{ marginBottom: '0.5rem' }}>Library</h1>
        <p style={{ color: 'var(--text)', lineHeight: 1.6 }}>
          Written research from Silicon Carbide Imperative. Each entry links to its original
          publication on Substack.
        </p>
        <div style={{ marginTop: '2rem' }}>
          <hr style={{ margin: 0, border: 0, borderTop: '1px solid var(--border)' }} />
          <div style={{ display: 'flex', justifyContent: 'center', padding: '1.25rem 0' }}>
            <a
              href="https://scimperative.substack.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="home-cta home-cta--outlined"
            >
              Visit Substack
            </a>
          </div>
          <hr style={{ margin: 0, border: 0, borderTop: '1px solid var(--border)' }} />
        </div>
      </header>

      <section>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1.25rem',
          }}
        >
          <h2
            style={{
              fontSize: '1rem',
              fontWeight: 600,
              color: 'var(--text-h)',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
            }}
          >
            Entries
          </h2>
          <span
            style={{
              fontSize: '0.8rem',
              color: 'var(--text-muted)',
              fontFamily: 'var(--mono)',
            }}
          >
            {LIBRARY_ENTRIES.length} published
          </span>
        </div>

        {LIBRARY_ENTRIES.length === 0 ? (
          <p style={{ color: 'var(--text-muted)', margin: 0 }}>No entries published yet.</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
            {LIBRARY_ENTRIES.map((entry) => (
              <a
                key={entry.href}
                href={entry.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'block',
                  border: '1px solid var(--card-border)',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  backgroundColor: 'var(--card-bg)',
                  boxShadow: 'var(--shadow-sm)',
                  textDecoration: 'none',
                  color: 'var(--text)',
                }}
              >
                <h3
                  style={{
                    margin: '0 0 0.25rem',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    color: 'var(--text-h)',
                    lineHeight: 1.3,
                  }}
                >
                  {entry.title}
                </h3>
                <time
                  dateTime={entry.date}
                  style={{
                    display: 'block',
                    fontSize: '0.8rem',
                    fontFamily: 'var(--mono)',
                    color: 'var(--text-muted)',
                    marginBottom: '0.75rem',
                  }}
                >
                  {entry.date}
                </time>
                {entry.subtitle && (
                  <p
                    style={{
                      margin: '0 0 0.5rem',
                      color: 'var(--text-muted)',
                      fontFamily: 'var(--mono)',
                      fontSize: '0.8rem',
                    }}
                  >
                    {entry.subtitle}
                  </p>
                )}
                {entry.summary && (
                  <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: 1.55 }}>
                    {entry.summary}
                  </p>
                )}
                <span
                  style={{
                    display: 'block',
                    marginTop: '0.75rem',
                    color: 'var(--link)',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                  }}
                >
                  Read on Substack →
                </span>
              </a>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
