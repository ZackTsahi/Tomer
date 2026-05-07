import React from 'react';
import { Pressable, StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Eyebrow } from '@/components/Eyebrow';
import { colors, spacing, typography } from '@/theme';

type Props = {
  eyebrow?: string;
  title: string;
  variant?: 'light' | 'dark';
  trailingLabel?: string;
  onTrailingPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

export function SectionHeader({
  eyebrow,
  title,
  variant = 'dark',
  trailingLabel,
  onTrailingPress,
  style,
}: Props) {
  const titleColor = variant === 'light' ? colors.parchment : colors.charcoal;

  return (
    <View style={[styles.wrap, style]}>
      <View style={{ flex: 1, gap: spacing.sm }}>
        {eyebrow ? <Eyebrow label={eyebrow} variant={variant} /> : null}
        <Text style={[typography.h2, { color: titleColor }]}>{title}</Text>
      </View>
      {trailingLabel ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={trailingLabel}
          hitSlop={8}
          onPress={onTrailingPress}
          style={({ pressed }) => [styles.trailing, pressed && { opacity: 0.65 }]}
        >
          <Text style={[typography.button, { color: colors.gold }]}>{trailingLabel}</Text>
          <Ionicons name="chevron-forward" size={14} color={colors.gold} />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: spacing.md,
  },
  trailing: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingBottom: 2,
  },
});
