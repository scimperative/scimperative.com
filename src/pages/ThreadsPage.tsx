import React from 'react';
import { THREADS } from '../data/knowledgeGraph';
import { ThreadCard } from '../components/ThreadCard';

interface ThreadsPageProps {
  onNavigate: (path: string) => void;
  onSelectTag: (tag: string) => void;
}

export const ThreadsPage: React.FC<ThreadsPageProps> = ({
  onNavigate,
  onSelectTag,
}) => {
  return (
    <div className="page-container">
      <header className="page-header">
        <h1 className="page-header__title">Threads</h1>
        <p className="page-header__description">
          Core questions and investigation themes connecting Sandbox models, Workshop measurements, and Library analysis.
        </p>
      </header>

      <section className="cards-grid">
        {THREADS.map((thread) => (
          <ThreadCard
            key={thread.id}
            thread={thread}
            onNavigate={onNavigate}
            onSelectTag={onSelectTag}
          />
        ))}
      </section>
    </div>
  );
};
