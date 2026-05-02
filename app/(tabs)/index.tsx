import React from 'react';
import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@/components/Button';
import { Eyebrow } from '@/components/Eyebrow';
import { ProductCard } from '@/components/ProductCard';
import { CategoryCard } from '@/components/CategoryCard';
import { StoneSwatch } from '@/components/StoneSwatch';
import { useT } from '@/i18n/I18nProvider';
import { useCart } from '@/state/CartContext';
import { getFeaturedProducts, getNewProducts } from '@/data/products';
import { categoryOrder } from '@/data/categories';
import { allStones } from '@/data/stones';
import { colors, spacing, typography } from '@/theme';

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1612207453817-2c540ec97f80?w=1600&q=85';

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const t = useT();
  const cart = useCart();
  const featured = getFeaturedProducts();
  const fresh = getNewProducts();
  const screenWidth = Dimensions.get('window').width;
  const cardWidth = (screenWidth - spacing.base * 2 - spacing.md) / 2;

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={{ paddingBottom: 120 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Hero */}
      <View style={styles.hero}>
        <Image source={{ uri: HERO_IMAGE }} style={StyleSheet.absoluteFill} contentFit="cover" />
        <LinearGradient
          colors={['rgba(14,12,10,0.15)', 'rgba(14,12,10,0.85)']}
          style={StyleSheet.absoluteFill}
        />

        <View style={[styles.topBar, { paddingTop: insets.top + spacing.sm }]}>
          <Text style={[typography.caption, { color: colors.parchment, letterSpacing: 2.4 }]}>
            {t.brand.toUpperCase()}
          </Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Bag"
            onPress={() => router.push('/cart')}
            hitSlop={12}
            style={styles.bagButton}
          >
            <Ionicons name="bag-handle-outline" size={22} color={colors.parchment} />
            {cart.count > 0 ? (
              <View style={styles.bagBadge}>
                <Text style={[typography.caption, { color: colors.charcoal, letterSpacing: 0 }]}>
                  {cart.count}
                </Text>
              </View>
            ) : null}
          </Pressable>
        </View>

        <View style={styles.heroContent}>
          <Eyebrow label={t.home.heroEyebrow} variant="light" />
          <Text style={[typography.display, styles.heroTitle]}>{t.home.heroTitle}</Text>
          <Text style={[typography.body, styles.heroSubtitle]}>
            {t.home.heroSubtitle}
          </Text>
          <Button
            label={t.home.shopCta}
            variant="gold"
            size="lg"
            onPress={() => router.push('/(tabs)/shop')}
            style={{ marginTop: spacing.lg, alignSelf: 'flex-start' }}
          />
        </View>
      </View>

      {/* New this month */}
      <View style={styles.section}>
        <View style={styles.sectionHead}>
          <Eyebrow label={t.home.featuredEyebrow} />
          <Text style={[typography.h2, styles.sectionTitle]}>{t.home.featuredTitle}</Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizScroll}
        >
          {fresh.map((p) => (
            <View key={p.id} style={{ width: cardWidth, marginRight: spacing.md }}>
              <ProductCard product={p} width={cardWidth} />
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Categories */}
      <View style={styles.section}>
        <View style={styles.sectionHead}>
          <Eyebrow label={t.home.categoriesEyebrow} />
          <Text style={[typography.h2, styles.sectionTitle]}>{t.home.categoriesTitle}</Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizScroll}
        >
          {categoryOrder.map((cat) => (
            <View key={cat} style={{ width: cardWidth, marginRight: spacing.md }}>
              <CategoryCard category={cat} width={cardWidth} />
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Stones */}
      <View style={styles.section}>
        <View style={styles.sectionHead}>
          <Eyebrow label={t.home.stonesEyebrow} />
          <Text style={[typography.h2, styles.sectionTitle]}>{t.home.stonesTitle}</Text>
        </View>
        <View style={styles.stonesWrap}>
          {allStones.map((s) => (
            <StoneSwatch
              key={s}
              stone={s}
              size="md"
              onPress={() =>
                router.push({ pathname: '/(tabs)/shop', params: { stone: s } })
              }
            />
          ))}
        </View>
      </View>

      {/* Featured editorial */}
      <View style={[styles.section, { paddingHorizontal: 0 }]}>
        {featured[0] ? (
          <View style={{ paddingHorizontal: spacing.base }}>
            <ProductCard product={featured[0]} large />
          </View>
        ) : null}
      </View>

      {/* Bespoke / custom */}
      <View style={styles.bespoke}>
        <Eyebrow label={t.home.customEyebrow} variant="light" />
        <Text style={[typography.h1, { color: colors.parchment, marginTop: spacing.sm }]}>
          {t.home.customTitle}
        </Text>
        <Text
          style={[
            typography.body,
            { color: colors.parchment, marginTop: spacing.md, opacity: 0.85 },
          ]}
        >
          {t.home.customBody}
        </Text>
        <Button
          label={t.home.customCta}
          variant="gold"
          size="lg"
          onPress={() => router.push('/(tabs)/custom')}
          style={{ marginTop: spacing.xl, alignSelf: 'flex-start' }}
        />
      </View>

      {/* Maker story */}
      <View style={styles.section}>
        <Eyebrow label={t.home.storyEyebrow} />
        <Text style={[typography.h1, { color: colors.charcoal, marginTop: spacing.sm }]}>
          {t.home.storyTitle}
        </Text>
        <Text
          style={[
            typography.body,
            { color: colors.textSecondary, marginTop: spacing.md },
          ]}
        >
          {t.home.storyBody}
        </Text>
        <Pressable
          accessibilityRole="button"
          onPress={() => router.push('/about')}
          style={{ marginTop: spacing.lg }}
        >
          <Text
            style={[
              typography.button,
              { color: colors.gold },
            ]}
          >
            {t.common.readMore}  →
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: colors.parchment,
  },
  hero: {
    height: 620,
    backgroundColor: colors.charcoal,
    justifyContent: 'space-between',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.base,
    paddingBottom: spacing.sm,
  },
  bagButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(245,240,230,0.18)',
  },
  bagBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    paddingHorizontal: 4,
    backgroundColor: colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxxl,
    gap: spacing.sm,
  },
  heroTitle: {
    color: colors.parchment,
    marginTop: spacing.sm,
  },
  heroSubtitle: {
    color: colors.parchment,
    opacity: 0.85,
    maxWidth: 320,
  },
  section: {
    paddingHorizontal: spacing.base,
    paddingTop: spacing.xxxl,
    gap: spacing.lg,
  },
  sectionHead: {
    gap: spacing.sm,
  },
  sectionTitle: {
    color: colors.charcoal,
  },
  horizScroll: {
    paddingRight: spacing.base,
  },
  stonesWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  bespoke: {
    marginTop: spacing.xxxl,
    marginHorizontal: spacing.base,
    backgroundColor: colors.charcoal,
    padding: spacing.xl,
    borderRadius: 16,
  },
});
