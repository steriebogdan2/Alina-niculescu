import { Link, NavLink } from 'react-router-dom';
import { Container } from '@/components/ui/Container';
import { useLanguage } from '@/context/LanguageContext';
import { nav, person } from '@/lib/content';
import { ROUTES } from '@/lib/constants';
import { currentYear } from '@/utils/format';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="foot">
      <Container>
        <div className="foot-top">
          <Link to="/" className="foot-mark">
            {person.firstName} <i>{person.secondName}</i> {person.surname}
          </Link>
          <nav className="foot-nav">
            {nav
              .filter((item) => item.path !== '/')
              .map((item) => (
                <NavLink key={item.path} to={item.path}>
                  {item.label}
                </NavLink>
              ))}
          </nav>
        </div>

        <div className="foot-base mono">
          <span>
            © {currentYear()} {person.fullName}
          </span>
          <Link to={ROUTES.privacy}>{t('privacy')}</Link>
        </div>
      </Container>
    </footer>
  );
}
