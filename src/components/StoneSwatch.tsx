import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import type { Stone } from '@/types/product';
import { stoneMeta } from '@/data/stones';
import { useI18n } from '@/i18n/I18nProvider';
import { colors, radius, spacing, typography } from '@/theme';

type Props = {
  stone: Stone;
  selected?: boolean;
  onPress?: () => void;
  size?: 'sm' | 'md' | 'lg';
};

export function StoneSwatch({ stone, selected, onPress, size = 'md' }: Props) {
  const { locale } = useI18n();
  const meta = stoneMeta[stone];
  const dim = size === 'lg' ? 28 : size === 'sm' ? 14 : 20;

  const swatch = (
    <View
      style={[
        styles.swatch,
        {
          width: dim,
          height: dim,
          borderRadius: dim / 2,
          backgroundColor: meta.swatch,
          borderColor: selected ? colors.charcoal : colors.border,
          borderWidth: selected ? 2 : 1,
        },
      ]}
    />
  );

  if (!onPress) return swatch;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={locale === 'he' ? meta.labelHe : meta.label}
      accessibilityState={{ selected: !!selected }}
      onPress={() => {
        Haptics.selectionAsync().catch(() => {});
        onPress();
      }}
      style={({ pressed }) => [styles.row, pressed && { opacity: 0.7 }]}
    >
      {swatch}
      <Text
        style={[
          typography.small,
          { color: selected ? colors.charcoal : colors.textSecondary },
        ]}
      >
        {locale === 'he' ? meta.labelHe : meta.label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  swatch: {},
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.pill,
  },
});
