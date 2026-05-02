import type { Product } from '@/types/product';

// Mock catalog modeled on Tomer Dahan Jewelry's actual style:
// hand-knotted mala beads with natural gemstones, statement men's pieces,
// many one-of-a-kind. Imagery uses public Unsplash placeholders — replace
// with the studio's own photography in production.

export const products: Product[] = [
  {
    id: 'p-001',
    slug: 'ruby-mala-onyx-anchors',
    name: 'Ruby Mala with Onyx Anchors',
    nameHe: 'מאלת אודם עם אוניקס',
    category: 'mala',
    stones: ['ruby', 'onyx'],
    metal: 'gold14k',
    priceUSD: 890,
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1200&q=80',
      'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=1200&q=80',
    ],
    description:
      'Natural ruby beads hand-knotted on silk, anchored with polished onyx and a 14k gold finishing bead. Worn long, this piece sits at sternum height.',
    lengthCm: 78,
    weightG: 62,
    oneOfAKind: true,
    isFeatured: true,
    isNew: true,
  },
  {
    id: 'p-002',
    slug: 'emerald-strand-mens',
    name: 'Emerald Strand',
    nameHe: 'מחרוזת אזמרגד',
    category: 'mala',
    stones: ['emerald'],
    metal: 'gold18k',
    priceUSD: 1240,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1200&q=80',
    description:
      'Untreated emerald beads graded for warm color saturation. Finished with a hand-formed 18k clasp.',
    lengthCm: 72,
    weightG: 58,
    oneOfAKind: true,
    isFeatured: true,
  },
  {
    id: 'p-003',
    slug: 'sapphire-double-wrap',
    name: 'Sapphire Double Wrap',
    nameHe: 'ספיר כפול',
    category: 'bracelet',
    stones: ['sapphire'],
    metal: 'silver925',
    priceUSD: 420,
    image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=1200&q=80',
    description:
      'Faceted sapphire wrapped twice on the wrist, sterling silver hardware oxidized to a deep tone.',
    lengthCm: 38,
    weightG: 24,
    isNew: true,
  },
  {
    id: 'p-004',
    slug: 'tigers-eye-mala',
    name: "Tiger's Eye Mala",
    nameHe: 'מאלת עין הנמר',
    category: 'mala',
    stones: ['tigerEye', 'onyx'],
    metal: 'gold14k',
    priceUSD: 540,
    image: 'https://images.unsplash.com/photo-1535556261540-c3bae84d2c8d?w=1200&q=80',
    description:
      "Chatoyant tiger's eye in a warm honey-amber tone, broken with smaller onyx markers and a gold finishing bead.",
    lengthCm: 80,
    weightG: 70,
  },
  {
    id: 'p-005',
    slug: 'lapis-statement-necklace',
    name: 'Lapis Statement Necklace',
    nameHe: 'שרשרת לאפיס',
    category: 'necklace',
    stones: ['lapis'],
    metal: 'mixed',
    priceUSD: 760,
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&q=80',
    description:
      'Deep blue lapis lazuli with pyrite flecks, set against alternating gold and oxidized silver spacers.',
    lengthCm: 60,
    weightG: 52,
    oneOfAKind: true,
  },
  {
    id: 'p-006',
    slug: 'garnet-monolith-ring',
    name: 'Garnet Monolith Ring',
    nameHe: 'טבעת גארנט',
    category: 'ring',
    stones: ['garnet'],
    metal: 'oxidizedSilver',
    priceUSD: 320,
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1200&q=80',
    description:
      'A heavy bezel-set garnet on a hand-forged oxidized silver band. Sized to order.',
    weightG: 14,
    isNew: true,
  },
  {
    id: 'p-007',
    slug: 'turquoise-anchor-bracelet',
    name: 'Turquoise Anchor Bracelet',
    nameHe: 'צמיד טורקיז',
    category: 'bracelet',
    stones: ['turquoise', 'onyx'],
    metal: 'silver925',
    priceUSD: 280,
    image: 'https://images.unsplash.com/photo-1551122089-4e3e72477432?w=1200&q=80',
    description:
      'Stabilized turquoise rounds spaced with matte onyx, finished with a hidden magnetic clasp.',
    lengthCm: 19,
    weightG: 18,
  },
  {
    id: 'p-008',
    slug: 'onyx-prayer-strand',
    name: 'Onyx Prayer Strand',
    nameHe: 'מחרוזת אוניקס',
    category: 'mala',
    stones: ['onyx'],
    metal: 'silver925',
    priceUSD: 480,
    image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=1200&q=80',
    description:
      'Matte black onyx, 108 beads — the traditional mala count — with a hand-stamped sterling guru bead.',
    lengthCm: 86,
    weightG: 78,
    isFeatured: true,
  },
  {
    id: 'p-009',
    slug: 'pearl-fragments-pendant',
    name: 'Pearl Fragments Pendant',
    nameHe: 'תליון פנינים',
    category: 'pendant',
    stones: ['pearl'],
    metal: 'gold14k',
    priceUSD: 360,
    image: 'https://images.unsplash.com/photo-1620656798932-902a8a40ce5e?w=1200&q=80',
    description:
      'Baroque pearl fragments suspended from a thin 14k gold chain. Worn close to the collarbone.',
    lengthCm: 45,
    weightG: 8,
  },
  {
    id: 'p-010',
    slug: 'agate-cuff',
    name: 'Banded Agate Cuff',
    nameHe: 'צמיד אגת',
    category: 'bracelet',
    stones: ['agate'],
    metal: 'oxidizedSilver',
    priceUSD: 240,
    image: 'https://images.unsplash.com/photo-1599434979085-3b7eb1308ec7?w=1200&q=80',
    description:
      'Banded agate beads in cocoa and cream tones, strung on a heavy elastic core for daily wear.',
    lengthCm: 18,
    weightG: 22,
  },
  {
    id: 'p-011',
    slug: 'sapphire-signet-ring',
    name: 'Sapphire Signet Ring',
    nameHe: 'טבעת חותם ספיר',
    category: 'ring',
    stones: ['sapphire'],
    metal: 'gold18k',
    priceUSD: 980,
    image: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=1200&q=80',
    description:
      'A flush-set blue sapphire on a wide 18k gold signet face, hand-engraved on request.',
    weightG: 16,
    oneOfAKind: true,
  },
  {
    id: 'p-012',
    slug: 'mixed-stone-mala',
    name: 'Mixed Stone Mala',
    nameHe: 'מאלת אבנים מעורבות',
    category: 'mala',
    stones: ['ruby', 'emerald', 'sapphire'],
    metal: 'gold18k',
    priceUSD: 1680,
    image: 'https://images.unsplash.com/photo-1635767582909-345e0a4cc44a?w=1200&q=80',
    description:
      'A peacock-pattern mala — alternating ruby, emerald and sapphire beads with a hand-hammered 18k bead. The studio centerpiece.',
    lengthCm: 84,
    weightG: 96,
    oneOfAKind: true,
    isFeatured: true,
    isNew: true,
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.isFeatured);
}

export function getNewProducts(): Product[] {
  return products.filter((p) => p.isNew);
}
