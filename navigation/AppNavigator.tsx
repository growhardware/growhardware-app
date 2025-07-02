// navigation/AppNavigator.tsx
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import LoginScreen from "../app/login";
import Dashboard from "../app/Dashboard";
import DeviceListScreen from "../app/device/list";
import DeviceStatusScreen from "../app/device/status";
import DevicePhotoScreen from "../app/device/photo";


export type RootStackParamList = {
  Login: undefined;
  Dashboard: undefined;
  Devices: undefined;
  DeviceStatus: { deviceId: string };
  DevicePhoto: { deviceId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const [initialRoute, setInitialRoute] = useState<keyof RootStackParamList>("Login");

  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem("token");
      setInitialRoute(token ? "Dashboard" : "Login");
    })();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute} screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Devices" component={DeviceListScreen} />
        <Stack.Screen name="DeviceStatus" component={DeviceStatusScreen} />
        <Stack.Screen name="DevicePhoto" component={DevicePhotoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
