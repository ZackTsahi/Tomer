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
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Eyebrow } from '@/components/Eyebrow';
import { Button } from '@/components/Button';
import { useI18n, useT } from '@/i18n/I18nProvider';
import { contact } from '@/data/contact';
import { colors, spacing, typography } from '@/theme';

const PORTRAIT =
  'https://images.unsplash.com/photo-1581338834647-b0fb40704e21?w=1600&q=85';

export default function AboutScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const t = useT();
  const { locale } = useI18n();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View style={styles.cover}>
          <Image source={{ uri: PORTRAIT }} style={StyleSheet.absoluteFill} contentFit="cover" />
          <LinearGradient
            colors={['rgba(14,12,10,0.1)', 'rgba(14,12,10,0.85)']}
            style={StyleSheet.absoluteFill}
          />
          <View style={[styles.coverTop, { paddingTop: insets.top + spacing.sm }]}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={t.common.back}
              onPress={() => router.back()}
              hitSlop={12}
              style={styles.backButton}
            >
              <Ionicons name="chevron-back" size={22} color={colors.parchment} />
            </Pressable>
          </View>
          <View style={styles.coverContent}>
            <Eyebrow label={t.home.storyEyebrow} variant="light" />
            <Text style={[typography.display, { color: colors.parchment, marginTop: spacing.sm }]}>
              {t.home.storyTitle}
            </Text>
          </View>
        </View>

        <View style={styles.body}>
          <Text style={[typography.body, { color: colors.textSecondary }]}>
            {t.home.storyBody}
          </Text>

          <Text
            style={[
              typography.body,
              { color: colors.textSecondary, marginTop: spacing.lg },
            ]}
          >
            {locale === 'he'
              ? 'הסטודיו פתוח בתיאום מראש. כל פריט נארז ביד ונשלח עם תעודת מקור.'
              : 'The studio operates by appointment. Every piece is hand-packed and shipped with a certificate of origin.'}
          </Text>

          <View style={styles.divider} />

          <Eyebrow label={locale === 'he' ? 'יצירת קשר' : 'Reach out'} />
          <View style={{ marginTop: spacing.md, gap: spacing.sm }}>
            <Text style={[typography.body, { color: colors.textPrimary }]}>
              {contact.email}
            </Text>
            <Text style={[typography.body, { color: colors.textPrimary }]}>
              @{contact.instagramHandle}
            </Text>
            <Text style={[typography.body, { color: colors.textMuted }]}>
              {contact.studioCity}
            </Text>
          </View>

          <Button
            label={locale === 'he' ? 'פתח אינסטגרם' : 'Open on Instagram'}
            variant="secondary"
            size="lg"
            onPress={() => Linking.openURL(contact.instagramUrl)}
            style={{ marginTop: spacing.xl, alignSelf: 'flex-start' }}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.parchment,
  },
  cover: {
    height: 460,
    backgroundColor: colors.charcoal,
    justifyContent: 'space-between',
  },
  coverTop: {
    paddingHorizontal: spacing.base,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(14,12,10,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  coverContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  body: {
    padding: spacing.lg,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
    marginVertical: spacing.xl,
  },
});
