import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useCachedResources from './hooks/useCachedResources';
import Navigation from './navigation';
import { registerRootComponent } from 'expo';
import Layout from './constants/Layout';
export default function App() {
  const isLoadingComplete = useCachedResources();
  if (!isLoadingComplete) {
    return <></>;
  } else {
    return (
      <SafeAreaProvider style={{ height: Layout.window.height, width: '100%' }}>
        <Navigation />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
registerRootComponent(App);
