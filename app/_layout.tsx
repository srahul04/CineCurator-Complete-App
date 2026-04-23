import React, { useState } from 'react';
import { Stack } from 'expo-router';
import { BookingProvider } from '../context/BookingContext';
import { StatusBar } from 'expo-status-bar';
import SplashScreen from '../components/SplashScreen';
import { Colors } from '../constants/theme';

export default function RootLayout() {
  const [isAppReady, setIsAppReady] = useState(false);

  if (!isAppReady) {
    return <SplashScreen onFinish={() => setIsAppReady(true)} />;
  }

  return (
    <BookingProvider>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: Colors.background },
          animation: 'slide_from_right',
        }}
      />
    </BookingProvider>
  );
}
