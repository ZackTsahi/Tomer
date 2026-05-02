import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import type { Category } from '@/types/product';
import { categoryMeta } from '@/data/categories';
import { useI18n } from '@/i18n/I18nProvider';
import { imageSource } from '@/utils/image';
import { colors, radius, spacing, typography } from '@/theme';

type Props = {
  category: Category;
  width?: number;
};

export function CategoryCard({ category, width }: Props) {
  const router = useRouter();
  const { locale } = useI18n();
  const meta = categoryMeta[category];
  const label = locale === 'he' ? meta.labelHe : meta.label;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={() =>
        router.push({ pathname: '/(tabs)/shop', params: { category } })
      }
      style={({ pressed }) => [
        styles.card,
        width ? { width } : undefined,
        pressed && { opacity: 0.92 },
      ]}
    >
      <Image source={imageSource(meta.image as string | number)} style={styles.image} contentFit="cover" />
      <LinearGradient
        colors={['transparent', 'rgba(14,12,10,0.7)']}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.content}>
        <Text style={[typography.h2, styles.label]}>{label}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    aspectRatio: 0.78,
    borderRadius: radius.md,
    overflow: 'hidden',
    backgroundColor: colors.cream,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  content: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: spacing.base,
  },
  label: {
    color: colors.parchment,
  },
});
