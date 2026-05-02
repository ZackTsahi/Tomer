import { Platform, TextStyle } from 'react-native';

// Pairing: editorial serif for display + clean sans for body.
// Fonts are loaded via expo-font in app/_layout.tsx (PlayfairDisplay, Inter).
// Falls back to platform serif/sans if not yet loaded.
const serif = Platform.select({
  ios: 'PlayfairDisplay-Regular',
  android: 'PlayfairDisplay-Regular',
  default: 'serif',
}) as string;

const serifMedium = Platform.select({
  ios: 'PlayfairDisplay-Medium',
  android: 'PlayfairDisplay-Medium',
  default: 'serif',
}) as string;

const sans = Platform.select({
  ios: 'Inter-Regular',
  android: 'Inter-Regular',
  default: 'System',
}) as string;

const sansMedium = Platform.select({
  ios: 'Inter-Medium',
  android: 'Inter-Medium',
  default: 'System',
}) as string;

const sansSemibold = Platform.select({
  ios: 'Inter-SemiBold',
  android: 'Inter-SemiBold',
  default: 'System',
}) as string;

export const typography = {
  display: {
    fontFamily: serifMedium,
    fontSize: 40,
    lineHeight: 46,
    letterSpacing: -0.5,
  } satisfies TextStyle,

  h1: {
    fontFamily: serifMedium,
    fontSize: 32,
    lineHeight: 38,
    letterSpacing: -0.3,
  } satisfies TextStyle,

  h2: {
    fontFamily: serif,
    fontSize: 24,
    lineHeight: 30,
  } satisfies TextStyle,

  h3: {
    fontFamily: sansSemibold,
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: 0.2,
  } satisfies TextStyle,

  body: {
    fontFamily: sans,
    fontSize: 15,
    lineHeight: 22,
  } satisfies TextStyle,

  bodyMedium: {
    fontFamily: sansMedium,
    fontSize: 15,
    lineHeight: 22,
  } satisfies TextStyle,

  small: {
    fontFamily: sans,
    fontSize: 13,
    lineHeight: 18,
  } satisfies TextStyle,

  caption: {
    fontFamily: sansMedium,
    fontSize: 11,
    lineHeight: 14,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
  } satisfies TextStyle,

  price: {
    fontFamily: sansSemibold,
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: 0.3,
  } satisfies TextStyle,

  button: {
    fontFamily: sansSemibold,
    fontSize: 13,
    lineHeight: 16,
    letterSpacing: 1.6,
    textTransform: 'uppercase',
  } satisfies TextStyle,
};

export const fontFamilies = {
  serif,
  serifMedium,
  sans,
  sansMedium,
  sansSemibold,
};
