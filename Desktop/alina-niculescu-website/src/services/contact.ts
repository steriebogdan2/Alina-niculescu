import { CONTACT_ENDPOINT } from '@/lib/constants';
import type { ContactPayload } from '@/types';

export type SendResult =
  | { ok: true }
  | { ok: false; reason: 'not-configured' | 'network' | 'rejected' };

/**
 * Trimite mesajul din formularul de contact.
 * Setează VITE_CONTACT_ENDPOINT în .env (Formspree, Basin, Web3Forms etc.).
 */
export async function sendContactMessage(payload: ContactPayload): Promise<SendResult> {
  if (!CONTACT_ENDPOINT) return { ok: false, reason: 'not-configured' };

  try {
    const res = await fetch(CONTACT_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    });
    return res.ok ? { ok: true } : { ok: false, reason: 'rejected' };
  } catch {
    return { ok: false, reason: 'network' };
  }
}
