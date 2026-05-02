import type { Locale } from '@/i18n/strings';

export function formatPrice(usd: number, locale: Locale): string {
  if (locale === 'he') {
    // Approximate ILS conversion for display only — replace with live FX in prod.
    const ils = Math.round(usd * 3.7);
    return `₪${ils.toLocaleString('he-IL')}`;
  }
  return `$${usd.toLocaleString('en-US')}`;
}

export function formatLength(cm: number, locale: Locale): string {
  if (locale === 'he') return `${cm} ס"מ`;
  return `${cm} cm`;
}
