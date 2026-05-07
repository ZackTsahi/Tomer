import React, { useMemo, useState } from 'react';
import {
  Dimensions,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { AppHeader } from '@/components/AppHeader';
import { Chip } from '@/components/Chip';
import { GalleryCard } from '@/components/GalleryCard';
import { Eyebrow } from '@/components/Eyebrow';
import {
  filterGallery,
  galleryFilters,
  galleryItems,
  type GalleryFilter,
} from '@/data/gallery';
import { useI18n, useT } from '@/i18n/I18nProvider';
import { contact } from '@/data/contact';
import { colors, spacing, typography } from '@/theme';

export default function GalleryScreen() {
  const insets = useSafeAreaInsets();
  const t = useT();
  const { locale } = useI18n();
  const [filter, setFilter] = useState<GalleryFilter>('all');

  const items = useMemo(() => filterGallery(galleryItems, filter), [filter]);

  const screenWidth = Dimensions.get('window').width;
  const gutter = spacing.sm;
  const horizontalPadding = spacing.base;
  const columnWidth =
    (screenWidth - horizontalPadding * 2 - gutter) / 2;

  // Split into two masonry columns. Place each item in the shorter column to
  // approximate Pinterest-style packing without an extra layout library.
  const columns = useMemo(() => {
    const left: typeof items = [];
    const right: typeof items = [];
    let leftHeight = 0;
    let rightHeight = 0;
    items.forEach((item) => {
      const h = columnWidth * item.aspectRatio;
      if (leftHeight <= rightHeight) {
        left.push(item);
        leftHeight += h + gutter;
      } else {
        right.push(item);
        rightHeight += h + gutter;
      }
    });
    return { left, right };
  }, [items, columnWidth]);

  return (
    <View style={styles.container}>
      <AppHeader eyebrow={t.brand.toUpperCase()} title={t.gallery.title} />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 140 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.intro}>
          <Eyebrow label={t.gallery.eyebrow} />
          <Text
            style={[typography.h1, { color: colors.charcoal, marginTop: spacing.sm }]}
          >
            {t.gallery.title}
          </Text>
          <Text
            style={[
              typography.body,
              { color: colors.textSecondary, marginTop: spacing.md },
            ]}
          >
            {t.gallery.subtitle}
          </Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipRow}
        >
          {galleryFilters.map((f) => (
            <Chip
              key={f.id}
              label={locale === 'he' ? f.labelHe : f.label}
              selected={filter === f.id}
              onPress={() => setFilter(f.id)}
            />
          ))}
        </ScrollView>

        {items.length === 0 ? (
          <View style={styles.empty}>
            <Text style={[typography.body, { color: colors.textSecondary }]}>
              {t.gallery.empty}
            </Text>
          </View>
        ) : (
          <View
            style={[
              styles.grid,
              { paddingHorizontal: horizontalPadding, gap: gutter },
            ]}
          >
            <View style={[styles.column, { gap: gutter }]}>
              {columns.left.map((item) => (
                <GalleryCard key={item.id} item={item} width={columnWidth} />
              ))}
            </View>
            <View style={[styles.column, { gap: gutter }]}>
              {columns.right.map((item) => (
                <GalleryCard key={item.id} item={item} width={columnWidth} />
              ))}
            </View>
          </View>
        )}

        <Pressable
          accessibilityRole="link"
          onPress={() => Linking.openURL(contact.instagramUrl)}
          style={styles.instagramRow}
        >
          <Ionicons name="logo-instagram" size={20} color={colors.gold} />
          <Text style={[typography.button, { color: colors.gold }]}>
            {t.gallery.openInstagram}
          </Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.parchment,
  },
  intro: {
    paddingHorizontal: spacing.base,
    paddingTop: spacing.base,
    paddingBottom: spacing.lg,
  },
  chipRow: {
    paddingHorizontal: spacing.base,
    gap: spacing.sm,
    paddingBottom: spacing.lg,
  },
  grid: {
    flexDirection: 'row',
  },
  column: {
    flex: 1,
  },
  empty: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.huge,
    alignItems: 'center',
  },
  instagramRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.xl,
  },
});
