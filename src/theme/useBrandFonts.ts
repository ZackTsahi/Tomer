import { useFonts as useInter } from '@expo-google-fonts/inter';
import { useFonts as usePlayfair } from '@expo-google-fonts/playfair-display';
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
} from '@expo-google-fonts/inter';
import {
  PlayfairDisplay_400Regular,
  PlayfairDisplay_500Medium,
} from '@expo-google-fonts/playfair-display';
import * as Font from 'expo-font';
import { useEffect, useState } from 'react';

// Loads brand typefaces from Google Fonts (bundled via npm), then aliases
// them to the family names used throughout `theme/typography.ts` so we don't
// have to thread font names through every Text component.
export function useBrandFonts(): boolean {
  const [interLoaded] = useInter({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  });
  const [playfairLoaded] = usePlayfair({
    PlayfairDisplay_400Regular,
    PlayfairDisplay_500Medium,
  });

  const [aliased, setAliased] = useState(false);

  useEffect(() => {
    if (!interLoaded || !playfairLoaded) return;
    (async () => {
      // Re-register under the names typography.ts expects.
      await Font.loadAsync({
        'Inter-Regular': Inter_400Regular,
        'Inter-Medium': Inter_500Medium,
        'Inter-SemiBold': Inter_600SemiBold,
        'PlayfairDisplay-Regular': PlayfairDisplay_400Regular,
        'PlayfairDisplay-Medium': PlayfairDisplay_500Medium,
      });
      setAliased(true);
    })().catch(() => setAliased(true));
  }, [interLoaded, playfairLoaded]);

  return aliased;
}
