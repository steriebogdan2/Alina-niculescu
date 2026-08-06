import { PageHeader } from '@/components/layout/PageHeader';
import { Section } from '@/components/layout/Section';
import { ContactForm } from '@/components/sections/ContactForm';
import { ContactChannels } from '@/components/sections/ContactChannels';
import { usePageMeta } from '@/hooks/usePageMeta';
import { ROUTES } from '@/lib/constants';

export default function ContactPage() {
  usePageMeta(
    'Contact · Alexandra-Alina Niculescu',
    'Contact pentru colaborări, invitații la evenimente, interviuri și solicitări din partea redacțiilor.',
    ROUTES.contact,
  );

  return (
    <>
      <PageHeader
        label="Contact"
        lead="Scrie-mi"
        accent="direct"
        text="Colaborări cu branduri, invitații la evenimente, interviuri și solicitări din partea redacțiilor."
      />

      <Section>
        <div className="form-grid">
          <ContactForm />
          <ContactChannels />
        </div>
      </Section>
    </>
  );
}
