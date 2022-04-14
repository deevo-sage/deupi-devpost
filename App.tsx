import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useCachedResources from './hooks/useCachedResources';
import Navigation from './navigation';
import { registerRootComponent } from 'expo';
export default function App() {
  const isLoadingComplete = useCachedResources();
  if (isLoadingComplete) {
    return <></>;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
registerRootComponent(App);
