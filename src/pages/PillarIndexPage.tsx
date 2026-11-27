import React from 'react';
import { type Pillar, getEntitiesByPillar } from '../data/knowledgeGraph';
import { EntityChip } from '../components/EntityChip';

interface PillarIndexPageProps {
  pillar: Pillar;
  onNavigate: (path: string) => void;
  onSelectTag: (tag: string) => void;
}

const PILLAR_META: Record<Pillar, { title: string; description: string }> = {
  sandbox: {
    title: 'Sandbox',
    description:
      'Model it. Interactive calculators for testing physical constraints and what-if assumptions.',
  },
  workshop: {
    title: 'Workshop',
    description:
      'Test it. Hands-on measurements that put real hardware against what the model expects.',
  },
  library: {
    title: 'Library',
    description:
      'Explain it. Written analysis unpacking the physics, trade-offs, and practical takeaways behind a question.',
  },
};

export const PillarIndexPage: React.FC<PillarIndexPageProps> = ({
  pillar,
  onNavigate,
  onSelectTag,
}) => {
  const meta = PILLAR_META[pillar];
  const entities = getEntitiesByPillar(pillar);

  return (
    <div className="page-container">
      <header className="page-header">
        <div className="page-header__title-row">
          <h1 className="page-header__title">{meta.title}</h1>
          <span className="page-header__count">{entities.length} published</span>
        </div>
        <p className="page-header__description">{meta.description}</p>
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
