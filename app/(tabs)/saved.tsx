import React from 'react';
import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '@/components/Button';
import { Eyebrow } from '@/components/Eyebrow';
import { ProductCard } from '@/components/ProductCard';
import { useSaved } from '@/state/SavedContext';
import { useT } from '@/i18n/I18nProvider';
import { getProductById } from '@/data/products';
import { colors, spacing, typography } from '@/theme';

export default function SavedScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const t = useT();
  const { ids } = useSaved();

  const products = ids.map((id) => getProductById(id)!).filter(Boolean);
  const screenWidth = Dimensions.get('window').width;
  const cardWidth = (screenWidth - spacing.base * 2 - spacing.md) / 2;

  return (
    <View style={[styles.container, { paddingTop: insets.top + spacing.sm }]}>
      <View style={styles.header}>
        <Eyebrow label={t.saved.title.toUpperCase()} />
        <Text style={[typography.h1, { color: colors.charcoal, marginTop: spacing.xs }]}>
          {t.saved.title}
        </Text>
      </View>

      {products.length === 0 ? (
        <View style={styles.empty}>
          <Text style={[typography.body, { color: colors.textSecondary }]}>
            {t.saved.empty}
          </Text>
          <Button
            label={t.saved.browse}
            variant="secondary"
            onPress={() => router.push('/(tabs)/shop')}
            style={{ marginTop: spacing.lg }}
          />
        </View>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(p) => p.id}
          numColumns={2}
          columnWrapperStyle={{ gap: spacing.md }}
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
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.base,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
});
