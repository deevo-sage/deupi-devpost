import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {} from 'expo';
import useCachedResources from './hooks/useCachedResources';
import Navigation from './navigation';
export default function App() {
  const isLoadingComplete = useCachedResources();
  useEffect(() => {}, []);
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
