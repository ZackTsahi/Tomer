// Tomer Dahan Jewelry palette — black, gold, burning gemstones.
// Surfaces are deep black; primary accent is brushed gold; gemstone tones
// (ruby/emerald/sapphire) appear as vivid call-outs.
export const colors = {
  // Surfaces (dark)
  black: '#000000',
  ink: '#0A0908',
  jet: '#13100E',
  char: '#1C1815',
  slate: '#2A241F',

  // Brand metals
  gold: '#D4AF37',
  goldBright: '#F0C94A',
  goldDeep: '#B8893E',
  goldDark: '#8B6919',
  silver: '#C8C2BB',

  // Light surfaces (used sparingly, e.g. on gold buttons)
  ivory: '#F5EFE0',
  bone: '#E9DFC9',

  // Gemstones — vivid
  ruby: '#C8102E',
  rubyDeep: '#8B0A20',
  emerald: '#0F8B5C',
  emeraldDeep: '#075235',
  sapphire: '#0A4DA6',
  sapphireDeep: '#06316B',
  onyx: '#0A0908',
  tigerEye: '#B8763D',
  turquoise: '#1B9E9E',
  pearl: '#E9DFC9',
  lapis: '#143A82',
  garnet: '#7A1E2C',
  agate: '#6B4226',

  // Text on dark
  textPrimary: '#F5EFE0',
  textSecondary: '#B8AC9A',
  textMuted: '#897868',
  textGold: '#D4AF37',
  textOnGold: '#0A0908',

  // Lines
  border: '#2A241F',
  borderSoft: '#1A1612',
  borderGold: 'rgba(212,175,55,0.35)',
  divider: '#1A1612',

  // Status
  success: '#0F8B5C',
  error: '#C8102E',
  whatsapp: '#25D366',
  overlay: 'rgba(0, 0, 0, 0.65)',
  scrim: 'rgba(0, 0, 0, 0.92)',

  // Aliases kept for backward compatibility with components
  // that still reference the old token names.
  parchment: '#0A0908',   // was #FAF7F2 — now dark
  cream: '#13100E',       // was #EDE5D3 — now dark surface
  charcoal: '#F5EFE0',    // was #1A1714 — now used as on-dark text color
  obsidian: '#000000',
  smoke: '#2A241F',
  textOnDark: '#F5EFE0',
  borderDark: '#2A241F',
};

export type Colors = typeof colors;
