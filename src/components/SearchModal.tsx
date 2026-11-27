import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  THREADS,
  getPublishedEntities,
  getThreadById,
  type Pillar,
} from '../data/knowledgeGraph';
import { EntityChip } from './EntityChip';
import { ThreadCard } from './ThreadCard';

type SearchFacet = 'all' | 'threads' | Pillar;

interface SearchModalProps {
  isOpen: boolean;
  initialQuery?: string;
  onClose: () => void;
  onNavigate: (path: string) => void;
}

const FACETS: { id: SearchFacet; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'threads', label: 'Threads' },
  { id: 'sandbox', label: 'Sandbox' },
  { id: 'workshop', label: 'Workshop' },
  { id: 'library', label: 'Library' },
];

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  initialQuery = '',
  onClose,
  onNavigate,
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [facet, setFacet] = useState<SearchFacet>('all');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery(initialQuery);
      setTimeout(() => inputRef.current?.focus(), 10);
    }
  }, [isOpen, initialQuery]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const normalizedQuery = query.trim().toLowerCase().replace(/^#/, '');

  const matchingThreads = useMemo(() => {
    if (facet !== 'all' && facet !== 'threads') return [];
    if (!normalizedQuery) return THREADS;
    return THREADS.filter(
      (t) =>
        t.title.toLowerCase().includes(normalizedQuery) ||
        t.description.toLowerCase().includes(normalizedQuery) ||
        t.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery))
    );
  }, [facet, normalizedQuery]);

  const matchingEntities = useMemo(() => {
    if (facet === 'threads') return [];
    const all = getPublishedEntities().filter((e) =>
      facet === 'all' ? true : e.pillar === facet
    );
    if (!normalizedQuery) return all;
    return all.filter((e) => {
      const thread = getThreadById(e.thread_id);
      return (
        e.id.toLowerCase().includes(normalizedQuery) ||
        e.title.toLowerCase().includes(normalizedQuery) ||
        e.summary.toLowerCase().includes(normalizedQuery) ||
        (thread && thread.title.toLowerCase().includes(normalizedQuery)) ||
        e.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery))
      );
    });
  }, [facet, normalizedQuery]);

  if (!isOpen) return null;

  const handleNavigate = (path: string) => {
    onClose();
    onNavigate(path);
  };

  return (
    <div
      className="search-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label="Search Silicon Carbide Imperative"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="search-modal">
        <div className="search-modal__input-row">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            className="search-modal__input"
            placeholder="Search threads, entities, IDs, or #tags..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            type="button"
            className="search-modal__close"
            onClick={onClose}
            aria-label="Close search"
          >
            ESC
          </button>
        </div>

        <div className="search-modal__facets" role="tablist" aria-label="Search facets">
          {FACETS.map((f) => (
            <button
              key={f.id}
              type="button"
              role="tab"
              aria-selected={facet === f.id}
              className={`search-modal__facet ${facet === f.id ? 'is-active' : ''}`}
              onClick={() => setFacet(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="search-modal__results">
          {matchingThreads.length === 0 && matchingEntities.length === 0 ? (
            <p className="search-modal__empty">No matching threads or entities.</p>
          ) : (
            <div className="search-modal__grid">
              {matchingThreads.map((thread) => (
                <ThreadCard
                  key={thread.id}
                  thread={thread}
                  onNavigate={handleNavigate}
                  onSelectTag={(tag) => setQuery(`#${tag}`)}
                  highlightQuery={normalizedQuery}
                />
              ))}
              {matchingEntities.map((entity) => (
                <EntityChip
                  key={entity.id}
                  entity={entity}
                  onNavigate={handleNavigate}
                  onSelectTag={(tag) => setQuery(`#${tag}`)}
                  highlightQuery={normalizedQuery}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
