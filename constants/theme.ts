// ─────────────────────────────────────────
// CineCurator — Design Tokens
// ─────────────────────────────────────────

export const Colors = {
  background:    '#FFF5F6',  // very light pink bg
  surface:       '#FFFFFF',  // white
  surfaceLight:  '#FAEAEC',  // search bar bg
  border:        '#F0E0E2',  // subtle border
  accent:        '#C82A3A',  // red accent (logo, FAB)
  accentDark:    '#A01D2A',  // pressed red
  accentFaded:   '#FDEBEE',  // faded red bg
  gold:          '#D4AF37',  // premium gold
  deepMaroon:    '#3A1A24',  // rich dark maroon

  textPrimary:   '#3A1A24',  // dark maroon heading
  textSecondary: '#8A7A7E',
  textMuted:     '#8E7E82',

  seatAvailable: '#F0E0E2',
  seatBooked:    '#3A1A24',
  seatSelected:  '#C82A3A',

  white:         '#FFFFFF',
  tabBar:        '#FFFFFF',
} as const;

export const Spacing = {
  xs:  4,
  sm:  8,
  md:  16,
  lg:  24,
  xl:  32,
  xxl: 48,
} as const;

export const Radius = {
  sm:   6,
  md:   12,
  lg:   20,
  xl:   28,
  pill: 50,
} as const;

export const FontSize = {
  xs:   11,
  sm:   13,
  md:   15,
  lg:   18,
  xl:   22,
  xxl:  28,
  hero: 34,
} as const;
