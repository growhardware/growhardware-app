// app/device/status.tsx
import { useEffect, useState } from "react";
import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../navigation/AppNavigator";

type DeviceStatus = {
  temperature: number;
  humidity: number;
  light: boolean;
  phase: string;
  relays: {
    light: boolean;
    humidifier: boolean;
    irrigation: boolean;
  };
};

export default function DeviceStatusScreen() {
  const [status, setStatus] = useState<DeviceStatus | null>(null);
  const [loading, setLoading] = useState(true);

  const route = useRoute();
  const { deviceId } = route.params as { deviceId: string };

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const fetchStatus = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      const res = await axios.get(`https://backend-production-98b7.up.railway.app/${deviceId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStatus(res.data.status);
    } catch (err) {
      console.error("Error al obtener status:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, [deviceId]);

  if (loading || !status) {
    return (
      <View className="flex-1 justify-center items-center bg-black">
        <ActivityIndicator size="large" color="#00ff99" />
        <Text className="text-white mt-4">Cargando datos del módulo...</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-black p-6">
      <TouchableOpacity onPress={() => navigation.goBack()} className="mb-4">
        <Text className="text-green-400">⬅️ Volver</Text>
      </TouchableOpacity>

      <Text className="text-white text-2xl mb-4">Estado del Dispositivo 🌱</Text>
      <Text className="text-white text-lg">🌡️ Temperatura: {status.temperature} °C</Text>
      <Text className="text-white text-lg">💧 Humedad: {status.humidity} %</Text>
      <Text className="text-white text-lg">💡 Luz: {status.light ? "Encendida" : "Apagada"}</Text>
      <Text className="text-white text-lg">🌀 Fase: {status.phase}</Text>
      <Text className="text-white mt-4">⚙️ Relés:</Text>
      <Text className="text-white">🔌 Luz: {status.relays.light ? "ON" : "OFF"}</Text>
      <Text className="text-white">💦 Humidificador: {status.relays.humidifier ? "ON" : "OFF"}</Text>
      <Text className="text-white">🌊 Riego: {status.relays.irrigation ? "ON" : "OFF"}</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate("DevicePhoto", { deviceId })}
        className="mt-6 bg-blue-600 rounded px-4 py-3"
        >
        <Text className="text-white text-center text-lg">📸 Ver última foto</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}
