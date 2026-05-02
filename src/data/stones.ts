import type { Stone } from '@/types/product';
import { colors } from '@/theme/colors';

export const stoneMeta: Record<
  Stone,
  { label: string; labelHe: string; swatch: string }
> = {
  ruby: { label: 'Ruby', labelHe: 'אודם', swatch: colors.ruby },
  emerald: { label: 'Emerald', labelHe: 'אזמרגד', swatch: colors.emerald },
  sapphire: { label: 'Sapphire', labelHe: 'ספיר', swatch: colors.sapphire },
  onyx: { label: 'Onyx', labelHe: 'אוניקס', swatch: colors.onyx },
  tigerEye: { label: "Tiger's Eye", labelHe: 'עין הנמר', swatch: '#8C5A1F' },
  turquoise: { label: 'Turquoise', labelHe: 'טורקיז', swatch: '#3E8C8C' },
  pearl: { label: 'Pearl', labelHe: 'פנינה', swatch: '#E9E2D2' },
  lapis: { label: 'Lapis', labelHe: 'לאפיס', swatch: '#234A7A' },
  garnet: { label: 'Garnet', labelHe: 'גארנט', swatch: '#5A1620' },
  agate: { label: 'Agate', labelHe: 'אגת', swatch: '#6B4226' },
};

export const allStones = Object.keys(stoneMeta) as Stone[];
