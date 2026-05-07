import React from 'react';
import {
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppHeader } from '@/components/AppHeader';
import { Eyebrow } from '@/components/Eyebrow';
import { useI18n, useT } from '@/i18n/I18nProvider';
import { contact, emailLink, landlineLink, whatsappLink } from '@/data/contact';
import { colors, radius, spacing, typography } from '@/theme';

export default function ContactScreen() {
  const t = useT();
  const { locale } = useI18n();

  const open = async (url: string) => {
    if (await Linking.canOpenURL(url)) Linking.openURL(url);
  };

  const openWhatsApp = () =>
    open(whatsappLink(locale === 'he' ? 'שלום תומר!' : 'Hi Tomer!'));

  return (
    <View style={styles.container}>
      <AppHeader showBack title={t.contact.title} showBag={false} />

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: spacing.base,
          paddingBottom: spacing.huge,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.intro}>
          <Eyebrow label={t.contact.eyebrow} />
          <Text
            style={[
              typography.h1,
              { color: colors.charcoal, marginTop: spacing.sm },
            ]}
          >
            {t.contact.title}
          </Text>
          <Text
            style={[
              typography.body,
              { color: colors.textSecondary, marginTop: spacing.md },
            ]}
          >
            {t.contact.subtitle}
          </Text>
        </View>

        <View style={styles.list}>
          <Tile
            icon="logo-whatsapp"
            iconColor={colors.whatsapp}
            label={t.contact.whatsapp}
            sublabel={contact.whatsappNumber}
            cta={t.contact.whatsappCta}
            onPress={openWhatsApp}
          />
          <Tile
            icon="mail-outline"
            label={t.contact.email}
            sublabel={contact.email}
            cta={t.contact.emailCta}
            onPress={() =>
              open(emailLink(locale === 'he' ? 'שלום' : 'Hello'))
            }
          />
          <Tile
            icon="logo-instagram"
            label={t.contact.instagram}
            sublabel={`@${contact.instagramHandle}`}
            cta={t.contact.instagramCta}
            onPress={() => open(contact.instagramUrl)}
          />
          <Tile
            icon="call-outline"
            label={t.contact.phone}
            sublabel={contact.landlineNumber}
            cta={t.contact.phoneCta}
            onPress={() => open(landlineLink())}
          />
        </View>

        <View style={styles.meta}>
          <Text style={[typography.caption, { color: colors.textMuted }]}>
            {t.contact.hours}
          </Text>
          <Text
            style={[
              typography.small,
              { color: colors.textSecondary, marginTop: spacing.sm },
            ]}
          >
            {t.contact.replyTime}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

function Tile({
  icon,
  iconColor,
  label,
  sublabel,
  cta,
  onPress,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  iconColor?: string;
  label: string;
  sublabel: string;
  cta: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${label} — ${cta}`}
      onPress={onPress}
      style={({ pressed }) => [styles.tile, pressed && { opacity: 0.92 }]}
    >
      <View style={[styles.iconBubble, { backgroundColor: colors.cream }]}>
        <Ionicons name={icon} size={20} color={iconColor ?? colors.charcoal} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={[typography.bodyMedium, { color: colors.charcoal }]}>
          {label}
        </Text>
        <Text style={[typography.small, { color: colors.textMuted, marginTop: 2 }]}>
          {sublabel}
        </Text>
        <Text
          style={[
            typography.button,
            { color: colors.gold, marginTop: spacing.sm },
          ]}
        >
          {cta}  →
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.parchment,
  },
  intro: {
    paddingTop: spacing.base,
    paddingBottom: spacing.lg,
  },
  list: {
    gap: spacing.md,
    marginTop: spacing.md,
  },
  tile: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.base,
    padding: spacing.base,
    borderRadius: radius.md,
    backgroundColor: colors.cream,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  iconBubble: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  meta: {
    marginTop: spacing.xxxl,
    paddingTop: spacing.xl,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
  },
});
