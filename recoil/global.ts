import { atom } from 'recoil';
import { Chains } from '../utils/types';

export const userAtom = atom<undefined>({
  key: 'user',
  default: undefined,
});
export const Chain = atom<Chains>({
  default: 'maticmum',
  key: 'chain',
});
