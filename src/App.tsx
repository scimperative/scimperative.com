import { useState, useEffect, useCallback } from 'react';
import { getModuleById } from '../sandbox/core/registry';
import { ModuleShell } from '../sandbox/core/ModuleShell';
import { BUILD_INFO } from '../sandbox/core/buildInfo';
import { Header, type NavSection } from './components/Header';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { Breadcrumbs, type BreadcrumbItem } from './components/Breadcrumbs';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ThreadsPage } from './pages/ThreadsPage';
import { ThreadHubPage } from './pages/ThreadHubPage';
import { PillarIndexPage } from './pages/PillarIndexPage';
import { EntityDetailPage } from './pages/EntityDetailPage';
import {
  getEntityBySlug,
  getThreadBySlug,
} from './data/knowledgeGraph';

export interface AppProps {
  initialUrl?: string;
}

function normalizePath(urlOrPath: string): string {
  try {
    const u = new URL(urlOrPath, 'https://scimperative.com');
    const clean = u.pathname.replace(/\/+$/, '');
    return clean === '' ? '/' : `${clean}/`;
  } catch {
    return '/';
  }
}

export function App({ initialUrl }: AppProps = {}) {
  const readPath = () => {
    if (initialUrl) return normalizePath(initialUrl);
    if (typeof window !== 'undefined') return normalizePath(window.location.pathname);
    return '/';
  };

  const [path, setPath] = useState<string>(readPath);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handlePopState = () => setPath(readPath());
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isEditable =
        target?.tagName === 'INPUT' ||
        target?.tagName === 'TEXTAREA' ||
        target?.tagName === 'SELECT' ||
        target?.isContentEditable;
      if (isEditable) return;

      if (e.key === '/' && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault();
        setSearchQuery('');
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navigate = useCallback((nextPath: string) => {
    if (typeof window === 'undefined') return;
    const normalized = normalizePath(nextPath);
    window.history.pushState({}, '', normalized);
    setPath(normalized);
    window.scrollTo(0, 0);
  }, []);

  const handleSelectTag = useCallback((tag: string) => {
    setSearchQuery(`#${tag}`);
    setSearchOpen(true);
  }, []);

  useEffect(() => {
    const handleOpenSearch = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail;
      if (typeof detail === 'string') {
        setSearchQuery(detail);
        setSearchOpen(true);
      }
    };
    window.addEventListener('sci-open-search', handleOpenSearch);
    return () => window.removeEventListener('sci-open-search', handleOpenSearch);
  }, []);

  const parts = path.replace(/^\/+|\/+$/g, '').split('/').filter(Boolean);
  const section = parts[0] || 'home';
  const slug = parts[1];

  const activeSection: NavSection =
    section === 'threads' ||
    section === 'sandbox' ||
    section === 'workshop' ||
    section === 'library' ||
    section === 'about'
      ? section
      : 'home';

  // Resolve route content, title & breadcrumbs
  let pageTitle = 'Silicon Carbide Imperative';
  let content: React.ReactNode = null;
  let breadcrumbs: BreadcrumbItem[] = [{ label: 'Home', path: '/' }];

  if (section === 'sandbox' && slug) {
    const mod = getModuleById(slug);
    if (mod) {
      pageTitle = `${mod.manifest.title} · Silicon Carbide Imperative`;
      breadcrumbs = [
        { label: 'Home', path: '/' },
        { label: 'Sandbox', path: '/sandbox/' },
        { label: mod.manifest.title },
      ];
      return (
        <div className="site-shell">
          <Header
            activeSection="sandbox"
            onNavigate={navigate}
            onOpenSearch={() => {
              setSearchQuery('');
              setSearchOpen(true);
            }}
          />
          <Breadcrumbs items={breadcrumbs} onNavigate={navigate} />
          <div style={{ flex: 1 }}>
            <ModuleShell module={mod} />
          </div>
          <div className="sandbox-version-bar">
            Silicon Carbide Imperative Sandbox v{BUILD_INFO.sandboxVersion}
          </div>
          <SearchModal
            isOpen={searchOpen}
            initialQuery={searchQuery}
            onClose={() => setSearchOpen(false)}
            onNavigate={navigate}
          />
        </div>
      );
    }
  }

  if (section === 'threads' && slug) {
    const thread = getThreadBySlug(slug);
    if (thread) {
      pageTitle = `${thread.title} · Silicon Carbide Imperative`;
      breadcrumbs = [
        { label: 'Home', path: '/' },
        { label: 'Threads', path: '/threads/' },
        { label: thread.title },
      ];
      content = (
        <ThreadHubPage
          thread={thread}
          onNavigate={navigate}
          onSelectTag={handleSelectTag}
        />
      );
    }
  } else if (section === 'threads') {
    pageTitle = 'Threads · Silicon Carbide Imperative';
    breadcrumbs = [{ label: 'Home', path: '/' }, { label: 'Threads' }];
    content = <ThreadsPage onNavigate={navigate} onSelectTag={handleSelectTag} />;
  } else if (section === 'workshop' && slug) {
    const entity = getEntityBySlug('workshop', slug);
    if (entity) {
      pageTitle = `${entity.title} · Silicon Carbide Imperative`;
      breadcrumbs = [
        { label: 'Home', path: '/' },
        { label: 'Workshop', path: '/workshop/' },
        { label: entity.title },
      ];
      content = (
        <EntityDetailPage
          entity={entity}
          onNavigate={navigate}
          onSelectTag={handleSelectTag}
        />
      );
    }
  } else if (section === 'library' && slug) {
    const entity = getEntityBySlug('library', slug);
    if (entity) {
      pageTitle = `${entity.title} · Silicon Carbide Imperative`;
      breadcrumbs = [
        { label: 'Home', path: '/' },
        { label: 'Library', path: '/library/' },
        { label: entity.title },
      ];
      content = (
        <EntityDetailPage
          entity={entity}
          onNavigate={navigate}
          onSelectTag={handleSelectTag}
        />
      );
    }
  } else if (section === 'sandbox') {
    pageTitle = 'Sandbox · Silicon Carbide Imperative';
    breadcrumbs = [{ label: 'Home', path: '/' }, { label: 'Sandbox' }];
    content = (
      <PillarIndexPage
        pillar="sandbox"
        onNavigate={navigate}
        onSelectTag={handleSelectTag}
      />
    );
  } else if (section === 'workshop') {
    pageTitle = 'Workshop · Silicon Carbide Imperative';
    breadcrumbs = [{ label: 'Home', path: '/' }, { label: 'Workshop' }];
    content = (
      <PillarIndexPage
        pillar="workshop"
        onNavigate={navigate}
        onSelectTag={handleSelectTag}
      />
    );
  } else if (section === 'library') {
    pageTitle = 'Library · Silicon Carbide Imperative';
    breadcrumbs = [{ label: 'Home', path: '/' }, { label: 'Library' }];
    content = (
      <PillarIndexPage
        pillar="library"
        onNavigate={navigate}
        onSelectTag={handleSelectTag}
      />
    );
  } else if (section === 'about') {
    pageTitle = 'About · Silicon Carbide Imperative';
    breadcrumbs = [{ label: 'Home', path: '/' }, { label: 'About' }];
    content = <AboutPage onNavigate={navigate} />;
  }

  if (!content) {
    content = <HomePage onNavigate={navigate} onSelectTag={handleSelectTag} />;
  }

  if (typeof document !== 'undefined') {
    document.title = pageTitle;
  }

  return (
    <div className="site-shell">
      <Header
        activeSection={activeSection}
        onNavigate={navigate}
        onOpenSearch={() => {
          setSearchQuery('');
          setSearchOpen(true);
        }}
      />
      <Breadcrumbs items={breadcrumbs} onNavigate={navigate} />
      <main className="site-main">{content}</main>
      <Footer />
      <SearchModal
        isOpen={searchOpen}
        initialQuery={searchQuery}
        onClose={() => setSearchOpen(false)}
        onNavigate={navigate}
      />
    </div>
  );
}

export default App;
