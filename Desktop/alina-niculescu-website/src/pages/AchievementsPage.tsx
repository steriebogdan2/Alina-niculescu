import { PageHeader } from '@/components/layout/PageHeader';
import { Section } from '@/components/layout/Section';
import { AchievementsList } from '@/components/sections/AchievementsList';
import { Button } from '@/components/ui/Button';
import { usePageMeta } from '@/hooks/usePageMeta';
import { achievements } from '@/lib/content';
import { ROUTES } from '@/lib/constants';

export default function AchievementsPage() {
  usePageMeta(
    'Palmares · Alexandra-Alina Niculescu',
    'Toate titlurile și premiile obținute între 2021 și 2026, cu organizatorul fiecărui premiu.',
    ROUTES.achievements,
  );

  const years = achievements.map((a) => Number(a.year));
  const span = Math.max(...years) - Math.min(...years) + 1;

  return (
    <>
      <PageHeader
        label="Palmares · 2021 › 2026"
        lead={`${achievements.length} titluri,`}
        accent={`${span} ani`}
        text="Cronologic, de la cel mai recent spre început. Fiecare rând poartă organizatorul care a acordat premiul."
      />

      <Section>
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
