import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/common/Reveal';
import { hero, person } from '@/lib/content';

/**
 * Coperta. Portretul intră peste literele numelui, procedeul folosit
 * pe copertele de revistă. Numele se desface în cele două laturi
 * pe care Alina însăși le descrie: Alexandra fermă, Alina diafană.
 */
export function Cover() {
  return (
    <section className="cover">
      <Container>
        <div className="cover-folio mono">
          <span>{hero.folioLeft}</span>
          <span>{hero.folioRight}</span>
        </div>

        <h1 className="masthead">
          <span className="sr">{person.fullName}</span>
          <span aria-hidden className="masthead-line">
            {person.firstName}
          </span>
        </h1>

        <Reveal variant="wipe" className="cover-portrait">
          <div className="portrait-slot">
            {hero.portrait ? (
              <img
                src={hero.portrait.src}
                srcSet={hero.portrait.srcSet}
                sizes="(max-width: 760px) 72vw, (max-width: 980px) 42vw, 24vw"
                alt={hero.portrait.alt}
                width={1179}
                height={1557}
                fetchPriority="high"
                decoding="async"
                style={{ objectPosition: hero.portrait.position }}
              />
            ) : (
              <span className="slot-note">{hero.portraitSlot}</span>
            )}
            <div className="sash">
              <span>{hero.sash}</span>
            </div>
          </div>
        </Reveal>

        <p className="masthead" style={{ marginTop: 0 }}>
          <span aria-hidden className="masthead-line second">
            {person.secondName}
          </span>
        </p>

        <div className="cover-meta">
          <Reveal>
            <ul className="coverlines mono">
              {hero.coverlines.map((line) => (
                <li key={line.key}>
                  <b>{line.key}</b> · {line.value}
                </li>
              ))}
            </ul>
          </Reveal>

          <div className="cover-center" />

          <Reveal delay={120} className="cover-actions">
            <p className="lede measure-tight" style={{ margin: 0 }}>
              {hero.lede}
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Button to={hero.primaryCta.path} variant="solid" arrow>
                {hero.primaryCta.label}
              </Button>
              <Button to={hero.secondaryCta.path}>{hero.secondaryCta.label}</Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
