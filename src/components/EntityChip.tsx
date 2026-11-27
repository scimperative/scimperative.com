import React from 'react';
import {
  type Entity,
  getEntityById,
  getEntityUrl,
  getThreadById,
} from '../data/knowledgeGraph';

import { HighlightText } from './HighlightText';

interface EntityChipProps {
  entity: Entity;
  onNavigate: (path: string) => void;
  onSelectTag?: (tag: string) => void;
  highlightQuery?: string;
}

export const EntityChip: React.FC<EntityChipProps> = ({
  entity,
  onNavigate,
  onSelectTag,
  highlightQuery,
}) => {
  const thread = getThreadById(entity.thread_id);
  const entityUrl = getEntityUrl(entity);

  return (
    <article className="entity-chip">
      <a
        href={entityUrl}
        className="entity-chip__title"
        onClick={(e) => {
          e.preventDefault();
          onNavigate(entityUrl);
        }}
      >
        <HighlightText text={entity.title} query={highlightQuery} />
      </a>

      <div className="entity-chip__meta">
        <span>
          <HighlightText text={entity.id} query={highlightQuery} />
        </span>
        <span aria-hidden="true">·</span>
        <time dateTime={entity.date}>{entity.date}</time>
      </div>

      {thread && (
        <a
          href={`/threads/${thread.slug}/`}
          className="entity-chip__thread"
          onClick={(e) => {
            e.preventDefault();
            onNavigate(`/threads/${thread.slug}/`);
          }}
        >
          <HighlightText text={thread.title} query={highlightQuery} />
        </a>
      )}

      {entity.tags.length > 0 && (
        <div className="entity-chip__tags">
          {entity.tags.map((tag) => (
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

      {entity.links.length > 0 && (
        <div className="entity-chip__links">
          {entity.links.map((linkId) => {
            const target = getEntityById(linkId);
            const targetUrl = target ? getEntityUrl(target) : '#';
            return (
              <a
                key={linkId}
                href={targetUrl}
                className="entity-link-pill"
                onClick={(e) => {
                  e.preventDefault();
                  if (target) onNavigate(targetUrl);
                }}
              >
                {linkId}
              </a>
            );
          })}
        </div>
      )}
    </article>
  );
};
