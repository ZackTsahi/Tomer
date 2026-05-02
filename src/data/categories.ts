import type { Category } from '@/types/product';

// Category list ordered to match what dominates the studio's actual feed:
// Star of David and Hamsa pendants come first (signature category), then
// engagement & cocktail rings, then bracelets and the rest.
export const categoryMeta: Record<
  Category,
  {
    label: string;
    labelHe: string;
    description: string;
    descriptionHe: string;
    image: string;
  }
> = {
  magenDavid: {
    label: 'Star of David',
    labelHe: 'מגן דוד',
    description: 'Diamond pavé and rare gem-set Magen David — the studio signature.',
    descriptionHe: 'מגני דוד משובצי יהלומים ואבני חן — חתימת הסטודיו.',
    image: require('../../assets/instagram/ig-grid-03.jpg'),
  },
  hamsa: {
    label: 'Hamsa',
    labelHe: 'חמסה',
    description: 'Hand-set hamsa pendants with ruby, sapphire, and diamond.',
    descriptionHe: 'תליוני חמסה משובצים יד באודם, ספיר ויהלום.',
    image: require('../../assets/instagram/ig-grid-03.jpg'),
  },
  engagement: {
    label: 'Engagement',
    labelHe: 'אירוסין',
    description: 'Halo, double-halo and pear-cut engagement rings.',
    descriptionHe: 'טבעות אירוסין הילו, הילו כפול וקאט פיר.',
    image: require('../../assets/instagram/ig-grid-04.jpg'),
  },
  ring: {
    label: 'Cocktail Rings',
    labelHe: 'טבעות סטייטמנט',
    description: 'Heavy gold filigree set with sapphire, ruby, and emerald.',
    descriptionHe: 'פיליגרן זהב כבד עם ספיר, אודם ואזמרגד.',
    image: require('../../assets/instagram/ig-grid-04.jpg'),
  },
  bracelet: {
    label: 'Bracelets',
    labelHe: 'צמידים',
    description: 'Black bead bracelets with diamond pendants and stacked thin bands.',
    descriptionHe: 'צמידי חרוזים שחורים עם תליוני יהלומים, וצמידים דקים מוערמים.',
    image: require('../../assets/instagram/ig-grid-06.jpg'),
  },
  necklace: {
    label: 'Necklaces',
    labelHe: 'שרשראות',
    description: 'Layered diamond strands and bold rope chains.',
    descriptionHe: 'שרשראות יהלומים בשכבות וחבלי זהב.',
    image: require('../../assets/instagram/ig-grid-02.jpg'),
  },
  pendant: {
    label: 'Pendants',
    labelHe: 'תליונים',
    description: 'Diamond letter monograms and stone-set focal pieces.',
    descriptionHe: 'אותיות מונוגרם יהלומים וחלקי מוקד משובצי אבן.',
    image: require('../../assets/instagram/ig-grid-05.jpg'),
  },
  earring: {
    label: 'Earrings',
    labelHe: 'עגילים',
    description: 'Diamond drops, halo studs, and waterfall earrings.',
    descriptionHe: 'טיפות יהלום, צמודים הילו, ועגילי מפל.',
    image: require('../../assets/instagram/ig-grid-04.jpg'),
  },
};

export const categoryOrder: Category[] = [
  'magenDavid',
  'hamsa',
  'engagement',
  'ring',
  'bracelet',
  'necklace',
  'pendant',
  'earring',
];
