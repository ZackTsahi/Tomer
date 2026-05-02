export type Stone =
  | 'ruby'
  | 'emerald'
  | 'sapphire'
  | 'onyx'
  | 'tigerEye'
  | 'turquoise'
  | 'pearl'
  | 'lapis'
  | 'garnet'
  | 'agate';

export type Category =
  | 'mala'
  | 'necklace'
  | 'bracelet'
  | 'ring'
  | 'pendant'
  | 'earring';

export type Metal = 'gold14k' | 'gold18k' | 'silver925' | 'oxidizedSilver' | 'mixed';

export type Product = {
  id: string;
  slug: string;
  name: string;
  nameHe?: string;
  category: Category;
  stones: Stone[];
  metal: Metal;
  /** Price in USD; we display in user's selected currency at render time. */
  priceUSD: number;
  /** Single hero image (remote URL). Replace with the studio's real assets. */
  image: string;
  /** Additional gallery images. */
  gallery?: string[];
  description: string;
  descriptionHe?: string;
  lengthCm?: number;
  weightG?: number;
  /** True for one-of-a-kind pieces (very common at this atelier). */
  oneOfAKind?: boolean;
  /** Surfaced on Home as "new this month". */
  isNew?: boolean;
  /** Surfaced as headline pieces. */
  isFeatured?: boolean;
  /** True when the piece is sold but kept in the catalog for inspiration. */
  soldOut?: boolean;
};
