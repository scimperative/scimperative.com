import React from 'react';

export type NavSection = 'home' | 'threads' | 'sandbox' | 'workshop' | 'library' | 'about';

interface HeaderProps {
  activeSection: NavSection;
  onNavigate: (path: string) => void;
  onOpenSearch: () => void;
}

const NAV_ITEMS: { id: NavSection; label: string; path: string }[] = [
  { id: 'threads', label: 'Threads', path: '/threads/' },
  { id: 'sandbox', label: 'Sandbox', path: '/sandbox/' },
  { id: 'workshop', label: 'Workshop', path: '/workshop/' },
  { id: 'library', label: 'Library', path: '/library/' },
  { id: 'about', label: 'About', path: '/about/' },
];

export const Header: React.FC<HeaderProps> = ({ activeSection, onNavigate, onOpenSearch }) => {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <a
          href="/"
          className="site-header__brand"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('/');
          }}
        >
          <picture>
            <source srcSet="/silicon_carbide_logo_dark.png" media="(prefers-color-scheme: dark)" />
            <img
              src="/silicon_carbide_logo_light.png"
              alt="Silicon Carbide Imperative"
              className="site-header__logo"
            />
          </picture>
          <span className="site-header__title">Silicon Carbide Imperative</span>
        </a>

        <nav className="site-header__nav" aria-label="Primary navigation">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={item.path}
              className={`site-header__link ${activeSection === item.id ? 'is-active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(item.path);
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="site-header__search"
          onClick={onOpenSearch}
          aria-label="Search (/)"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <kbd className="site-header__kbd">/</kbd>
        </button>
      </div>
    </header>
  );
};
