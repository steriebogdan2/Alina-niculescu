import { Section } from '@/components/layout/Section';
import { Button } from '@/components/ui/Button';
import { useLanguage } from '@/context/LanguageContext';
import { usePageMeta } from '@/hooks/usePageMeta';
import { ROUTES } from '@/lib/constants';

export default function NotFoundPage() {
  const { t } = useLanguage();
  usePageMeta('404 · Alexandra-Alina Niculescu', 'Pagina căutată nu există.', '/404');

  return (
    <Section narrow className="!pt-[clamp(150px,20vw,240px)]">
      <p className="mono label">Eroare 404</p>
      <h1 className="display h2" style={{ marginTop: 24 }}>
        Pagina nu <em>există</em>
      </h1>
      <p className="lede measure-tight">{t('notFound')}</p>
      <p style={{ marginTop: 34 }}>
        <Button to={ROUTES.home} variant="solid" arrow>
          {t('backHome')}
        </Button>
      </p>
    </Section>
  );
}
