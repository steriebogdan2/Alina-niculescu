const PATHS: Record<string, string> = {
  instagram:
    'M7.6 3.5h8.8a4.1 4.1 0 0 1 4.1 4.1v8.8a4.1 4.1 0 0 1-4.1 4.1H7.6a4.1 4.1 0 0 1-4.1-4.1V7.6a4.1 4.1 0 0 1 4.1-4.1Z M12 8.1a3.9 3.9 0 1 0 0 7.8 3.9 3.9 0 0 0 0-7.8Z',
  tiktok:
    'M16.4 3.2c.3 2.2 1.6 3.5 3.7 3.7v2.6c-1.3.1-2.4-.3-3.6-1v6c0 3.4-2.5 5.4-5.3 5.4-2.9 0-5.1-2.2-5.1-5.1 0-3.1 2.6-5.3 5.8-5v2.7c-.4-.1-.9-.1-1.3-.1a2.5 2.5 0 1 0 2.4 2.5V3.2Z',
  facebook:
    'M13.4 20.8v-7.6h2.5l.4-2.9h-2.9V8.4c0-.9.3-1.4 1.5-1.4h1.5V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2h-2.5v2.9h2.5v7.6Z',
  mail: 'M3.6 6.3h16.8v11.4H3.6Z M3.9 6.7 12 12.7l8.1-6',
};

const LABELS: Record<string, string> = {
  instagram: 'Instagram',
  tiktok: 'TikTok',
  facebook: 'Facebook',
  mail: 'Email',
};

interface Props {
  kind: keyof typeof PATHS;
  /** Textul citit de cititoarele de ecran, când numele contului contează. */
  title?: string;
  size?: number;
}

export function SocialIcon({ kind, title, size = 18 }: Props) {
  return (
    <svg
      className="soc-i"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      role="img"
      aria-label={title ?? LABELS[kind]}
    >
      <path d={PATHS[kind]} />
      {kind === 'instagram' && <circle cx="16.9" cy="7.1" r="1.05" className="soc-dot" />}
    </svg>
  );
}
