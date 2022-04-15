import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import '@ethersproject/shims';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import {} from 'expo';
import useCachedResources from './hooks/useCachedResources';
import Navigation from './navigation';
import { RecoilRoot } from 'recoil';
export default function App() {
  const isLoadingComplete = useCachedResources();
  useEffect(() => {}, []);
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <RecoilRoot initializeState={undefined}>
        <SafeAreaProvider>
          <Navigation />
          <StatusBar />
        </SafeAreaProvider>
      </RecoilRoot>
    );
  }
}
