import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { Text } from 'react-native';
import type { GalleryItem } from '@/data/gallery';
import { useI18n } from '@/i18n/I18nProvider';
import { imageSource } from '@/utils/image';
import { colors, radius, spacing, typography } from '@/theme';

type Props = {
  item: GalleryItem;
  width: number;
  onPress?: (item: GalleryItem) => void;
};

export function GalleryCard({ item, width, onPress }: Props) {
  const { locale } = useI18n();
  const caption = locale === 'he' ? item.captionHe : item.caption;
  const height = Math.round(width * item.aspectRatio);

  return (
    <Pressable
      accessibilityRole="imagebutton"
      accessibilityLabel={caption}
      onPress={() => {
        Haptics.selectionAsync().catch(() => {});
        onPress?.(item);
      }}
      style={({ pressed }) => [
        styles.card,
        { width, height },
        pressed && { opacity: 0.92 },
      ]}
    >
      <Image
        source={imageSource(item.image)}
        style={StyleSheet.absoluteFill}
        contentFit="cover"
        transition={250}
      />
      <LinearGradient
        colors={['transparent', 'rgba(10,9,8,0.78)']}
        style={styles.scrim}
      />
      <View style={styles.captionWrap}>
        <Text
          style={[typography.small, { color: colors.parchment }]}
          numberOfLines={2}
        >
          {caption}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.cream,
    borderRadius: radius.md,
    overflow: 'hidden',
  },
  scrim: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '55%',
  },
  captionWrap: {
    position: 'absolute',
    left: spacing.md,
    right: spacing.md,
    bottom: spacing.md,
  },
});
