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

const providers = {
  matic: '',
  maticmum: 'yxZmPA3sV8sdkDNYWzvRMZEvRiyKhwt-',
  homestead: '',
  kovan: '',
};
export const getProvider = (
  val: 'matic' | 'maticmum' | 'homestead' | 'kovan' = 'maticmum',
) => {
  return new ethers.providers.AlchemyProvider(val, providers[val]);
};
