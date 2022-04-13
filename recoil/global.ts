import { atom } from "recoil";

export const userAtom = atom<undefined>({
  key: "user",
  default: undefined,
});
