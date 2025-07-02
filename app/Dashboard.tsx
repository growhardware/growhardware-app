// app/dashboard.tsx
import { View, Text, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";

export default function Dashboard() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    navigation.replace("Login");
  };

  return (
    <View className="flex-1 justify-center items-center bg-black p-6">
      <Text className="text-white text-2xl mb-6">GrowHardware Dashboard 🌱</Text>

      <TouchableOpacity
        className="bg-green-600 px-6 py-3 rounded mb-4"
        onPress={() => navigation.navigate("Devices")}
      >
        <Text className="text-white text-lg">🔧 Gestionar Dispositivos</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="bg-red-600 px-6 py-3 rounded"
        onPress={handleLogout}
      >
        <Text className="text-white text-lg">🔓 Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
}
