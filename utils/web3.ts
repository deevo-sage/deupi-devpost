import AsyncStorage from '@react-native-async-storage/async-storage';
import { ethers, Wallet } from 'ethers';
import { Chains } from './types';

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

export const providers = {
  matic: 'VN01mOagNw5pWRtbuOdNOBr8dKS27zhp',
  maticmum: 'yxZmPA3sV8sdkDNYWzvRMZEvRiyKhwt-',
  homestead: 'GamugAUazA5YnYqAEYtXZji3lNU2rg3A',
};
export const getProvider = (val: Chains = 'maticmum') => {
  return new ethers.providers.AlchemyProvider(val, providers[val]);
};
