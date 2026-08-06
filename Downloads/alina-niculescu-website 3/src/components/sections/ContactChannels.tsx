import { person, social } from '@/lib/content';

export function ContactChannels() {
  return (
    <div>
      <ul className="channels">
        <li>
          <span className="k">Email</span>
          <a href={`mailto:${person.email}`}>{person.email}</a>
        </li>
        {social.map((item) => (
          <li key={item.label}>
            <span className="k">{item.label}</span>
            {item.url ? (
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                {item.handle}
              </a>
            ) : (
              <span className="v" style={{ opacity: 0.5 }}>
                {item.handle}
              </span>
            )}
          </li>
        ))}
      </ul>

      <p style={{ marginTop: 28, color: 'color-mix(in srgb, var(--ink) 62%, transparent)' }}>
        Pentru redacții: cere bio-ul oficial și fotografiile de presă la rezoluție mare direct pe
        email.
      </p>
    </div>
  );
}
