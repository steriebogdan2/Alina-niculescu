import { PageHeader } from '@/components/layout/PageHeader';
import { Section } from '@/components/layout/Section';
import { usePageMeta } from '@/hooks/usePageMeta';
import { ROUTES } from '@/lib/constants';

export default function PrivacyPage() {
  usePageMeta(
    'Politica de confidențialitate · Alexandra-Alina Niculescu',
    'Informații despre prelucrarea datelor personale trimise prin formularul de contact.',
    ROUTES.privacy,
  );

  return (
    <>
      <PageHeader
        label="Legal"
        lead="Politica de"
        accent="confidențialitate"
        text="Cum sunt folosite datele trimise prin formularul de contact."
      />

      <Section narrow>
        <div className="measure">
          <p style={{ border: '1px solid var(--gold)', padding: 18 }}>
            <strong>Acest text este un schelet.</strong> Înainte de lansare trebuie completat cu
            datele reale ale operatorului și verificat pentru conformitate cu Regulamentul (UE)
            2016/679.
          </p>

          <h2 className="display h3" style={{ marginTop: 48 }}>
            Ce date colectăm
          </h2>
          <p>
            Prin formularul de contact colectăm numele, adresa de email și conținutul mesajului.
            Datele sunt folosite exclusiv pentru a răspunde solicitării.
          </p>

          <h2 className="display h3" style={{ marginTop: 48 }}>
            Cât timp le păstrăm
          </h2>
          <p>Mesajele sunt păstrate cât este necesar pentru corespondență, apoi sunt șterse.</p>

          <h2 className="display h3" style={{ marginTop: 48 }}>
            Drepturile tale
          </h2>
          <p>
            Ai dreptul de acces, rectificare, ștergere, restricționare a prelucrării,
            portabilitate și opoziție. Pentru a le exercita, scrie la adresa de contact.
          </p>

          <h2 className="display h3" style={{ marginTop: 48 }}>
            Cookies
          </h2>
          <p>
            Site-ul nu folosește cookies de urmărire. Dacă se adaugă instrumente de analiză,
            această secțiune trebuie actualizată și trebuie afișat un banner de consimțământ.
          </p>
        </div>
      </Section>
    </>
  );
}
