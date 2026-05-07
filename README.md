# Tomer Dahan Jewelry — React Native app

A native iOS/Android storefront for **Tomer Dahan Jewelry**
([@tomerdahanjewelry](https://www.instagram.com/tomerdahanjewelry/)) — a Tel
Aviv atelier producing handmade statement pieces: mala-style bead necklaces in
ruby, emerald, sapphire and onyx, finished with hand-formed gold and oxidized
silver, often one-of-a-kind.

Built with **Expo + expo-router + TypeScript**.

## Why these choices

The app is shaped around the brand's actual selling motion:

- **Custom orders are first-class.** The brand sells primarily through DM and
  WhatsApp, so every product page and the standalone *Custom* tab funnel into
  WhatsApp / email with a pre-composed message, instead of pretending to be a
  fully transactional checkout.
- **Stones and metals are surfaced as primary filters**, not afterthoughts,
  because that's how customers shop the catalog.
- **One-of-a-kind labeling** lives on the cards and the product page, since
  most pieces are unique strands.
- **Bilingual EN / HE** with RTL-aware components — the audience is Israeli
  and international.
- **Editorial visual treatment** (serif display + sans body, ivory + charcoal +
  brushed gold + gemstone accents) to match the gallery feel of the Instagram.

## Architecture

```
app/                        expo-router file-based routes
├── _layout.tsx             Root providers (i18n, cart, saved) + Stack
├── (tabs)/
│   ├── _layout.tsx         Bottom tabs
│   ├── index.tsx           Home (hero, new releases, categories, stones, gallery, story)
│   ├── shop.tsx            Catalog grid + category & stone filters
│   ├── gallery.tsx         Editorial masonry feed with category / theme filters
│   ├── custom.tsx          Bespoke commission flow → WhatsApp / email
│   ├── saved.tsx           Saved pieces (wishlist, reachable from Account)
│   └── account.tsx         Contact entry, about, language toggle, saved
├── product/[slug].tsx      Product detail (gallery, specs, add-to-bag, ask-on-WhatsApp)
├── cart.tsx                Bag (modal) → reserve via WhatsApp
├── contact.tsx             Studio contact tiles — WhatsApp, email, Instagram, phone
└── about.tsx               Maker story

src/
├── theme/                  Colors, typography (serif + sans), spacing, elevation
├── i18n/                   EN/HE strings + I18nProvider
├── components/             Button (alias: LuxuryButton), AppHeader, SectionHeader,
│                           ProductCard, GalleryCard, CategoryCard, StoneSwatch, Chip, Eyebrow
├── data/                   products, gallery, categories, stones, contact (WhatsApp / email helpers)
├── state/                  CartContext, SavedContext (in-memory, easy to swap for AsyncStorage / server)
├── types/                  Product domain types
└── utils/                  Currency / length formatting
```

## Getting started

You need [Node.js 18+](https://nodejs.org/) installed.

```sh
npm install
npx expo start
```

Then either:

- **On your phone (easiest):** install [Expo Go](https://expo.dev/go) (App
  Store / Play Store), make sure your phone is on the same Wi-Fi as your
  computer, and scan the QR code shown in the terminal.
- **iOS Simulator** (macOS only, needs Xcode): press `i` in the terminal.
- **Android Emulator** (needs Android Studio): press `a`.
- **Web preview:** press `w`.

Fonts (Playfair Display + Inter) are loaded automatically from
`@expo-google-fonts/*` — no manual setup needed.

## Build an Android APK

The repo is configured for [EAS Build](https://docs.expo.dev/build/introduction/)
so you can produce a downloadable APK from the cloud — no Android SDK or
Java toolchain needed locally.

`eas.json` ships three profiles:

| Profile       | Output       | Use it for                                  |
| ------------- | ------------ | ------------------------------------------- |
| `preview`     | **APK**      | Sideload onto any Android phone for review. |
| `production`  | `.aab`       | Google Play Store upload.                   |
| `development` | APK (devClient) | Local Expo Dev Client builds.            |

### One-time setup

```sh
npm install -g eas-cli   # global CLI
eas login                # uses your free Expo account
```

If this is the first build for the project, also run `eas init` once so EAS
links the local `app.json` to a project on your Expo account.

### Generate an installable APK

```sh
# from the repo root
npm install                # make sure deps are in sync
npx tsc --noEmit           # sanity check (no errors)
npx expo-doctor            # confirm SDK / dependency alignment
eas build -p android --profile preview
```

EAS uploads the project, runs the build on its cloud workers (~10–15 min on
the free tier), then prints a URL where the `.apk` file can be downloaded.
Transfer it to an Android device and install it directly — Play Store not
required.

### Build for the Play Store

```sh
eas build -p android --profile production
```

This produces an Android App Bundle (`.aab`) suitable for the Play Console.

## Data layer

The app ships with two curated mock datasets so it looks rich on day one,
with no Instagram scraping at runtime:

- `src/data/products.ts` — product SKUs (rings, necklaces, bracelets, pendants,
  Magen David, hamsa, engagement, earrings) including stones, metal, price,
  bilingual name + description, and one-of-a-kind / featured flags.
- `src/data/gallery.ts` — editorial gallery entries with masonry-friendly
  aspect ratios, bilingual captions, and theme tags (`featured`, `gemstone`,
  `custom`) that drive the Gallery screen's filter chips.

Both modules expose plain functions (`getFeaturedProducts`, `filterGallery`,
etc.) so swapping the source to a CMS, Supabase, Firebase or the Instagram
Graph API is a one-file change.

## Before shipping

1. **Replace product imagery.** `src/data/products.ts` uses Unsplash
   placeholders. Swap in the studio's own photography (CDN or local imports).
2. **Replace mock catalog** with the studio's real SKUs, prices, lengths and
   descriptions in EN + HE.
3. **Add brand assets** (`assets/icon.png`, `splash.png`, `adaptive-icon.png`,
   `favicon.png`) and re-add the references in `app.json`.
4. **Live FX**, taxes, shipping. Pricing currently shows USD or an approximate
   ILS conversion in `src/utils/format.ts`.
5. **Persist cart & wishlist.** The contexts are in-memory only; wire to
   `AsyncStorage` or a backend before launch.
6. **Hook up checkout.** Today's "checkout" composes a WhatsApp message to
   `+972-54-8167131`; this matches how the brand currently transacts. To
   accept cards in-app, integrate Stripe or a Shopify storefront.
