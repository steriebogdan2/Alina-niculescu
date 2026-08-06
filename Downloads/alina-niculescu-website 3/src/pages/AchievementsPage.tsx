import { useMemo } from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Section } from '@/components/layout/Section';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { AwardCards } from '@/components/sections/AwardCards';
import { AchievementsList } from '@/components/sections/AchievementsList';
import { StoryGallery } from '@/components/sections/StoryGallery';
import { CountUp } from '@/components/common/CountUp';
import { Button } from '@/components/ui/Button';
import { usePageMeta } from '@/hooks/usePageMeta';
import { achievements, gallery, person, press, videos } from '@/lib/content';
import { ROUTES, SITE_URL } from '@/lib/constants';

export default function AchievementsPage() {
  const years = achievements.map((a) => Number(a.year));
  const span = Math.max(...years) - Math.min(...years) + 1;
  const clips = videos.tv.length + videos.studio.length + videos.stage.length;

  const jsonLd = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: person.fullName,
      url: SITE_URL,
      jobTitle: person.roles.join(', '),
      award: achievements.map((a) => `${a.title} (${a.year})`),
    }),
    [],
  );

  const trophies = gallery.images.filter((i) => i.category === 'palmares');

  usePageMeta(
    'Palmares · Alexandra-Alina Niculescu',
    `Cele ${achievements.length} titluri obținute între ${Math.min(...years)} și ${Math.max(...years)}, cu organizatorul și locul fiecărei distincții.`,
    ROUTES.achievements,
    { type: 'profile', jsonLd },
  );

  return (
    <>
      <PageHeader
        label={`Palmares · ${Math.min(...years)} › ${Math.max(...years)}`}
        lead={`${achievements.length} titluri,`}
        accent={`${span} ani`}
        text="De la primul titlu până la coroana europeană. Fiecare distincție poartă organizatorul care a acordat-o."
      />

      <Section className="!pt-0 !pb-[clamp(40px,5vw,72px)]">
        <div className="stats">
          <CountUp to={achievements.length} label="Titluri" />
          <CountUp to={span} label="Ani de competiții" />
          <CountUp to={clips} label="Materiale video" />
          <CountUp to={press.length} label="Apariții în presă" />
        </div>
      </Section>

      <Section tone="tint">
        <SectionLabel>Distincții</SectionLabel>
        <AwardCards items={achievements} images={gallery.images} />
      </Section>

      <Section>
        <SectionLabel>Coroane, eșarfe și diplome</SectionLabel>
        <StoryGallery images={trophies} />
      </Section>

      <Section tone="tint">
        <SectionLabel>Cronologie</SectionLabel>
        <AchievementsList items={achievements} />
        <p style={{ marginTop: 44 }}>
          <Button to={ROUTES.press} arrow>
            Cum a fost relatat în presă
          </Button>
        </p>
      </Section>
    </>
  );
}
