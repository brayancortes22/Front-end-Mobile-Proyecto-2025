import React from 'react';
import { registerRootComponent } from 'expo';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider } from 'react-native-paper';
import Toast from 'react-native-toast-message';

import { theme } from './src/constants/theme';
import AppNavigator from './src/navigation/AppNavigator';
import { AuthProvider } from './src/context/AuthContext';

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <AuthProvider>
        <SafeAreaProvider>
          <StatusBar style="light" backgroundColor="#6AB344" />
          <AppNavigator />
          <Toast />
        </SafeAreaProvider>
      </AuthProvider>
    </PaperProvider>
  );
}

registerRootComponent(App);