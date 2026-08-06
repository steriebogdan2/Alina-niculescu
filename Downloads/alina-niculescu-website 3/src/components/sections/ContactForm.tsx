import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/Button';
import { useLanguage } from '@/context/LanguageContext';
import { sendContactMessage } from '@/services/contact';
import type { ContactPayload } from '@/types';

type Status = 'idle' | 'sending' | 'sent' | 'error' | 'not-configured';

const EMPTY: ContactPayload = { name: '', email: '', subject: '', message: '' };

export function ContactForm() {
  const { t } = useLanguage();
  const [values, setValues] = useState<ContactPayload>(EMPTY);
  const [status, setStatus] = useState<Status>('idle');

  const update = (key: keyof ContactPayload, value: string) =>
    setValues((prev) => ({ ...prev, [key]: value }));

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('sending');
    const result = await sendContactMessage(values);
    if (result.ok) {
      setStatus('sent');
      setValues(EMPTY);
      return;
    }
    setStatus(result.reason === 'not-configured' ? 'not-configured' : 'error');
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="field">
        <label htmlFor="nume">Numele tău</label>
        <input
          id="nume"
          type="text"
          autoComplete="name"
          required
          value={values.name}
          onChange={(e) => update('name', e.target.value)}
        />
      </div>

      <div className="field">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          required
          value={values.email}
          onChange={(e) => update('email', e.target.value)}
        />
      </div>

      <div className="field">
        <label htmlFor="subiect">Despre ce este vorba</label>
        <input
          id="subiect"
          type="text"
          placeholder="Colaborare, interviu, eveniment…"
          value={values.subject}
          onChange={(e) => update('subject', e.target.value)}
        />
      </div>

      <div className="field">
        <label htmlFor="mesaj">Mesajul</label>
        <textarea
          id="mesaj"
          required
          value={values.message}
          onChange={(e) => update('message', e.target.value)}
        />
      </div>

      <Button type="submit" variant="solid" arrow disabled={status === 'sending'}>
        {status === 'sending' ? t('sending') : t('send')}
      </Button>

      {status === 'sent' && <p className="mono label" style={{ marginTop: 18 }}>{t('sent')}</p>}
      {status === 'error' && <p className="mono label" style={{ marginTop: 18 }}>{t('sendError')}</p>}
      {status === 'not-configured' && (
        <p className="mono label" style={{ marginTop: 18 }}>{t('notConfigured')}</p>
      )}
    </form>
  );
}
