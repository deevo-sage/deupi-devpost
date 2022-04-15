import { atom } from "recoil";
import { Chains } from "../utils/types";

export const userAtom = atom<undefined>({
  key: "user",
  default: undefined,
});
export const Chain = atom<Chains>({
  default: "maticmum",
  key: "chain",
});
export const phraseAtom = atom<string | undefined>({
  default:
    "wolf better side problem train person turkey render canoe civil crazy gravity",
  key: "phrase",
});
