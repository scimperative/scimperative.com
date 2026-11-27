import React from 'react';
import { type Entity } from '../data/knowledgeGraph';
import { EntityDetailHeader } from '../components/EntityDetailHeader';

interface EntityDetailPageProps {
  entity: Entity;
  onNavigate: (path: string) => void;
  onSelectTag: (tag: string) => void;
}

export const EntityDetailPage: React.FC<EntityDetailPageProps> = ({
  entity,
  onNavigate,
  onSelectTag,
}) => {
  return (
    <div className="page-container">
      <EntityDetailHeader
        entity={entity}
        onNavigate={onNavigate}
        onSelectTag={onSelectTag}
      />

      <div className="entity-detail-body">
        {entity.workshopDetails && (
          <div className="workshop-details">
            <div className="workshop-details__block">
              <h2>Prediction</h2>
              <p>{entity.workshopDetails.prediction}</p>
            </div>
            <div className="workshop-details__block">
              <h2>Measured</h2>
              <p>{entity.workshopDetails.measured}</p>
            </div>
            <div className="workshop-details__block">
              <h2>Gap</h2>
              <p>{entity.workshopDetails.gap}</p>
            </div>
          </div>
        )}

        {entity.externalUrl && (
          <div className="entity-detail-body__external">
            <a
              href={entity.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="home-cta home-cta--outlined"
            >
              {entity.pillar === 'workshop'
                ? 'View on GitHub ↗'
                : 'Read on Substack ↗'}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
