import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { colors, radius, spacing, typography } from '@/theme';

type Variant = 'primary' | 'secondary' | 'ghost' | 'gold';
type Size = 'lg' | 'md' | 'sm';

type Props = {
  label: string;
  onPress?: () => void;
  variant?: Variant;
  size?: Size;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  haptic?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function Button({
  label,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled,
  loading,
  fullWidth,
  haptic = true,
  style,
}: Props) {
  const handlePress = () => {
    if (disabled || loading) return;
    if (haptic) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    }
    onPress?.();
  };

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled: !!disabled, busy: !!loading }}
      onPress={handlePress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.base,
        sizeStyles[size],
        variantStyles[variant].container,
        fullWidth && styles.fullWidth,
        (disabled || loading) && styles.disabled,
        pressed && styles.pressed,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={variantStyles[variant].label.color} />
      ) : (
        <Text style={[typography.button, variantStyles[variant].label]}>
          {label}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.sm,
  },
  fullWidth: { alignSelf: 'stretch' },
  disabled: { opacity: 0.5 },
  pressed: { opacity: 0.85 },
});

const sizeStyles: Record<Size, ViewStyle> = {
  lg: { paddingVertical: spacing.base, paddingHorizontal: spacing.xl },
  md: { paddingVertical: spacing.md, paddingHorizontal: spacing.lg },
  sm: { paddingVertical: spacing.sm, paddingHorizontal: spacing.base },
};

const variantStyles: Record<
  Variant,
  { container: ViewStyle; label: { color: string } }
> = {
  primary: {
    container: {
      backgroundColor: colors.charcoal,
      borderWidth: 1,
      borderColor: colors.charcoal,
    },
    label: { color: colors.parchment },
  },
  secondary: {
    container: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: colors.charcoal,
    },
    label: { color: colors.charcoal },
  },
  ghost: {
    container: { backgroundColor: 'transparent' },
    label: { color: colors.charcoal },
  },
  gold: {
    container: {
      backgroundColor: colors.gold,
      borderWidth: 1,
      borderColor: colors.gold,
    },
    label: { color: colors.parchment },
  },
};
