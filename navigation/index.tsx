import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { extendTheme, NativeBaseProvider } from "native-base";
import * as React from "react";
import { Congo, Import, Login, Signup } from "../screens/auth";
import { Home, Pay } from "../screens/main";
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
          // @ts-ignore:next-line
          elevation: 0,
          shadowOpacity: 0,
        },
      }}
    >
      <Stack.Screen
        name="Login"
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
        name="Pay"
        component={Pay}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Import"
        component={Import}
        options={{
          headerShadowVisible: false,
          headerShown: true,
          headerTitle: "",
          headerBackTitle: "Back",
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="Congo"
        component={Congo}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: true,
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
