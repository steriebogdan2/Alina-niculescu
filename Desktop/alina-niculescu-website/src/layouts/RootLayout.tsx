import { Outlet } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ScrollToTop } from '@/components/common/ScrollToTop';
import { useLanguage } from '@/context/LanguageContext';

export function RootLayout() {
  const { t } = useLanguage();

  return (
    <>
      <ScrollToTop />
      <a href="#continut" className="sr focus:not-sr-only">
        {t('skipToContent')}
      </a>
      <Header />
      <main id="continut">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
