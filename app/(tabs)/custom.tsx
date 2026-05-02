import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '@/components/Button';
import { Eyebrow } from '@/components/Eyebrow';
import { Chip } from '@/components/Chip';
import { StoneSwatch } from '@/components/StoneSwatch';
import { allStones } from '@/data/stones';
import { categoryMeta, categoryOrder } from '@/data/categories';
import type { Category, Stone } from '@/types/product';
import { useI18n, useT } from '@/i18n/I18nProvider';
import { emailLink, whatsappLink } from '@/data/contact';
import { colors, radius, spacing, typography } from '@/theme';

export default function CustomScreen() {
  const insets = useSafeAreaInsets();
  const t = useT();
  const { locale } = useI18n();
  const [stones, setStones] = useState<Stone[]>([]);
  const [type, setType] = useState<Category | null>(null);
  const [note, setNote] = useState('');

  const toggleStone = (s: Stone) =>
    setStones((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));

  const composeMessage = () => {
    const stoneStr = stones.length
      ? stones.join(', ')
      : locale === 'he'
        ? 'גמיש'
        : 'open';
    const typeStr = type
      ? locale === 'he'
        ? categoryMeta[type].labelHe
        : categoryMeta[type].label
      : locale === 'he'
        ? 'גמיש'
        : 'open';

    if (locale === 'he') {
      return `שלום תומר! מתעניין/ת בפריט בהזמנה.
סוג: ${typeStr}
אבנים: ${stoneStr}
${note ? `\nהערה: ${note}` : ''}`;
    }
    return `Hi Tomer! I'd love to commission a custom piece.
Type: ${typeStr}
Stones: ${stoneStr}
${note ? `\nNotes: ${note}` : ''}`;
  };

  const sendWhatsApp = async () => {
    const url = whatsappLink(composeMessage());
    if (await Linking.canOpenURL(url)) Linking.openURL(url);
  };

  const sendEmail = async () => {
    const url = emailLink(
      locale === 'he' ? 'בקשה לפריט בהזמנה' : 'Custom piece inquiry',
      composeMessage(),
    );
    if (await Linking.canOpenURL(url)) Linking.openURL(url);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={{
          paddingTop: insets.top + spacing.lg,
          paddingHorizontal: spacing.base,
          paddingBottom: 140,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <Eyebrow label={t.home.customEyebrow} />
        <Text style={[typography.h1, { color: colors.charcoal, marginTop: spacing.sm }]}>
          {t.custom.title}
        </Text>
        <Text
          style={[typography.body, { color: colors.textSecondary, marginTop: spacing.md }]}
        >
          {t.custom.subtitle}
        </Text>

        <Field label={t.custom.typeLabel}>
          <View style={styles.chipRow}>
            {categoryOrder.map((c) => (
              <Chip
                key={c}
                label={locale === 'he' ? categoryMeta[c].labelHe : categoryMeta[c].label}
                selected={type === c}
                onPress={() => setType(type === c ? null : c)}
              />
            ))}
          </View>
        </Field>

        <Field label={t.custom.stoneLabel}>
          <View style={styles.stoneWrap}>
            {allStones.map((s) => (
              <StoneSwatch
                key={s}
                stone={s}
                selected={stones.includes(s)}
                onPress={() => toggleStone(s)}
              />
            ))}
          </View>
        </Field>

        <Field label={t.custom.noteLabel}>
          <TextInput
            value={note}
            onChangeText={setNote}
            placeholder={t.custom.notePlaceholder}
            placeholderTextColor={colors.textMuted}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            textAlign={locale === 'he' ? 'right' : 'left'}
            style={[typography.body, styles.textInput]}
          />
        </Field>

        <View style={{ gap: spacing.md, marginTop: spacing.xl }}>
          <Button label={t.custom.whatsapp} variant="primary" size="lg" onPress={sendWhatsApp} />
          <Button label={t.custom.email} variant="secondary" size="lg" onPress={sendEmail} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <View style={{ marginTop: spacing.xl }}>
      <Text
        style={[
          typography.caption,
          { color: colors.textMuted, marginBottom: spacing.sm },
        ]}
      >
        {label}
      </Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.parchment,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  stoneWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  textInput: {
    minHeight: 110,
    padding: spacing.base,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    color: colors.charcoal,
    backgroundColor: colors.parchment,
  },
});
