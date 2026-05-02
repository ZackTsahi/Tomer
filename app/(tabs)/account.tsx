import React from 'react';
import {
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { Eyebrow } from '@/components/Eyebrow';
import { useI18n, useT } from '@/i18n/I18nProvider';
import { contact, emailLink, whatsappLink } from '@/data/contact';
import { colors, radius, spacing, typography } from '@/theme';

export default function AccountScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const t = useT();
  const { locale, setLocale } = useI18n();

  const openWhatsapp = async () => {
    const msg = locale === 'he' ? 'שלום תומר!' : 'Hi Tomer!';
    const url = whatsappLink(msg);
    if (await Linking.canOpenURL(url)) Linking.openURL(url);
  };

  const openEmail = async () => {
    const url = emailLink(locale === 'he' ? 'שלום' : 'Hello');
    if (await Linking.canOpenURL(url)) Linking.openURL(url);
  };

  const openInstagram = () => Linking.openURL(contact.instagramUrl);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        paddingTop: insets.top + spacing.lg,
        paddingHorizontal: spacing.base,
        paddingBottom: 140,
      }}
    >
      <Eyebrow label={t.account.title.toUpperCase()} />
      <Text style={[typography.h1, { color: colors.charcoal, marginTop: spacing.xs }]}>
        {t.account.title}
      </Text>

      {/* Contact */}
      <View style={styles.section}>
        <Text style={[typography.caption, { color: colors.textMuted }]}>
          {t.account.contact}
        </Text>
        <View style={styles.tile}>
          <Row icon="logo-whatsapp" label={t.account.whatsapp} onPress={openWhatsapp} accent={colors.gold} />
          <Divider />
          <Row icon="mail-outline" label={t.account.email} sublabel={contact.email} onPress={openEmail} />
          <Divider />
          <Row
            icon="logo-instagram"
            label={t.account.instagram}
            sublabel={`@${contact.instagramHandle}`}
            onPress={openInstagram}
          />
        </View>
      </View>

      {/* About */}
      <View style={styles.section}>
        <View style={styles.tile}>
          <Row
            icon="information-circle-outline"
            label={t.account.about}
            onPress={() => router.push('/about')}
          />
        </View>
      </View>

      {/* Language */}
      <View style={styles.section}>
        <Text style={[typography.caption, { color: colors.textMuted }]}>
          {t.account.language}
        </Text>
        <View style={styles.tile}>
          <LanguageRow
            label={t.account.en}
            active={locale === 'en'}
            onPress={() => {
              Haptics.selectionAsync().catch(() => {});
              setLocale('en');
            }}
          />
          <Divider />
          <LanguageRow
            label={t.account.he}
            active={locale === 'he'}
            onPress={() => {
              Haptics.selectionAsync().catch(() => {});
              setLocale('he');
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
}

function Row({
  icon,
  label,
  sublabel,
  onPress,
  accent,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  sublabel?: string;
  onPress?: () => void;
  accent?: string;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.row, pressed && { opacity: 0.7 }]}
    >
      <View style={styles.rowLeft}>
        <Ionicons name={icon} size={20} color={accent ?? colors.charcoal} />
        <View>
          <Text style={[typography.bodyMedium, { color: colors.charcoal }]}>{label}</Text>
          {sublabel ? (
            <Text style={[typography.small, { color: colors.textMuted }]}>{sublabel}</Text>
          ) : null}
        </View>
      </View>
      <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
    </Pressable>
  );
}

function LanguageRow({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
      onPress={onPress}
      style={({ pressed }) => [styles.row, pressed && { opacity: 0.7 }]}
    >
      <Text style={[typography.bodyMedium, { color: colors.charcoal }]}>{label}</Text>
      {active ? (
        <Ionicons name="checkmark" size={20} color={colors.gold} />
      ) : null}
    </Pressable>
  );
}

function Divider() {
  return <View style={styles.divider} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.parchment,
  },
  section: {
    marginTop: spacing.xl,
    gap: spacing.sm,
  },
  tile: {
    backgroundColor: colors.cream,
    borderRadius: radius.md,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.base,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
    marginLeft: spacing.base,
  },
});
