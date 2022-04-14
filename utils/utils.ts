import Clipboard from "@react-native-clipboard/clipboard";
import { Alert } from "react-native";

export const debounce = (fn: any, ms: number) => {
  let temp: any = undefined;
  return (val: any) => {
    clearTimeout(temp);
    temp = setTimeout(() => fn(val), ms);
  };
};

export const shrinkAddress = (s: string) =>
  s.substring(0, 6) + "..." + s.substring(s.length - 4);

export const CopyToClipboard = (address: string) => {
  Clipboard.setString(address);
  Alert.alert("Successfully copied to clipboard");
};
