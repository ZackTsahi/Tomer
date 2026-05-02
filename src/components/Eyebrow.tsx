import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '@/theme';

type Props = {
  label: string;
  variant?: 'light' | 'dark';
};

export function Eyebrow({ label, variant = 'dark' }: Props) {
  const color = variant === 'light' ? colors.parchment : colors.gold;
  return (
    <View style={styles.row}>
      <View style={[styles.rule, { backgroundColor: color }]} />
      <Text style={[typography.caption, { color }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  rule: {
    width: 24,
    height: 1,
  },
});
