import { useState } from 'react';
import type { StoryVideo } from '@/types';

/**
 * Afișează întâi miniatura, iar iframe-ul se încarcă abia la clic.
 * Un iframe YouTube adaugă peste un megaoctet de scripturi terțe și mută
 * mult scorul de performanță, așa că îl ținem deoparte până e cerut.
 */
export function YouTubeEmbed({ video }: { video: StoryVideo }) {
  const [playing, setPlaying] = useState(false);
  const { youtubeId, title, caption } = video;

  return (
    <figure className="tube">
      <div className="tube-frame">
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <button type="button" className="tube-play" onClick={() => setPlaying(true)}>
            <img
              src={`https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`}
              alt=""
              width={480}
              height={360}
              loading="lazy"
              decoding="async"
            />
            <span className="tube-veil" aria-hidden="true" />
            <span className="tube-btn" aria-hidden="true">
              <svg viewBox="0 0 24 24" focusable="false">
                <path d="M8 5.4v13.2L19 12z" />
              </svg>
            </span>
            <span className="sr">Redă materialul video: {title}</span>
          </button>
        )}
      </div>
      <figcaption className="tube-cap mono">{caption}</figcaption>
    </figure>
  );
}
