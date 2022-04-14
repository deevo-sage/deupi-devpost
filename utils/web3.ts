import AsyncStorage from '@react-native-async-storage/async-storage';
import { ethers, Wallet } from 'ethers';

export const killSession = async (set: any) => {};
export const walletFromPhrase = (
  provider: ethers.providers.Provider,
  phrase: string,
) => {
  try {
    const mwal = ethers.Wallet.fromMnemonic(phrase);
    return new ethers.Wallet(mwal.privateKey, provider);
  } catch (e) {
    return undefined;
  }
};
