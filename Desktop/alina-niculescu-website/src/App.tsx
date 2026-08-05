import { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RootLayout } from '@/layouts/RootLayout';
import { LanguageProvider } from '@/context/LanguageContext';
import { ROUTES } from '@/lib/constants';

const HomePage = lazy(() => import('@/pages/HomePage'));
const AboutPage = lazy(() => import('@/pages/AboutPage'));
const AchievementsPage = lazy(() => import('@/pages/AchievementsPage'));
const VideosPage = lazy(() => import('@/pages/VideosPage'));
const PressPage = lazy(() => import('@/pages/PressPage'));
const ContactPage = lazy(() => import('@/pages/ContactPage'));
const PrivacyPage = lazy(() => import('@/pages/PrivacyPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Suspense fallback={<div className="min-h-screen" aria-hidden />}>
          <Routes>
            <Route element={<RootLayout />}>
              <Route path={ROUTES.home} element={<HomePage />} />
              <Route path={ROUTES.about} element={<AboutPage />} />
              <Route path={ROUTES.achievements} element={<AchievementsPage />} />
              <Route path={ROUTES.videos} element={<VideosPage />} />
              <Route path={ROUTES.press} element={<PressPage />} />
              <Route path={ROUTES.contact} element={<ContactPage />} />
              <Route path={ROUTES.privacy} element={<PrivacyPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </LanguageProvider>
  );
}
