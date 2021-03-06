import AsyncStorage from '@react-native-async-storage/async-storage';
import { ethers, providers } from 'ethers';
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

export const provider = {
  matic: 'VN01mOagNw5pWRtbuOdNOBr8dKS27zhp',
  maticmum: 'yxZmPA3sV8sdkDNYWzvRMZEvRiyKhwt-',
  homestead: 'GamugAUazA5YnYqAEYtXZji3lNU2rg3A',
};
export const getProvider = (val: Chains = 'maticmum') => {
  return new providers.AlchemyProvider(val, provider[val]);
};

export const ABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'string',
        name: 'x',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'y',
        type: 'uint256',
      },
    ],
    name: 'Payment',
    type: 'event',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'to',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'val',
        type: 'uint256',
      },
    ],
    name: 'pay',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'retrieve',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];
