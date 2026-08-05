import { PageHeader } from '@/components/layout/PageHeader';
import { Section } from '@/components/layout/Section';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { VideoReel } from '@/components/sections/VideoReel';
import { usePageMeta } from '@/hooks/usePageMeta';
import { videos } from '@/lib/content';
import { ROUTES } from '@/lib/constants';
import { durationToSeconds, humanDuration } from '@/utils/format';

export default function VideosPage() {
  usePageMeta(
    'Video · Alexandra-Alina Niculescu',
    'Apariții la România TV, B1 TV și Antena Stars, interviuri în platou și momente din finalele concursurilor.',
    ROUTES.videos,
  );

  const all = [...videos.tv, ...videos.studio, ...videos.stage];
  const total = humanDuration(all.reduce((sum, v) => sum + durationToSeconds(v.duration), 0));

  return (
    <>
      <PageHeader
        label={`Arhivă filmată · ${all.length} de clipuri`}
        lead="La televizor"
        accent="și pe scenă"
        text={`${total} de material, în trei arhive. Clipurile pornesc doar la cerere, ca pagina să rămână ușoară.`}
      />

      <Section tone="theatre">
        <SectionLabel className="!text-blush">Televiziune · știri și interviuri</SectionLabel>
        <VideoReel items={videos.tv} />

        <div style={{ marginTop: 'clamp(52px,7vw,92px)' }}>
          <SectionLabel className="!text-blush">În platou · emisiuni</SectionLabel>
          <VideoReel items={videos.studio} />
        </div>

        <div style={{ marginTop: 'clamp(52px,7vw,92px)' }}>
          <SectionLabel className="!text-blush">Pe scenă și în culise · vertical</SectionLabel>
          <VideoReel items={videos.stage} orientation="portrait" />
        </div>
      </Section>
    </>
  );
}
