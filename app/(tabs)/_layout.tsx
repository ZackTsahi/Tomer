import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Platform, View } from 'react-native';
import { BlurView } from 'expo-blur';
import { useT } from '@/i18n/I18nProvider';
import { colors, fontFamilies } from '@/theme';

export default function TabsLayout() {
  const t = useT();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.charcoal,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarLabelStyle: {
          fontFamily: fontFamilies.sansMedium,
          fontSize: 10,
          letterSpacing: 1.2,
          textTransform: 'uppercase',
        },
        tabBarStyle: {
          position: 'absolute',
          borderTopColor: colors.divider,
          backgroundColor:
            Platform.OS === 'ios' ? 'transparent' : colors.parchment,
          height: 84,
          paddingTop: 8,
          paddingBottom: 24,
        },
        tabBarBackground: () =>
          Platform.OS === 'ios' ? (
            <BlurView
              intensity={80}
              tint="light"
              style={{ flex: 1, backgroundColor: 'rgba(245,240,230,0.8)' }}
            />
          ) : (
            <View style={{ flex: 1, backgroundColor: colors.parchment }} />
          ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t.nav.home,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="diamond-outline" size={size - 2} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="shop"
        options={{
          title: t.nav.shop,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="grid-outline" size={size - 2} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="gallery"
        options={{
          title: t.nav.gallery,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="images-outline" size={size - 2} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="custom"
        options={{
          title: t.nav.custom,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="sparkles-outline" size={size - 2} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: t.nav.saved,
          href: null,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bookmark-outline" size={size - 2} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: t.nav.account,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size - 2} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
