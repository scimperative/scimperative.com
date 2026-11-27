import React from 'react';
import { type Thread, getEntitiesByThread } from '../data/knowledgeGraph';

import { HighlightText } from './HighlightText';

interface ThreadCardProps {
  thread: Thread;
  onNavigate: (path: string) => void;
  onSelectTag?: (tag: string) => void;
  highlightQuery?: string;
}

export const ThreadCard: React.FC<ThreadCardProps> = ({
  thread,
  onNavigate,
  onSelectTag,
  highlightQuery,
}) => {
  const entities = getEntitiesByThread(thread.id);
  const sandboxCount = entities.filter((e) => e.pillar === 'sandbox').length;
  const workshopCount = entities.filter((e) => e.pillar === 'workshop').length;
  const libraryCount = entities.filter((e) => e.pillar === 'library').length;

  const counts = [
    sandboxCount > 0 ? `${sandboxCount} Sandbox` : null,
    workshopCount > 0 ? `${workshopCount} Workshop` : null,
    libraryCount > 0 ? `${libraryCount} Library` : null,
  ]
    .filter(Boolean)
    .join(' · ');

  return (
    <article className="thread-card">
      <a
        href={`/threads/${thread.slug}/`}
        className="thread-card__title"
        onClick={(e) => {
          e.preventDefault();
          onNavigate(`/threads/${thread.slug}/`);
        }}
      >
        <HighlightText text={thread.title} query={highlightQuery} />
      </a>

      <p className="thread-card__description">
        <HighlightText text={thread.description} query={highlightQuery} />
      </p>

      {counts && <div className="thread-card__counts">{counts}</div>}

      {thread.tags.length > 0 && (
        <div className="thread-card__tags">
          {thread.tags.map((tag) => (
            <button
              key={tag}
              type="button"
              className="entity-tag"
              onClick={() => onSelectTag?.(tag)}
            >
              #<HighlightText text={tag} query={highlightQuery} />
            </button>
          ))}
        </div>
      )}
    </article>
  );
};
