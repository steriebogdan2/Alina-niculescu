import { useState } from 'react';
import type { VideoItem } from '@/types';

interface Props {
  item: VideoItem;
  onPlay?: (id: string) => void;
}

/**
 * Afișează întâi cadrul de previzualizare. Fișierul video se încarcă
 * abia la primul clic, ca pagina să rămână ușoară cu 20 de clipuri.
 */
export function VideoCard({ item, onPlay }: Props) {
  const [active, setActive] = useState(false);

  return (
    <figure className="clip">
      <div className="clip-frame">
        {active ? (
          <video
            data-video-id={item.id}
            controls
            autoPlay
            playsInline
            poster={item.poster}
            onPlay={() => onPlay?.(item.id)}
          >
            <source src={item.src} type="video/mp4" />
          </video>
        ) : (
          <button
            type="button"
            onClick={() => setActive(true)}
            aria-label={`Redă: ${item.title}`}
            style={{ all: 'unset', cursor: 'pointer', display: 'block' }}
          >
            <img src={item.poster} alt="" loading="lazy" decoding="async" />
            <span className="clip-play" aria-hidden />
          </button>
        )}
      </div>

      <figcaption>
        <span>
          <span className="c-title">{item.title}</span>
          <span className="c-note mono">{item.note}</span>
        </span>
        <span className="c-dur">{item.duration}</span>
      </figcaption>
    </figure>
  );
}
