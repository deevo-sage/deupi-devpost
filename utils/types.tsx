/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Login: NavigatorScreenParams<RootTabParamList> | undefined;
  Signup: undefined;
  Import: undefined;
  Congo: undefined;
  Home: undefined;
  Modal: undefined;
  NotFound: undefined;
  Pay: { toPay?: string; receiverAccepts?: "UPI" | "CRYPTO" };
  Success: {
    payedTo?: string;
    amount?: number;
    crypto?: string;
    receiverAccepted?: "CRYPTO" | "UPI";
  };
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
  TabOne: undefined;
  TabTwo: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;
export type Chains = "matic" | "maticmum" | "homestead";
