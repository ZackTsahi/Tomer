import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import { I18nProvider } from '@/i18n/I18nProvider';
import { CartProvider } from '@/state/CartContext';
import { SavedProvider } from '@/state/SavedContext';
import { colors } from '@/theme';
import { useBrandFonts } from '@/theme/useBrandFonts';

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function RootLayout() {
  const ready = useBrandFonts();

  useEffect(() => {
    if (ready) SplashScreen.hideAsync().catch(() => {});
  }, [ready]);

  if (!ready) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <I18nProvider>
          <SavedProvider>
            <CartProvider>
              <StatusBar style="dark" />
              <Stack
                screenOptions={{
                  headerShown: false,
                  contentStyle: { backgroundColor: colors.parchment },
                  animation: 'fade',
                }}
              >
                <Stack.Screen name="(tabs)" />
                <Stack.Screen
                  name="product/[slug]"
                  options={{ animation: 'slide_from_bottom' }}
                />
                <Stack.Screen name="cart" options={{ presentation: 'modal' }} />
                <Stack.Screen name="about" />
              </Stack>
            </CartProvider>
          </SavedProvider>
        </I18nProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
