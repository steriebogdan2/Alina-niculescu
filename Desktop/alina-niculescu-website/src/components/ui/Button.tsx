import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/utils/cn';

type Variant = 'solid' | 'ghost' | 'light';

interface Base {
  children: ReactNode;
  variant?: Variant;
  /** Săgeata care alunecă la hover. */
  arrow?: boolean;
  className?: string;
}

type Props =
  | (Base & { to: string; href?: never; type?: never; disabled?: never })
  | (Base & { href: string; to?: never; type?: never; disabled?: never })
  | (Base & { type: 'button' | 'submit'; disabled?: boolean; to?: never; href?: never });

const VARIANT: Record<Variant, string> = {
  solid: 'btn-solid',
  ghost: 'btn-ghost',
  light: 'btn-light',
};

export function Button(props: Props) {
  const { children, variant = 'ghost', arrow = false, className } = props;
  const classes = cn('btn', VARIANT[variant], className);
  const body = (
    <>
      {children}
      {arrow && <span className="arrow">→</span>}
    </>
  );

  if ('to' in props && props.to) {
    return (
      <Link to={props.to} className={classes}>
        {body}
      </Link>
    );
  }

  if ('href' in props && props.href) {
    return (
      <a href={props.href} className={classes} target="_blank" rel="noopener noreferrer">
        {body}
      </a>
    );
  }

  return (
    <button type={props.type} disabled={props.disabled} className={classes}>
      {body}
    </button>
  );
}
