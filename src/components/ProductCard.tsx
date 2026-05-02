import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import type { Product } from '@/types/product';
import { stoneMeta } from '@/data/stones';
import { useSaved } from '@/state/SavedContext';
import { useI18n } from '@/i18n/I18nProvider';
import { formatPrice } from '@/utils/format';
import { colors, radius, spacing, typography } from '@/theme';

type Props = {
  product: Product;
  width?: number;
  /** True when shown in a single column at full bleed. */
  large?: boolean;
};

export function ProductCard({ product, width, large }: Props) {
  const router = useRouter();
  const { isSaved, toggle } = useSaved();
  const { locale, t } = useI18n();
  const saved = isSaved(product.id);
  const name = locale === 'he' && product.nameHe ? product.nameHe : product.name;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={name}
      onPress={() => router.push(`/product/${product.slug}`)}
      style={({ pressed }) => [
        styles.card,
        width ? { width } : undefined,
        pressed && { opacity: 0.92 },
      ]}
    >
      <View style={[styles.imageWrap, large && styles.imageWrapLarge]}>
        <Image
          source={{ uri: product.image }}
          style={styles.image}
          contentFit="cover"
          transition={250}
        />
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={saved ? t.product.saved : t.product.saveForLater}
          hitSlop={12}
          onPress={() => {
            Haptics.selectionAsync().catch(() => {});
            toggle(product.id);
          }}
          style={styles.saveButton}
        >
          <Ionicons
            name={saved ? 'bookmark' : 'bookmark-outline'}
            size={18}
            color={saved ? colors.gold : colors.charcoal}
          />
        </Pressable>
        {product.oneOfAKind && (
          <View style={styles.badge}>
            <Text style={[typography.caption, { color: colors.parchment }]}>
              1 / 1
            </Text>
          </View>
        )}
        {product.soldOut && (
          <View style={styles.soldOutOverlay}>
            <Text style={[typography.caption, { color: colors.parchment }]}>
              {locale === 'he' ? 'אזל' : 'Sold'}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.body}>
        <Text style={[typography.bodyMedium, styles.name]} numberOfLines={2}>
          {name}
        </Text>
        <View style={styles.metaRow}>
          <View style={styles.stones}>
            {product.stones.slice(0, 4).map((s) => (
              <View
                key={s}
                style={[styles.stoneDot, { backgroundColor: stoneMeta[s].swatch }]}
              />
            ))}
          </View>
          <Text style={[typography.price, { color: colors.charcoal }]}>
            {formatPrice(product.priceUSD, locale)}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.parchment,
  },
  imageWrap: {
    aspectRatio: 0.82,
    backgroundColor: colors.cream,
    borderRadius: radius.md,
    overflow: 'hidden',
    position: 'relative',
  },
  imageWrapLarge: {
    aspectRatio: 0.78,
    borderRadius: radius.lg,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  saveButton: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(245, 240, 230, 0.92)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    bottom: spacing.sm,
    left: spacing.sm,
    backgroundColor: colors.charcoal,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radius.sm,
  },
  soldOutOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.scrim,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    paddingTop: spacing.md,
    gap: spacing.xs,
  },
  name: {
    color: colors.textPrimary,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.xs,
  },
  stones: {
    flexDirection: 'row',
    gap: 4,
  },
  stoneDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.borderDark,
  },
});
