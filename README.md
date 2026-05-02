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
│   ├── index.tsx           Home (hero, new releases, categories, stones, story)
│   ├── shop.tsx            Catalog grid + category & stone filters
│   ├── custom.tsx          Bespoke commission flow → WhatsApp / email
│   ├── saved.tsx           Saved pieces (wishlist)
│   └── account.tsx         Contact, about, language toggle
├── product/[slug].tsx      Product detail (gallery, specs, add-to-bag, ask-on-WhatsApp)
├── cart.tsx                Bag (modal) → reserve via WhatsApp
└── about.tsx               Maker story

src/
├── theme/                  Colors, typography (serif + sans), spacing, elevation
├── i18n/                   EN/HE strings + I18nProvider
├── components/             Button, ProductCard, CategoryCard, StoneSwatch, Chip, Eyebrow, SectionHeader
├── data/                   products, categories, stones, contact (WhatsApp / email helpers)
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
so you can produce a downloadable APK from the cloud — no Android SDK needed.

```sh
npm install -g eas-cli           # one time
eas login                        # uses your free Expo account
eas build --platform android --profile preview
```

When the build finishes (~10–15 min), the CLI prints a URL where the APK can
be downloaded and installed on any Android device. The `preview` profile in
`eas.json` is configured to produce an APK (rather than an AAB) so it can be
sideloaded directly.

For a Play Store upload, use the `production` profile instead, which builds
an `.aab`.

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
