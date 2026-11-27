import React from 'react';
import { type Thread, type Pillar, getEntitiesByThread } from '../data/knowledgeGraph';
import { EntityChip } from '../components/EntityChip';

interface ThreadHubPageProps {
  thread: Thread;
  onNavigate: (path: string) => void;
  onSelectTag: (tag: string) => void;
}

const PILLAR_GROUPS: { pillar: Pillar; label: string }[] = [
  { pillar: 'sandbox', label: 'Sandbox' },
  { pillar: 'workshop', label: 'Workshop' },
  { pillar: 'library', label: 'Library' },
];

export const ThreadHubPage: React.FC<ThreadHubPageProps> = ({
  thread,
  onNavigate,
  onSelectTag,
}) => {
  const entities = getEntitiesByThread(thread.id);

  const grouped = PILLAR_GROUPS.map(({ pillar, label }) => ({
    pillar,
    label,
    items: entities
      .filter((e) => e.pillar === pillar)
      .sort((a, b) => a.id.localeCompare(b.id)),
  })).filter((group) => group.items.length > 0);

  return (
    <div className="page-container">
      <header className="page-header">
        <h1 className="page-header__title">{thread.title}</h1>
        <p className="page-header__description">{thread.description}</p>
        {thread.tags.length > 0 && (
          <div className="page-header__tags">
            {thread.tags.map((tag) => (
              <button
                key={tag}
                type="button"
                className="entity-tag"
                onClick={() => onSelectTag(tag)}
              >
                #{tag}
              </button>
            ))}
          </div>
        )}
      </header>

      {grouped.map((group) => (
        <section key={group.pillar} className="thread-pillar-group">
          <h2 className="thread-pillar-group__title">{group.label}</h2>
          <div className="cards-grid">
            {group.items.map((entity) => (
              <EntityChip
                key={entity.id}
                entity={entity}
                onNavigate={onNavigate}
                onSelectTag={onSelectTag}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};
