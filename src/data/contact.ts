// Public contact details for the studio, transcribed from the official
// Instagram bio (@tomerdahanjewelry).
export const contact = {
  email: 'dahanTomer12@gmail.com',
  whatsappNumber: '+972548167131',
  landlineNumber: '+972774519989',
  instagramHandle: 'tomerdahanjewelry',
  instagramUrl: 'https://www.instagram.com/tomerdahanjewelry/',
  threadsHandle: 'tomerdahanjewelry',
  threadsUrl: 'https://www.threads.net/@tomerdahanjewelry',
  studioCity: 'Tel Aviv',
  tagline: 'Custom Handmade Jewelry Designer',
  taglineHe: 'מעצב תכשיטים בעבודת יד · בהזמנה אישית',
};

export function whatsappLink(message: string): string {
  const phone = contact.whatsappNumber.replace(/\D/g, '');
  const text = encodeURIComponent(message);
  return `https://wa.me/${phone}?text=${text}`;
}

export function emailLink(subject: string, body = ''): string {
  const s = encodeURIComponent(subject);
  const b = encodeURIComponent(body);
  return `mailto:${contact.email}?subject=${s}&body=${b}`;
}

export function landlineLink(): string {
  return `tel:${contact.landlineNumber.replace(/\s|-/g, '')}`;
}

