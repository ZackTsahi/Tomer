import React from 'react';
import {
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@/components/Button';
import { useCart } from '@/state/CartContext';
import { useI18n, useT } from '@/i18n/I18nProvider';
import { getProductById } from '@/data/products';
import { whatsappLink } from '@/data/contact';
import { formatPrice } from '@/utils/format';
import { colors, radius, spacing, typography } from '@/theme';

export default function CartScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const t = useT();
  const { locale } = useI18n();
  const cart = useCart();

  const lines = cart.lines
    .map((l) => ({ ...l, product: getProductById(l.productId)! }))
    .filter((l) => l.product);

  const subtotal = lines.reduce(
    (sum, l) => sum + l.product.priceUSD * l.quantity,
    0,
  );

  const handleCheckout = async () => {
    const items = lines
      .map((l) => `• ${l.product.name} ×${l.quantity}`)
      .join('\n');
    const msg =
      locale === 'he'
        ? `שלום תומר, אשמח להזמין:\n${items}\n\nסכום ביניים: ${formatPrice(subtotal, 'he')}`
        : `Hi Tomer, I'd like to reserve:\n${items}\n\nSubtotal: ${formatPrice(subtotal, 'en')}`;
    const url = whatsappLink(msg);
    const ok = await Linking.canOpenURL(url);
    if (ok) Linking.openURL(url);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top + spacing.sm }]}>
      <View style={styles.header}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={t.common.close}
          onPress={() => router.back()}
          hitSlop={12}
        >
          <Ionicons name="close" size={24} color={colors.charcoal} />
        </Pressable>
        <Text style={[typography.h3, { color: colors.charcoal }]}>{t.cart.title}</Text>
        <View style={{ width: 24 }} />
      </View>

      {lines.length === 0 ? (
        <View style={styles.empty}>
          <Text style={[typography.body, { color: colors.textSecondary }]}>
            {t.cart.empty}
          </Text>
          <Button
            label={t.cart.browse}
            variant="secondary"
            onPress={() => {
              router.back();
              router.push('/(tabs)/shop');
            }}
            style={{ marginTop: spacing.lg }}
          />
        </View>
      ) : (
        <>
          <ScrollView contentContainerStyle={{ padding: spacing.base, gap: spacing.base }}>
            {lines.map((l) => (
              <View key={l.productId} style={styles.line}>
                <Image
                  source={{ uri: l.product.image }}
                  style={styles.lineImage}
                  contentFit="cover"
                />
                <View style={{ flex: 1, justifyContent: 'space-between' }}>
                  <View>
                    <Text
                      style={[typography.bodyMedium, { color: colors.charcoal }]}
                      numberOfLines={2}
                    >
                      {locale === 'he' && l.product.nameHe ? l.product.nameHe : l.product.name}
                    </Text>
                    <Text
                      style={[
                        typography.small,
                        { color: colors.textMuted, marginTop: 2 },
                      ]}
                    >
                      {formatPrice(l.product.priceUSD, locale)}
                    </Text>
                  </View>
                  <View style={styles.lineActions}>
                    <View style={styles.qtyControl}>
                      <Pressable
                        onPress={() => cart.setQuantity(l.productId, l.quantity - 1)}
                        hitSlop={8}
                        style={styles.qtyButton}
                      >
                        <Ionicons name="remove" size={16} color={colors.charcoal} />
                      </Pressable>
                      <Text style={[typography.bodyMedium, { minWidth: 22, textAlign: 'center' }]}>
                        {l.quantity}
                      </Text>
                      <Pressable
                        onPress={() => cart.setQuantity(l.productId, l.quantity + 1)}
                        hitSlop={8}
                        style={styles.qtyButton}
                      >
                        <Ionicons name="add" size={16} color={colors.charcoal} />
                      </Pressable>
                    </View>
                    <Pressable onPress={() => cart.remove(l.productId)} hitSlop={8}>
                      <Text style={[typography.small, { color: colors.textMuted }]}>
                        {t.cart.remove}
                      </Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>

          <View style={[styles.summary, { paddingBottom: insets.bottom + spacing.md }]}>
            <View style={styles.summaryRow}>
              <Text style={[typography.bodyMedium, { color: colors.textSecondary }]}>
                {t.cart.subtotal}
              </Text>
              <Text style={[typography.h3, { color: colors.charcoal }]}>
                {formatPrice(subtotal, locale)}
              </Text>
            </View>
            <Text
              style={[typography.small, { color: colors.textMuted, marginBottom: spacing.md }]}
            >
              {t.cart.shipping}
            </Text>
            <Button
              label={t.cart.checkout}
              variant="primary"
              size="lg"
              onPress={handleCheckout}
              fullWidth
            />
          </View>
        </>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  line: {
    flexDirection: 'row',
    gap: spacing.md,
    backgroundColor: colors.parchment,
  },
  lineImage: {
    width: 90,
    height: 110,
    borderRadius: radius.sm,
    backgroundColor: colors.cream,
  },
  lineActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  qtyControl: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
  },
  qtyButton: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  summary: {
    paddingHorizontal: spacing.base,
    paddingTop: spacing.lg,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
    backgroundColor: colors.parchment,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: spacing.xs,
  },
});
