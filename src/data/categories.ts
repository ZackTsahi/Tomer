import type { Category } from '@/types/product';

export const categoryMeta: Record<
  Category,
  { label: string; labelHe: string; description: string; descriptionHe: string; image: string }
> = {
  mala: {
    label: 'Mala Beads',
    labelHe: 'מאלות',
    description: 'Hand-knotted strands of natural gemstone, the studio signature.',
    descriptionHe: 'חוטי אבני חן טבעיות שזורים ביד — חתימת הסטודיו.',
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1200&q=80',
  },
  necklace: {
    label: 'Necklaces',
    labelHe: 'שרשראות',
    description: 'Statement chains and pendants for everyday weight.',
    descriptionHe: 'שרשראות סטייטמנט ותליונים לכובד יומיומי.',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1200&q=80',
  },
  bracelet: {
    label: 'Bracelets',
    labelHe: 'צמידים',
    description: 'Stacked stones and braided cords, finished by hand.',
    descriptionHe: 'אבנים מצורפות וחוטים שזורים, מוגמרים ידנית.',
    image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=1200&q=80',
  },
  ring: {
    label: 'Rings',
    labelHe: 'טבעות',
    description: 'Sculpted bands in oxidized silver and warm gold.',
    descriptionHe: 'טבעות מפוסלות בכסף מחומצן וזהב חם.',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1200&q=80',
  },
  pendant: {
    label: 'Pendants',
    labelHe: 'תליונים',
    description: 'Stones set as singular focal points.',
    descriptionHe: 'אבנים משובצות כנקודת מוקד.',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&q=80',
  },
  earring: {
    label: 'Earrings',
    labelHe: 'עגילים',
    description: 'Subtle metalwork, pierced and hand-finished.',
    descriptionHe: 'עבודת מתכת עדינה, חתוכה וגומרה ביד.',
    image: 'https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?w=1200&q=80',
  },
};

export const categoryOrder: Category[] = [
  'mala',
  'necklace',
  'bracelet',
  'ring',
  'pendant',
  'earring',
];
