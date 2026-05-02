// Public contact details for the studio. Pulled from the brand's published
// channels — verify and update before shipping to production.
export const contact = {
  email: 'dahanTomer12@gmail.com',
  // Replace with the studio's verified WhatsApp number (E.164, no spaces).
  whatsappNumber: '+972000000000',
  instagramHandle: 'tomerdahanjewelry',
  instagramUrl: 'https://www.instagram.com/tomerdahanjewelry/',
  studioCity: 'Tel Aviv',
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
