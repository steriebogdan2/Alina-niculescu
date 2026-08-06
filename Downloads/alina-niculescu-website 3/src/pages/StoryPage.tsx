import { useMemo } from 'react';
import { Section } from '@/components/layout/Section';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Button } from '@/components/ui/Button';
import { StoryCover } from '@/components/sections/StoryCover';
import type { Crumb } from '@/components/ui/Breadcrumb';
import { StoryProse } from '@/components/sections/StoryProse';
import { StoryGallery } from '@/components/sections/StoryGallery';
import { YouTubeEmbed } from '@/components/common/YouTubeEmbed';
import { usePageMeta } from '@/hooks/usePageMeta';
import { person, story } from '@/lib/content';
import { ROUTES, SITE_URL } from '@/lib/constants';

const CRUMBS: Crumb[] = [
  { label: 'Acasă', path: ROUTES.home },
  { label: 'David & Nihan de România' },
];

export default function StoryPage() {
  const jsonLd = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          headline: 'David & Nihan de România',
          description: story.seo.description,
          inLanguage: 'ro-RO',
          image: `${SITE_URL}${story.seo.ogImage}`,
          mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}${ROUTES.story}` },
          author: { '@type': 'Person', name: person.fullName, url: SITE_URL },
          publisher: { '@type': 'Person', name: person.fullName, url: SITE_URL },
          about: { '@type': 'Person', name: person.fullName },
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: CRUMBS.map((crumb, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: crumb.label,
            item: `${SITE_URL}${crumb.path ?? ROUTES.story}`,
          })),
        },
      ],
    }),
    [],
  );

  usePageMeta(story.seo.title, story.seo.description, ROUTES.story, {
    image: story.seo.ogImage,
    type: 'article',
    jsonLd,
  });

  return (
    <article className="story">
      <StoryCover story={story} crumbs={CRUMBS} />

      <Section className="story-read">
        <StoryProse
          paragraphs={story.paragraphs}
          accents={story.accents}
          rail={
            <>
              <p className="mono label story-rail-k">Povestea</p>
              <p className="story-rail-v">
                Cum a ajuns o legătură discretă subiectul unei întregi comunități online.
              </p>
            </>
          }
        />
      </Section>

      <Section tone="tint">
        <SectionLabel>{story.chapter2.label}</SectionLabel>
        <StoryProse
          paragraphs={story.chapter2.paragraphs}
          accents={story.chapter2.accents}
          rail={
            <>
              <p className="mono label story-rail-k">{story.chapter2.label}</p>
              <p className="story-rail-v">{story.chapter2.title}</p>
            </>
          }
        />
      </Section>

      <Section>
        <SectionLabel>{story.video.label}</SectionLabel>
        <YouTubeEmbed video={story.video} />
      </Section>

      <Section tone="tint" className="story-plates">
        <SectionLabel>Imagini</SectionLabel>
        <StoryGallery images={story.gallery} />
      </Section>

      <Section className="story-next">
        <div className="spread spread-tight">
          <h2 className="display h3" style={{ margin: 0 }}>
            Mai <em>departe</em>
          </h2>
          <div className="story-next-actions">
            <p className="measure" style={{ marginTop: 0 }}>
              Interviurile și materialele de presă care au însoțit povestea sunt strânse în dosarul
              de presă. Parcursul din spatele scenei este în pagina de prezentare.
            </p>
            <p className="story-next-btns">
              <Button to={ROUTES.press} arrow>
                Dosar de presă
              </Button>
              <Button to={ROUTES.about} variant="ghost">
                Despre Alina
              </Button>
            </p>
          </div>
        </div>
      </Section>
    </article>
  );
}
