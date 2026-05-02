export type Stone =
  | 'diamond'
  | 'ruby'
  | 'emerald'
  | 'sapphire'
  | 'onyx'
  | 'pinkTourmaline'
  | 'peridot'
  | 'tigerEye'
  | 'turquoise'
  | 'pearl'
  | 'lapis'
  | 'garnet'
  | 'agate';

export type Category =
  | 'engagement'
  | 'ring'
  | 'magenDavid'
  | 'hamsa'
  | 'pendant'
  | 'necklace'
  | 'bracelet'
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
  /**
   * Hero image — either a remote URL string or a local `require(...)` module
   * id (which is a number at runtime). Components resolve at render time.
   */
  image: string | number;
  /** Additional gallery images, same dual-format. */
  gallery?: Array<string | number>;
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
