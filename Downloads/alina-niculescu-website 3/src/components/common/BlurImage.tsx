import { useState } from 'react';
import type { GalleryImage } from '@/types';

interface Props {
  image: GalleryImage;
  sizes: string;
  /** Primele cadre se încarcă imediat, restul la nevoie. */
  eager?: boolean;
}

/**
 * Afișează întâi un substitut de 16px, neclar, apoi trece la imaginea reală.
 * Raportul laturilor este fixat din date, deci pagina nu sare la încărcare.
 */
export function BlurImage({ image, sizes, eager = false }: Props) {
  const [loaded, setLoaded] = useState(false);

  return (
    <span
      className="blur-wrap"
      style={{
        aspectRatio: `${image.width} / ${image.height}`,
        backgroundImage: image.lqip ? `url(${image.lqip})` : undefined,
      }}
    >
      <picture>
        {image.webpSet && <source type="image/webp" srcSet={image.webpSet} sizes={sizes} />}
        <img
          src={image.src}
          srcSet={image.srcSet}
          sizes={sizes}
          alt={image.alt}
          width={image.width}
          height={image.height}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setLoaded(true)}
          className={loaded ? 'is-loaded' : undefined}
        />
      </picture>
    </span>
  );
}
