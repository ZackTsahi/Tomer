import React, { useMemo, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Chip } from '@/components/Chip';
import { StoneSwatch } from '@/components/StoneSwatch';
import { ProductCard } from '@/components/ProductCard';
import { Eyebrow } from '@/components/Eyebrow';
import { products } from '@/data/products';
import { categoryMeta, categoryOrder } from '@/data/categories';
import { allStones } from '@/data/stones';
import type { Category, Stone } from '@/types/product';
import { useI18n, useT } from '@/i18n/I18nProvider';
import { useCart } from '@/state/CartContext';
import { colors, spacing, typography } from '@/theme';

export default function ShopScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const t = useT();
  const { locale } = useI18n();
  const params = useLocalSearchParams<{ category?: Category; stone?: Stone }>();
  const cart = useCart();

  const [activeCategory, setActiveCategory] = useState<Category | null>(
    params.category ?? null,
  );
  const [activeStone, setActiveStone] = useState<Stone | null>(params.stone ?? null);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (activeCategory && p.category !== activeCategory) return false;
      if (activeStone && !p.stones.includes(activeStone)) return false;
      return true;
    });
  }, [activeCategory, activeStone]);

  const screenWidth = Dimensions.get('window').width;
  const cardWidth = (screenWidth - spacing.base * 2 - spacing.md) / 2;

  return (
    <View style={[styles.container, { paddingTop: insets.top + spacing.sm }]}>
      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          <Eyebrow label={t.shop.title.toUpperCase()} />
          <Text style={[typography.h1, { color: colors.charcoal, marginTop: spacing.xs }]}>
            {t.shop.title}
          </Text>
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Bag"
          onPress={() => router.push('/cart')}
          hitSlop={12}
          style={styles.bagButton}
        >
          <Ionicons name="bag-handle-outline" size={22} color={colors.charcoal} />
          {cart.count > 0 ? (
            <View style={styles.bagBadge}>
              <Text style={[typography.caption, { color: colors.parchment, letterSpacing: 0 }]}>
                {cart.count}
              </Text>
            </View>
          ) : null}
        </Pressable>
      </View>

      {/* Category filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chipRow}
      >
        <Chip
          label={t.shop.filtersAll}
          selected={!activeCategory}
          onPress={() => setActiveCategory(null)}
        />
        {categoryOrder.map((c) => (
          <Chip
            key={c}
            label={locale === 'he' ? categoryMeta[c].labelHe : categoryMeta[c].label}
            selected={activeCategory === c}
            onPress={() => setActiveCategory(activeCategory === c ? null : c)}
          />
        ))}
      </ScrollView>

      {/* Stone filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.stoneRow}
      >
        {allStones.map((s) => (
          <StoneSwatch
            key={s}
            stone={s}
            selected={activeStone === s}
            onPress={() => setActiveStone(activeStone === s ? null : s)}
          />
        ))}
      </ScrollView>

      {/* Product grid */}
      {filtered.length === 0 ? (
        <View style={styles.empty}>
          <Text style={[typography.body, { color: colors.textSecondary }]}>
            {t.shop.empty}
          </Text>
          <Pressable
            onPress={() => {
              setActiveCategory(null);
              setActiveStone(null);
            }}
            style={{ marginTop: spacing.base }}
          >
            <Text style={[typography.button, { color: colors.gold }]}>
              {t.shop.clearFilters}
            </Text>
          </Pressable>
        </View>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(p) => p.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={{
            paddingHorizontal: spacing.base,
            paddingBottom: 140,
          }}
          ItemSeparatorComponent={() => <View style={{ height: spacing.lg }} />}
          renderItem={({ item }) => <ProductCard product={item} width={cardWidth} />}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.parchment,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.base,
  },
  bagButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.cream,
  },
  bagBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    paddingHorizontal: 4,
    backgroundColor: colors.charcoal,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipRow: {
    paddingHorizontal: spacing.base,
    gap: spacing.sm,
    paddingBottom: spacing.md,
  },
  stoneRow: {
    paddingHorizontal: spacing.base,
    gap: spacing.xs,
    paddingBottom: spacing.lg,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  row: {
    gap: spacing.md,
  },
});
