import React from 'react';

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  onNavigate: (path: string) => void;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, onNavigate }) => {
  if (items.length <= 1) return null;

  return (
    <nav className="site-breadcrumbs" aria-label="Breadcrumb">
      <div className="site-breadcrumbs__inner">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <React.Fragment key={`${item.label}-${idx}`}>
              {idx > 0 && (
                <span className="site-breadcrumbs__sep" aria-hidden="true">
                  &gt;
                </span>
              )}
              {isLast || !item.path ? (
                <span className="site-breadcrumbs__current">{item.label}</span>
              ) : (
                <a
                  href={item.path}
                  className="site-breadcrumbs__link"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(item.path!);
                  }}
                >
                  {item.label}
                </a>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </nav>
  );
};
