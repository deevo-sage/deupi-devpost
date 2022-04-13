import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName, Pressable } from "react-native";
import { Login } from "../screens/auth";
import NotFoundScreen from "../screens/NotFoundScreen";
import { RootStackParamList } from "../utils/types";
// import LinkingConfiguration from "./LinkingConfiguration";

export default function Navigation({}: {}) {
  return (
    <NavigationContainer
    // linking={LinkingConfiguration}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    // @ts-ignore:next-line
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
    </Stack.Navigator>
  );
}
