// Curated editorial gallery mock data, modeled on the visual feed of
// @tomerdahanjewelry. NOT scraped from Instagram — these are local entries
// that reference imagery already shipped in `assets/instagram/` so the
// gallery looks rich on day one. Replace later with a real CMS / Supabase /
// Firebase / Instagram Graph API source.

import type { Category } from '@/types/product';

export type GalleryFilter = 'all' | Category | 'gemstone' | 'custom' | 'featured';

export type GalleryItem = {
  id: string;
  image: string | number;
  /** Visual aspect ratio (height / width) for masonry layout. */
  aspectRatio: number;
  category: Category;
  /** Extra tags so a single piece can show up under "gemstone" or "custom". */
  tags: Array<'gemstone' | 'custom' | 'featured'>;
  caption: string;
  captionHe: string;
};

export const galleryItems: GalleryItem[] = [
  {
    id: 'g-01',
    image: require('../../assets/instagram/ig-grid-01.jpg'),
    aspectRatio: 1.25,
    category: 'magenDavid',
    tags: ['featured', 'gemstone'],
    caption: 'Diamond pavé Magen David — signature drop.',
    captionHe: 'מגן דוד פאווה יהלומים — חתימת הסטודיו.',
  },
  {
    id: 'g-02',
    image: require('../../assets/instagram/ig-grid-02.jpg'),
    aspectRatio: 1.0,
    category: 'necklace',
    tags: ['gemstone'],
    caption: 'Ruby & sapphire station necklace, 18k gold.',
    captionHe: 'שרשרת תחנות אודם וספיר, זהב 18 קראט.',
  },
  {
    id: 'g-03',
    image: require('../../assets/instagram/ig-grid-03.jpg'),
    aspectRatio: 1.32,
    category: 'hamsa',
    tags: ['featured', 'custom', 'gemstone'],
    caption: 'Hamsa pavé in ruby, sapphire & diamond.',
    captionHe: 'חמסה פאווה באודם, ספיר ויהלום.',
  },
  {
    id: 'g-04',
    image: require('../../assets/instagram/ig-grid-04.jpg'),
    aspectRatio: 1.15,
    category: 'engagement',
    tags: ['featured'],
    caption: 'Cushion double-halo engagement ring.',
    captionHe: 'טבעת אירוסין קושן הילו כפול.',
  },
  {
    id: 'g-05',
    image: require('../../assets/instagram/ig-grid-05.jpg'),
    aspectRatio: 1.0,
    category: 'ring',
    tags: ['gemstone'],
    caption: 'Sapphire filigree cocktail ring.',
    captionHe: 'טבעת סטייטמנט פיליגרן ספיר.',
  },
  {
    id: 'g-06',
    image: require('../../assets/instagram/ig-grid-06.jpg'),
    aspectRatio: 1.4,
    category: 'bracelet',
    tags: ['featured'],
    caption: 'Onyx bead bracelet · diamond bar.',
    captionHe: 'צמיד אוניקס · בר יהלומים.',
  },
  {
    id: 'g-07',
    image: require('../../assets/instagram/ig-grid-07.jpg'),
    aspectRatio: 1.1,
    category: 'pendant',
    tags: ['custom'],
    caption: 'Custom monogram pendant — 14k gold.',
    captionHe: 'תליון מונוגרם בהזמנה — זהב 14 קראט.',
  },
  {
    id: 'g-08',
    image: require('../../assets/instagram/ig-grid-atelier.jpg'),
    aspectRatio: 1.25,
    category: 'ring',
    tags: ['custom', 'featured'],
    caption: 'On the bench — a piece in progress.',
    captionHe: 'על השולחן — עבודה בעיצומה.',
  },
  {
    id: 'g-09',
    image: require('../../assets/instagram/ig-grid-04.jpg'),
    aspectRatio: 0.95,
    category: 'earring',
    tags: ['gemstone'],
    caption: 'Diamond waterfall drops.',
    captionHe: 'עגילי מפל יהלומים.',
  },
  {
    id: 'g-10',
    image: require('../../assets/instagram/ig-grid-05.jpg'),
    aspectRatio: 1.2,
    category: 'necklace',
    tags: ['featured'],
    caption: 'Layered diamond strand with sapphire drops.',
    captionHe: 'שרשרת שכבות עם טיפות ספיר.',
  },
  {
    id: 'g-11',
    image: require('../../assets/instagram/ig-grid-06.jpg'),
    aspectRatio: 1.05,
    category: 'ring',
    tags: ['gemstone'],
    caption: 'Ruby cushion · rose gold filigree.',
    captionHe: 'אודם קושן · פיליגרן זהב ורוד.',
  },
  {
    id: 'g-12',
    image: require('../../assets/instagram/ig-grid-03.jpg'),
    aspectRatio: 1.35,
    category: 'magenDavid',
    tags: ['custom', 'gemstone'],
    caption: 'Multi-stone Magen David — channel set.',
    captionHe: 'מגן דוד רבי-אבנים — שיבוץ תעלות.',
  },
  {
    id: 'g-13',
    image: require('../../assets/instagram/ig-grid-02.jpg'),
    aspectRatio: 1.0,
    category: 'necklace',
    tags: ['gemstone', 'featured'],
    caption: 'Bold rope chain in 18k gold.',
    captionHe: 'שרשרת חבל מאסיבית בזהב 18 קראט.',
  },
  {
    id: 'g-14',
    image: require('../../assets/instagram/ig-grid-01.jpg'),
    aspectRatio: 1.18,
    category: 'pendant',
    tags: ['custom'],
    caption: 'Hand-set focal piece, made on commission.',
    captionHe: 'חלק מוקד בעבודת יד, בהזמנה אישית.',
  },
  {
    id: 'g-15',
    image: require('../../assets/instagram/ig-grid-07.jpg'),
    aspectRatio: 1.45,
    category: 'bracelet',
    tags: ['gemstone'],
    caption: 'Stacked thin bands — sapphire & diamond pavé.',
    captionHe: 'בנדים דקים מוערמים — פאווה ספיר ויהלום.',
  },
];

export const galleryFilters: { id: GalleryFilter; label: string; labelHe: string }[] = [
  { id: 'all', label: 'All', labelHe: 'הכל' },
  { id: 'featured', label: 'Featured', labelHe: 'מובחרים' },
  { id: 'magenDavid', label: 'Star of David', labelHe: 'מגן דוד' },
  { id: 'hamsa', label: 'Hamsa', labelHe: 'חמסה' },
  { id: 'ring', label: 'Rings', labelHe: 'טבעות' },
  { id: 'necklace', label: 'Necklaces', labelHe: 'שרשראות' },
  { id: 'bracelet', label: 'Bracelets', labelHe: 'צמידים' },
  { id: 'pendant', label: 'Pendants', labelHe: 'תליונים' },
  { id: 'earring', label: 'Earrings', labelHe: 'עגילים' },
  { id: 'engagement', label: 'Engagement', labelHe: 'אירוסין' },
  { id: 'gemstone', label: 'Gemstone', labelHe: 'אבני חן' },
  { id: 'custom', label: 'Custom', labelHe: 'בהזמנה' },
];

export function filterGallery(items: GalleryItem[], filter: GalleryFilter): GalleryItem[] {
  if (filter === 'all') return items;
  if (filter === 'gemstone' || filter === 'custom' || filter === 'featured') {
    return items.filter((g) => g.tags.includes(filter));
  }
  return items.filter((g) => g.category === filter);
}
