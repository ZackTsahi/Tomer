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

```sh
npm install
# Add the five TTF font files into assets/fonts/ (see assets/fonts/README.md)
# Add icon.png, splash.png, adaptive-icon.png, favicon.png into assets/
npx expo start
```

Press `i` for iOS Simulator or `a` for Android.

## Before shipping

1. **Replace product imagery.** `src/data/products.ts` uses Unsplash
   placeholders. Swap in the studio's own photography (CDN or local imports).
2. **Verify contact details.** Update `whatsappNumber` in `src/data/contact.ts`
   with the studio's actual E.164 number — the rest is filled from public info.
3. **Replace mock catalog** with the studio's real SKUs, prices, lengths and
   descriptions in EN + HE.
4. **Live FX**, taxes, shipping. Pricing currently shows USD or an approximate
   ILS conversion in `src/utils/format.ts`.
5. **Persist cart & wishlist.** The contexts are in-memory only; wire to
   `AsyncStorage` or a backend before launch.
6. **Hook up checkout.** Today's "checkout" composes a WhatsApp message; this
   matches how the brand currently transacts. To accept cards in-app, integrate
   Stripe or a Shopify storefront.
