import React from 'react';
import { Pressable, StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '@/state/CartContext';
import { useT } from '@/i18n/I18nProvider';
import { colors, spacing, typography } from '@/theme';

type Props = {
  /** Optional brand-mark / eyebrow line above the title (e.g. "TOMER DAHAN"). */
  eyebrow?: string;
  title?: string;
  showBack?: boolean;
  showBag?: boolean;
  variant?: 'light' | 'dark';
  /** Render an extra pressable on the trailing side (replaces the bag). */
  trailingIcon?: keyof typeof import('@expo/vector-icons').Ionicons.glyphMap;
  onTrailingPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

export function AppHeader({
  eyebrow,
  title,
  showBack,
  showBag = true,
  variant = 'dark',
  trailingIcon,
  onTrailingPress,
  style,
}: Props) {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const cart = useCart();
  const t = useT();

  const fg = variant === 'light' ? colors.parchment : colors.charcoal;
  const bgPill = variant === 'light' ? 'rgba(245,240,230,0.18)' : colors.cream;

  return (
    <View style={[styles.wrap, { paddingTop: insets.top + spacing.sm }, style]}>
      {showBack ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={t.common.back}
          onPress={() => router.back()}
          hitSlop={12}
          style={[styles.iconButton, { backgroundColor: bgPill }]}
        >
          <Ionicons name="chevron-back" size={22} color={fg} />
        </Pressable>
      ) : (
        <View style={{ width: 40 }} />
      )}

      <View style={styles.center} pointerEvents="none">
        {eyebrow ? (
          <Text style={[typography.caption, { color: fg, letterSpacing: 2.4 }]} numberOfLines={1}>
            {eyebrow}
          </Text>
        ) : null}
        {title ? (
          <Text style={[typography.h3, { color: fg, marginTop: 2 }]} numberOfLines={1}>
            {title}
          </Text>
        ) : null}
      </View>

      {trailingIcon ? (
        <Pressable
          accessibilityRole="button"
          onPress={onTrailingPress}
          hitSlop={12}
          style={[styles.iconButton, { backgroundColor: bgPill }]}
        >
          <Ionicons name={trailingIcon} size={22} color={fg} />
        </Pressable>
      ) : showBag ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Bag"
          onPress={() => router.push('/cart')}
          hitSlop={12}
          style={[styles.iconButton, { backgroundColor: bgPill }]}
        >
          <Ionicons name="bag-handle-outline" size={22} color={fg} />
          {cart.count > 0 ? (
            <View style={styles.badge}>
              <Text style={[typography.caption, { color: colors.ink, letterSpacing: 0 }]}>
                {cart.count}
              </Text>
            </View>
          ) : null}
        </Pressable>
      ) : (
        <View style={{ width: 40 }} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.base,
    paddingBottom: spacing.sm,
    gap: spacing.md,
  },
  center: {
    flex: 1,
    alignItems: 'center',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
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
});
