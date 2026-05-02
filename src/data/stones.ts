import type { Stone } from '@/types/product';
import { colors } from '@/theme/colors';

export const stoneMeta: Record<
  Stone,
  { label: string; labelHe: string; swatch: string }
> = {
  diamond: { label: 'Diamond', labelHe: 'יהלום', swatch: '#E8E8EA' },
  ruby: { label: 'Ruby', labelHe: 'אודם', swatch: colors.ruby },
  emerald: { label: 'Emerald', labelHe: 'אזמרגד', swatch: colors.emerald },
  sapphire: { label: 'Sapphire', labelHe: 'ספיר', swatch: colors.sapphire },
  onyx: { label: 'Onyx', labelHe: 'אוניקס', swatch: colors.onyx },
  pinkTourmaline: { label: 'Pink Tourmaline', labelHe: 'טורמלין ורוד', swatch: '#D85C8A' },
  peridot: { label: 'Peridot', labelHe: 'פרידוט', swatch: '#9BC848' },
  tigerEye: { label: "Tiger's Eye", labelHe: 'עין הנמר', swatch: '#B8763D' },
  turquoise: { label: 'Turquoise', labelHe: 'טורקיז', swatch: '#1B9E9E' },
  pearl: { label: 'Pearl', labelHe: 'פנינה', swatch: '#E9DFC9' },
  lapis: { label: 'Lapis', labelHe: 'לאפיס', swatch: '#143A82' },
  garnet: { label: 'Garnet', labelHe: 'גארנט', swatch: colors.garnet },
  agate: { label: 'Agate', labelHe: 'אגת', swatch: '#6B4226' },
};

export const allStones = Object.keys(stoneMeta) as Stone[];
