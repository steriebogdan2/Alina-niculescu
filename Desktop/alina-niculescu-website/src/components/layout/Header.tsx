import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Container } from '@/components/ui/Container';
import { useLanguage } from '@/context/LanguageContext';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import { useDarkOverlap } from '@/hooks/useDarkOverlap';
import { nav, person } from '@/lib/content';
import { cn } from '@/utils/cn';

export function Header() {
  const [open, setOpen] = useState(false);
  const [stuck, setStuck] = useState(false);
  const invert = useDarkOverlap('.theatre');
  const { t } = useLanguage();

  useLockBodyScroll(open);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={cn('nav', stuck && 'stuck', invert && 'invert')}>
      <Container>
        <NavLink to="/" className="nav-mark">
          {person.firstName} <i>{person.secondName}</i> {person.surname}
        </NavLink>

        <button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="meniu-principal"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? t('closeMenu') : t('menu')}
        </button>

        <ul id="meniu-principal" className={cn('nav-list', open && 'open')}>
          {nav
            .filter((item) => item.path !== '/')
            .map((item) => (
              <li key={item.path}>
                <NavLink to={item.path} onClick={() => setOpen(false)}>
                  {item.label}
                </NavLink>
              </li>
            ))}
        </ul>
      </Container>
    </header>
  );
}
