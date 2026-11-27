import React from 'react';
import {
  type Entity,
  getEntityById,
  getEntityUrl,
  getThreadById,
} from '../data/knowledgeGraph';

interface EntityDetailHeaderProps {
  entity: Entity;
  onNavigate: (path: string) => void;
  onSelectTag?: (tag: string) => void;
}

export const EntityDetailHeader: React.FC<EntityDetailHeaderProps> = ({
  entity,
  onNavigate,
  onSelectTag,
}) => {
  const thread = getThreadById(entity.thread_id);

  return (
    <header className="entity-detail-header">
      <h1 className="entity-detail-header__title">{entity.title}</h1>

      <div className="entity-detail-header__meta">
        <span>{entity.id}</span>
        {thread && (
          <>
            <span aria-hidden="true">·</span>
            <a
              href={`/threads/${thread.slug}/`}
              className="entity-detail-header__thread"
              onClick={(e) => {
                e.preventDefault();
                onNavigate(`/threads/${thread.slug}/`);
              }}
            >
              {thread.title}
            </a>
          </>
        )}
        <span aria-hidden="true">·</span>
        <time dateTime={entity.date}>{entity.date}</time>
      </div>

      {entity.tags.length > 0 && (
        <div className="entity-detail-header__tags">
          {entity.tags.map((tag) => (
            <button
              key={tag}
              type="button"
              className="entity-tag"
              onClick={() => onSelectTag?.(tag)}
            >
              #{tag}
            </button>
          ))}
        </div>
      )}

      {entity.links.length > 0 && (
        <div className="entity-detail-header__links">
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

      <div className="entity-detail-header__summary">
        <div className="entity-detail-header__summary-label">Summary</div>
        <p>{entity.summary}</p>
      </div>

      <hr className="entity-detail-header__divider" />
    </header>
  );
};
