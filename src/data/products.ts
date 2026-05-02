import type { Product } from '@/types/product';

// Catalog modeled directly on @tomerdahanjewelry's feed:
// gold-filigree statement rings, diamond pavé Magen David and Hamsa pendants,
// halo engagement rings, black-bead bracelets with diamond charms, and
// layered diamond necklaces. Almost every piece is one of a kind.
//
// Imagery currently points at the saved Instagram grid screenshots in
// `assets/instagram/` — these read as a brand mood, not single-product hero
// shots. To swap each row to a single-piece photograph, replace the `image`
// field below with `require('../../assets/products/[slug].jpg')`.

export const products: Product[] = [
  // ========================================================================
  // STAR OF DAVID — signature
  // ========================================================================
  {
    id: 'p-md-01',
    slug: 'magen-david-diamond-pave-rope',
    name: 'Diamond Pavé Magen David',
    nameHe: 'מגן דוד פאווה יהלומים',
    category: 'magenDavid',
    stones: ['diamond'],
    metal: 'gold18k',
    priceUSD: 2480,
    image: require('../../assets/instagram/ig-grid-05.jpg'),
    description:
      'A two-layer Star of David in 18k gold, pavé-set with full-cut diamonds and suspended on a heavy rope chain. Hand-finished in the Tel Aviv studio.',
    descriptionHe:
      'מגן דוד דו-שכבתי בזהב 18 קראט, משובץ פאווה ביהלומים מלאים, על שרשרת חבל כבדה. מוגמר ביד בסטודיו בתל אביב.',
    weightG: 14,
    oneOfAKind: true,
    isFeatured: true,
    isNew: true,
  },
  {
    id: 'p-md-02',
    slug: 'magen-david-emerald-center',
    name: 'Magen David · Emerald Center',
    nameHe: 'מגן דוד · אזמרגד מרכזי',
    category: 'magenDavid',
    stones: ['emerald', 'diamond'],
    metal: 'gold18k',
    priceUSD: 1980,
    image: require('../../assets/instagram/ig-grid-03.jpg'),
    description:
      'Brushed 18k gold star with a princess-cut emerald centered between corners set with single round diamonds.',
    descriptionHe:
      'מגן דוד מזהב 18 קראט בגימור מוברש, עם אזמרגד פרינסס מרכזי וקודקודים משובצים יהלומים בודדים.',
    oneOfAKind: true,
    isFeatured: true,
  },
  {
    id: 'p-md-03',
    slug: 'magen-david-multi-stone',
    name: 'Multi-Stone Magen David',
    nameHe: 'מגן דוד רבי-אבנים',
    category: 'magenDavid',
    stones: ['ruby', 'sapphire', 'diamond'],
    metal: 'gold18k',
    priceUSD: 3240,
    image: require('../../assets/instagram/ig-grid-03.jpg'),
    description:
      'Layered Star of David channel-set with alternating ruby, sapphire, and diamond. The most ornate piece in the line.',
    descriptionHe:
      'מגן דוד שכבתי משובץ בתעלות אודם, ספיר ויהלום לסירוגין. הפריט המעוטר ביותר בקולקציה.',
    oneOfAKind: true,
    isFeatured: true,
    isNew: true,
  },

  // ========================================================================
  // HAMSA
  // ========================================================================
  {
    id: 'p-hm-01',
    slug: 'hamsa-pave-ruby-sapphire',
    name: 'Hamsa · Ruby & Sapphire Pavé',
    nameHe: 'חמסה · פאווה אודם וספיר',
    category: 'hamsa',
    stones: ['ruby', 'sapphire', 'diamond'],
    metal: 'gold18k',
    priceUSD: 2180,
    image: require('../../assets/instagram/ig-grid-03.jpg'),
    description:
      'Open-palm hamsa pavé-set with rubies, sapphires and a diamond eye, on an 18k gold link chain. Made on commission.',
    descriptionHe:
      'חמסה כף יד פתוחה, משובצת פאווה באודם וספיר עם עין יהלום, על שרשרת חוליות מזהב 18 קראט.',
    oneOfAKind: true,
    isNew: true,
  },

  // ========================================================================
  // ENGAGEMENT
  // ========================================================================
  {
    id: 'p-en-01',
    slug: 'cushion-double-halo',
    name: 'Cushion Double-Halo Ring',
    nameHe: 'טבעת קושן הילו כפול',
    category: 'engagement',
    stones: ['diamond'],
    metal: 'gold18k',
    priceUSD: 6800,
    image: require('../../assets/instagram/ig-grid-04.jpg'),
    description:
      'A central cushion-cut diamond surrounded by two concentric halos of brilliant pavé. Engraved gallery, four-claw setting.',
    descriptionHe:
      'יהלום קושן מרכזי מוקף שני הילו מבריקים של פאווה. גלריה חרוטה, ארבע ציפורניים.',
    weightG: 7,
    oneOfAKind: true,
    isFeatured: true,
  },
  {
    id: 'p-en-02',
    slug: 'pear-halo-engagement',
    name: 'Pear-Cut Halo Engagement',
    nameHe: 'טבעת אירוסין פיר הילו',
    category: 'engagement',
    stones: ['diamond'],
    metal: 'gold18k',
    priceUSD: 5400,
    image: require('../../assets/instagram/ig-grid-05.jpg'),
    description:
      'Pear-cut centre stone with a tapered diamond halo. Pavé band continues two-thirds around the finger.',
    descriptionHe:
      'יהלום פיר מרכזי עם הילו יהלומים מתחדד. פס פאווה ממשיך שני שלישים סביב האצבע.',
    isNew: true,
  },

  // ========================================================================
  // COCKTAIL RINGS
  // ========================================================================
  {
    id: 'p-rg-01',
    slug: 'sapphire-filigree-cocktail',
    name: 'Sapphire Filigree Cocktail Ring',
    nameHe: 'טבעת סטייטמנט פיליגרן ספיר',
    category: 'ring',
    stones: ['sapphire', 'diamond'],
    metal: 'gold18k',
    priceUSD: 3680,
    image: require('../../assets/instagram/ig-grid-04.jpg'),
    description:
      'A heavy oval blue sapphire bezel-set in deeply carved 18k gold filigree, accented with diamond shoulders. Unisex sizing.',
    descriptionHe:
      'ספיר כחול אובלי כבד, משובץ בזל בפיליגרן זהב 18 קראט מגולף עמוק, עם כתפי יהלום. מידות יוניסקס.',
    weightG: 18,
    oneOfAKind: true,
    isFeatured: true,
  },
  {
    id: 'p-rg-02',
    slug: 'ruby-cushion-rose-gold',
    name: 'Ruby Cushion · Rose Gold',
    nameHe: 'אודם קושן · זהב ורוד',
    category: 'ring',
    stones: ['ruby', 'diamond'],
    metal: 'gold18k',
    priceUSD: 2960,
    image: require('../../assets/instagram/ig-grid-06.jpg'),
    description:
      'A vivid ruby cushion in rose-gold filigree, surrounded by alternating ruby and diamond accents. Carved gallery on every side.',
    descriptionHe:
      'אודם קושן עז בפיליגרן זהב ורוד, מוקף אקסנטים מתחלפים של אודם ויהלום. גלריה מגולפת בכל צד.',
    oneOfAKind: true,
    isFeatured: true,
    isNew: true,
  },
  {
    id: 'p-rg-03',
    slug: 'pink-tourmaline-pear',
    name: 'Pink Tourmaline Pear',
    nameHe: 'טורמלין ורוד פיר',
    category: 'ring',
    stones: ['pinkTourmaline', 'diamond'],
    metal: 'gold18k',
    priceUSD: 1680,
    image: require('../../assets/instagram/ig-grid-05.jpg'),
    description:
      'A natural pink tourmaline pear bezel-set on a polished 18k band with two side diamonds.',
    descriptionHe:
      'טורמלין ורוד טבעי בחיתוך פיר, משובץ בזל על פס זהב 18 מצוחצח עם שני יהלומי צד.',
  },
  {
    id: 'p-rg-04',
    slug: 'peridot-halo',
    name: 'Peridot Halo Ring',
    nameHe: 'טבעת פרידוט הילו',
    category: 'ring',
    stones: ['peridot', 'diamond'],
    metal: 'gold14k',
    priceUSD: 1240,
    image: require('../../assets/instagram/ig-grid-05.jpg'),
    description:
      'A large pear-cut peridot centred in a brilliant diamond halo on a yellow-gold band.',
    descriptionHe:
      'פרידוט פיר גדול מרכזי בהילו יהלומים מבריק על פס זהב צהוב.',
  },
  {
    id: 'p-rg-05',
    slug: 'gold-eternity-band',
    name: 'Diamond Eternity Band',
    nameHe: 'טבעת נצח יהלומים',
    category: 'ring',
    stones: ['diamond'],
    metal: 'gold18k',
    priceUSD: 1480,
    image: require('../../assets/instagram/ig-grid-04.jpg'),
    description:
      'A full-circle eternity band in 18k gold, channel-set with round brilliants. Stack with engagement or cocktail.',
    descriptionHe:
      'טבעת נצח מלאה מזהב 18 קראט, משובצת בתעלות יהלומים מבריקים. ערמו עם אירוסין או סטייטמנט.',
  },

  // ========================================================================
  // BRACELETS
  // ========================================================================
  {
    id: 'p-br-01',
    slug: 'onyx-bead-diamond-bar',
    name: 'Onyx Bead Bracelet · Diamond Bar',
    nameHe: 'צמיד אוניקס · בר יהלומים',
    category: 'bracelet',
    stones: ['onyx', 'diamond'],
    metal: 'gold18k',
    priceUSD: 1680,
    image: require('../../assets/instagram/ig-grid-06.jpg'),
    description:
      'A triple strand of polished black onyx beads anchored to a pavé diamond bar in 18k gold. The studio\'s signature masculine piece.',
    descriptionHe:
      'שלוש שורות חרוזי אוניקס שחורים מצוחצחים, מחוברות לבר יהלומי פאווה בזהב 18 קראט. הפריט הגברי החתום של הסטודיו.',
    lengthCm: 19,
    oneOfAKind: true,
    isFeatured: true,
    isNew: true,
  },
  {
    id: 'p-br-02',
    slug: 'stacked-three-bands',
    name: 'Three-Band Stack',
    nameHe: 'שלישיית צמידי בנדים',
    category: 'bracelet',
    stones: ['sapphire', 'diamond'],
    metal: 'mixed',
    priceUSD: 1240,
    image: require('../../assets/instagram/ig-grid-03.jpg'),
    description:
      'A trio of paper-thin bangles: blue sapphire pavé, black diamond pavé, and a hand-formed knot in polished gold.',
    descriptionHe:
      'שלישיה של צמידים דקיקים: ספיר כחול פאווה, יהלום שחור פאווה, וקשר עבודת יד בזהב מצוחצח.',
    lengthCm: 18,
    oneOfAKind: true,
  },

  // ========================================================================
  // NECKLACES
  // ========================================================================
  {
    id: 'p-nk-01',
    slug: 'layered-diamond-sapphire-drop',
    name: 'Layered Diamond Necklace · Sapphire Drops',
    nameHe: 'שרשרת שכבות · טיפות ספיר',
    category: 'necklace',
    stones: ['diamond', 'sapphire'],
    metal: 'gold14k',
    priceUSD: 1860,
    image: require('../../assets/instagram/ig-grid-05.jpg'),
    description:
      'Two strands of fine 14k chain — one set with full-cut diamonds, the other terminated in a single sapphire drop. Sits along the collarbone.',
    descriptionHe:
      'שתי שרשראות זהב 14 קראט — אחת משובצת יהלומים מלאים, השנייה מסתיימת בטיפת ספיר בודדת. יושבת על עצם הבריח.',
    lengthCm: 42,
    isFeatured: true,
  },
  {
    id: 'p-nk-02',
    slug: 'ruby-sapphire-station',
    name: 'Ruby & Sapphire Station',
    nameHe: 'שרשרת תחנות אודם וספיר',
    category: 'necklace',
    stones: ['ruby', 'sapphire'],
    metal: 'gold18k',
    priceUSD: 2280,
    image: require('../../assets/instagram/ig-grid-02.jpg'),
    description:
      'Alternating ruby and sapphire stations along a delicate 18k chain, gradient-set towards a centre cluster.',
    descriptionHe:
      'תחנות אודם וספיר לסירוגין לאורך שרשרת זהב 18 קראט עדינה, משובצות בגרדיאנט לעבר אשכול מרכזי.',
    lengthCm: 44,
    oneOfAKind: true,
  },
  {
    id: 'p-nk-03',
    slug: 'rose-gold-circle',
    name: 'Diamond Circle · Rose Gold',
    nameHe: 'מעגל יהלומים · זהב ורוד',
    category: 'necklace',
    stones: ['diamond'],
    metal: 'gold18k',
    priceUSD: 1380,
    image: require('../../assets/instagram/ig-grid-06.jpg'),
    description:
      'An open circle of pavé diamonds in rose gold, suspended on a fine cable chain.',
    descriptionHe:
      'מעגל פתוח של יהלומי פאווה בזהב ורוד, על שרשרת כבל עדינה.',
    lengthCm: 42,
  },

  // ========================================================================
  // PENDANTS
  // ========================================================================
  {
    id: 'p-pd-01',
    slug: 'initial-letter-pendant',
    name: 'Initial Letter Pendant',
    nameHe: 'תליון אות אישית',
    category: 'pendant',
    stones: ['diamond'],
    metal: 'gold14k',
    priceUSD: 980,
    image: require('../../assets/instagram/ig-grid-04.jpg'),
    description:
      'Custom diamond-set initial in 14k gold — choose any letter, gold colour and chain length. Made to order.',
    descriptionHe:
      'אות אישית משובצת יהלומים בזהב 14 קראט — בחרו אות, גוון זהב ואורך שרשרת. בהזמנה אישית.',
    isNew: true,
  },
  {
    id: 'p-pd-02',
    slug: 'gold-feather-ruby',
    name: 'Gold Feather · Ruby',
    nameHe: 'נוצת זהב · אודם',
    category: 'pendant',
    stones: ['ruby', 'diamond'],
    metal: 'gold18k',
    priceUSD: 1240,
    image: require('../../assets/instagram/ig-grid-03.jpg'),
    description:
      'A long, articulated gold feather pendant with a single ruby cabochon at the spine.',
    descriptionHe:
      'תליון נוצת זהב ארוכה ומפרקית, עם קבושון אודם בודד לאורך הציר.',
    oneOfAKind: true,
  },

  // ========================================================================
  // EARRINGS
  // ========================================================================
  {
    id: 'p-er-01',
    slug: 'diamond-waterfall-drops',
    name: 'Diamond Waterfall Drops',
    nameHe: 'עגילי מפל יהלומים',
    category: 'earring',
    stones: ['diamond'],
    metal: 'gold18k',
    priceUSD: 2840,
    image: require('../../assets/instagram/ig-grid-04.jpg'),
    description:
      'A graduated cascade of round diamonds finishing in a teardrop, pierced post fitting.',
    descriptionHe:
      'מפל מדורג של יהלומים עגולים המסתיים בטיפה. סוגר חור.',
    oneOfAKind: true,
    isNew: true,
  },
  {
    id: 'p-er-02',
    slug: 'rose-gold-halo-studs',
    name: 'Rose Gold Halo Studs',
    nameHe: 'צמודים הילו זהב ורוד',
    category: 'earring',
    stones: ['diamond'],
    metal: 'gold18k',
    priceUSD: 1420,
    image: require('../../assets/instagram/ig-grid-05.jpg'),
    description:
      'A round centre stone in a brilliant halo, set in 18k rose gold. Sits flush to the lobe.',
    descriptionHe:
      'יהלום מרכזי עגול בהילו מבריק, בזהב 18 ורוד. יושבים צמוד לתנוך.',
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
