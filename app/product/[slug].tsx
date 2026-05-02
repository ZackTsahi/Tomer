import React, { useState } from 'react';
import {
  Dimensions,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { Button } from '@/components/Button';
import { Eyebrow } from '@/components/Eyebrow';
import { StoneSwatch } from '@/components/StoneSwatch';
import { getProductBySlug } from '@/data/products';
import { useCart } from '@/state/CartContext';
import { useSaved } from '@/state/SavedContext';
import { useI18n, useT } from '@/i18n/I18nProvider';
import { whatsappLink } from '@/data/contact';
import { formatLength, formatPrice } from '@/utils/format';
import { colors, radius, spacing, typography } from '@/theme';

const HORIZONTAL = Dimensions.get('window').width;

export default function ProductScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const t = useT();
  const { locale } = useI18n();
  const cart = useCart();
  const { isSaved, toggle } = useSaved();
  const [added, setAdded] = useState(false);

  const product = slug ? getProductBySlug(slug) : undefined;

  if (!product) {
    return (
      <View style={[styles.container, { paddingTop: insets.top + spacing.lg }]}>
        <Text style={typography.body}>Not found.</Text>
      </View>
    );
  }

  const gallery = product.gallery?.length ? product.gallery : [product.image];
  const name = locale === 'he' && product.nameHe ? product.nameHe : product.name;
  const description =
    locale === 'he' && product.descriptionHe
      ? product.descriptionHe
      : product.description;
  const saved = isSaved(product.id);

  const handleAdd = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
    cart.add(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleAsk = async () => {
    const msg =
      locale === 'he'
        ? `שלום תומר, אני מתעניין/ת ב${name} (${product.slug}).`
        : `Hi Tomer, I'd like to ask about ${name} (${product.slug}).`;
    const url = whatsappLink(msg);
    const ok = await Linking.canOpenURL(url);
    if (ok) Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 200 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Image gallery */}
        <View style={styles.galleryWrap}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
          >
            {gallery.map((uri, i) => (
              <Image
                key={i}
                source={{ uri }}
                style={{ width: HORIZONTAL, height: HORIZONTAL * 1.2 }}
                contentFit="cover"
              />
            ))}
          </ScrollView>

          {/* Top controls overlay */}
          <View style={[styles.topBar, { paddingTop: insets.top + spacing.sm }]}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={t.common.back}
              onPress={() => router.back()}
              hitSlop={12}
              style={styles.iconButton}
            >
              <Ionicons name="chevron-back" size={22} color={colors.charcoal} />
            </Pressable>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={saved ? t.product.saved : t.product.saveForLater}
              onPress={() => {
                Haptics.selectionAsync().catch(() => {});
                toggle(product.id);
              }}
              hitSlop={12}
              style={styles.iconButton}
            >
              <Ionicons
                name={saved ? 'bookmark' : 'bookmark-outline'}
                size={22}
                color={saved ? colors.gold : colors.charcoal}
              />
            </Pressable>
          </View>
        </View>

        <View style={styles.body}>
          {product.oneOfAKind ? (
            <Text style={[typography.caption, { color: colors.gold, marginBottom: spacing.sm }]}>
              {locale === 'he' ? 'יחיד מסוגו' : 'One of a kind'}
            </Text>
          ) : null}
          <Text style={[typography.h1, { color: colors.charcoal }]}>{name}</Text>
          <Text style={[typography.price, styles.price]}>
            {formatPrice(product.priceUSD, locale)}
          </Text>

          <Text style={[typography.body, styles.description]}>{description}</Text>

          {/* Specs */}
          <View style={styles.specs}>
            <Spec label={t.product.stones}>
              <View style={styles.stoneRow}>
                {product.stones.map((s) => (
                  <StoneSwatch key={s} stone={s} size="md" />
                ))}
              </View>
            </Spec>
            {product.lengthCm ? (
              <Spec label={t.product.length}>
                <Text style={typography.body}>
                  {formatLength(product.lengthCm, locale)}
                </Text>
              </Spec>
            ) : null}
            <Spec label={t.product.metal}>
              <Text style={typography.body}>{metalLabel(product.metal, locale)}</Text>
            </Spec>
          </View>

          {/* Care */}
          <View style={styles.careBlock}>
            <Eyebrow label={t.product.careEyebrow} />
            <Text
              style={[typography.body, { color: colors.textSecondary, marginTop: spacing.sm }]}
            >
              {t.product.careBody}
            </Text>
          </View>

          <Text
            style={[typography.small, { color: colors.textMuted, marginTop: spacing.lg }]}
          >
            {t.product.shippingNote}
          </Text>
        </View>
      </ScrollView>

      {/* Sticky bottom action bar */}
      <View style={[styles.actionBar, { paddingBottom: insets.bottom + spacing.md }]}>
        <Button
          label={added ? t.product.addedToCart : t.product.addToCart}
          variant="primary"
          size="lg"
          onPress={handleAdd}
          fullWidth
          disabled={!!product.soldOut}
          style={{ flex: 1 }}
        />
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={t.product.whatsappCta}
          onPress={handleAsk}
          style={styles.whatsappButton}
        >
          <Ionicons name="logo-whatsapp" size={22} color={colors.parchment} />
        </Pressable>
      </View>
    </View>
  );
}

function Spec({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <View style={styles.specRow}>
      <Text style={[typography.caption, { color: colors.textMuted }]}>{label}</Text>
      <View style={{ marginTop: spacing.xs }}>{children}</View>
    </View>
  );
}

function metalLabel(metal: string, locale: 'en' | 'he') {
  const map: Record<string, { en: string; he: string }> = {
    gold14k: { en: '14k Gold', he: 'זהב 14 קראט' },
    gold18k: { en: '18k Gold', he: 'זהב 18 קראט' },
    silver925: { en: 'Sterling Silver', he: 'כסף 925' },
    oxidizedSilver: { en: 'Oxidized Silver', he: 'כסף מחומצן' },
    mixed: { en: 'Mixed metals', he: 'מתכות משולבות' },
  };
  return map[metal]?.[locale] ?? metal;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.parchment,
  },
  galleryWrap: {
    backgroundColor: colors.cream,
    position: 'relative',
  },
  topBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.base,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(245,240,230,0.95)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    padding: spacing.lg,
  },
  price: {
    color: colors.gold,
    marginTop: spacing.sm,
  },
  description: {
    color: colors.textSecondary,
    marginTop: spacing.lg,
  },
  specs: {
    marginTop: spacing.xl,
    gap: spacing.lg,
    paddingTop: spacing.lg,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
  },
  specRow: {},
  stoneRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  careBlock: {
    marginTop: spacing.xl,
    padding: spacing.lg,
    backgroundColor: colors.cream,
    borderRadius: radius.md,
  },
  actionBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    gap: spacing.sm,
    paddingHorizontal: spacing.base,
    paddingTop: spacing.md,
    backgroundColor: colors.parchment,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
  },
  whatsappButton: {
    width: 56,
    height: 48,
    borderRadius: radius.sm,
    backgroundColor: '#25D366',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
