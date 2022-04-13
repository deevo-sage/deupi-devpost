import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { extendTheme, Flex, NativeBaseProvider } from "native-base";
import * as React from "react";
import { StyleSheet } from "react-native";
import { Login, Signup } from "../screens/auth";
import NotFoundScreen from "../screens/NotFoundScreen";
import { RootStackParamList } from "../utils/types";
// import LinkingConfiguration from "./LinkingConfiguration";
const config = {
  useSystemColorMode: false,
  initialColorMode: "dark",
};
const customTheme = extendTheme({ config });
export default function Navigation({}: {}) {
  return (
    <NativeBaseProvider theme={customTheme}>
      <NavigationContainer
        // linking={LinkingConfiguration}
        theme={DarkTheme}
      >
        <RootNavigator />
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    // @ts-ignore:next-line
    <Stack.Navigator
      initialRouteName="Signup"
      screenOptions={{
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
        },
      }}
    >
      <Stack.Screen
        name="Root"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{
          headerShadowVisible: false,
          headerShown: true,
          headerTitle: "",
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
    </Stack.Navigator>
  );
}
const styles = StyleSheet.create({ header: { alignItems: "center" } });
