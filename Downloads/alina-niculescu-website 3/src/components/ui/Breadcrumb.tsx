import { Fragment } from 'react';
import { Link } from 'react-router-dom';

export interface Crumb {
  label: string;
  /** Ultima verigă rămâne fără link. */
  path?: string;
}

export function Breadcrumb({ items, className }: { items: Crumb[]; className?: string }) {
  return (
    <nav aria-label="Navigare secundară" className={className}>
      <ol className="crumbs mono">
        {items.map((item, i) => (
          <Fragment key={item.label}>
            <li>
              {item.path ? (
                <Link to={item.path}>{item.label}</Link>
              ) : (
                <span aria-current="page">{item.label}</span>
              )}
            </li>
            {i < items.length - 1 && (
              <li aria-hidden="true" className="crumb-sep">
                /
              </li>
            )}
          </Fragment>
        ))}
      </ol>
    </nav>
  );
}
