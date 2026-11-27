import React from 'react';
import { type Thread, getEntitiesByThread } from '../data/knowledgeGraph';
import { EntityChip } from '../components/EntityChip';

interface ThreadHubPageProps {
  thread: Thread;
  onNavigate: (path: string) => void;
  onSelectTag: (tag: string) => void;
}

export const ThreadHubPage: React.FC<ThreadHubPageProps> = ({
  thread,
  onNavigate,
  onSelectTag,
}) => {
  const entities = getEntitiesByThread(thread.id);

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

      <section className="cards-grid">
        {entities.map((entity) => (
          <EntityChip
            key={entity.id}
            entity={entity}
            onNavigate={onNavigate}
            onSelectTag={onSelectTag}
          />
        ))}
      </section>
    </div>
  );
};
