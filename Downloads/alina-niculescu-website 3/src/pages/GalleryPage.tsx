import { useMemo } from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Section } from '@/components/layout/Section';
import { GalleryMasonry } from '@/components/sections/GalleryMasonry';
import { usePageMeta } from '@/hooks/usePageMeta';
import { gallery, person } from '@/lib/content';
import { ROUTES, SITE_URL } from '@/lib/constants';

export default function GalleryPage() {
  const jsonLd = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'ImageGallery',
      name: 'Galerie foto',
      description: gallery.seo.description,
      inLanguage: 'ro-RO',
      url: `${SITE_URL}${ROUTES.gallery}`,
      about: { '@type': 'Person', name: person.fullName, url: SITE_URL },
      associatedMedia: gallery.images.map((img) => ({
        '@type': 'ImageObject',
        contentUrl: `${SITE_URL}${img.src}`,
        caption: img.caption,
        width: img.width,
        height: img.height,
        ...(img.credit ? { creditText: img.credit } : {}),
      })),
    }),
    [],
  );

  usePageMeta(gallery.seo.title, gallery.seo.description, ROUTES.gallery, {
    image: gallery.seo.ogImage,
    type: 'website',
    jsonLd,
  });

  return (
    <>
      <PageHeader
        label={`${gallery.eyebrow} · ${gallery.images.length} fotografii`}
        lead={gallery.titleLead}
        accent={gallery.titleAccent}
        text={gallery.lede}
      />

      <Section className="!pt-0">
        <GalleryMasonry images={gallery.images} categories={gallery.categories} />
      </Section>
    </>
  );
}
