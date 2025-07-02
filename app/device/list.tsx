import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from "react-native";
import { getMyDevices, deleteDevice } from "../../lib/deviceService";
import AddDevice from "./addDevice";
import EditDevice from "./editDevice";
import DeviceStatusScreen from "./status";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigator";


const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

export default function DeviceListScreen() {
  const [devices, setDevices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [viewingId, setViewingId] = useState<string | null>(null);

  const fetchDevices = async () => {
    setLoading(true);
    try {
      const result = await getMyDevices();
      setDevices(result);
    } catch (error) {
      console.error("Error al cargar dispositivos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    Alert.alert("¿Eliminar?", "¿Estás seguro de que querés eliminar este dispositivo?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteDevice(id);
            setEditingId(null);
            setViewingId(null);
            fetchDevices();
          } catch (err) {
            Alert.alert("Error", "No se pudo eliminar el dispositivo.");
          }
        },
      },
    ]);
  };

  useEffect(() => {
    fetchDevices();
  }, []);

  if (viewingId) {
    return (
      <DeviceStatusScreen
        deviceId={viewingId}
        onBack={() => {
          setViewingId(null);
          fetchDevices();
        }}
      />
    );
  }

  if (editingId) {
    return (
      <EditDevice
        deviceId={editingId}
        onUpdated={() => {
          setEditingId(null);
          fetchDevices();
        }}
      />
    );
  }

  return (
    <ScrollView className="flex-1 bg-black p-6">
      <Text className="text-white text-2xl mb-4">Mis dispositivos 🌱</Text>

      <AddDevice onCreated={fetchDevices} />

      {loading ? (
        <ActivityIndicator size="large" color="#00ff99" />
      ) : devices.length === 0 ? (
        <Text className="text-white">No tenés dispositivos registrados.</Text>
      ) : (
        devices.map((device) => (
          <View key={device.id} className="bg-neutral-800 rounded p-4 mb-3">
            <Text className="text-white text-lg font-bold mb-1">{device.alias || device.id}</Text>
            <Text className="text-white text-sm">Tipo: {device.kind}</Text>
            <Text className="text-white text-sm mb-2">Puerto: {device.port}</Text>

            <View className="flex-row gap-4">
              <TouchableOpacity onPress={() => navigation.navigate("DeviceStatus", { deviceId: device.id })}>
                    <Text className="text-green-400">📊 Ver estado</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("DeviceStatus", { deviceId: device.id })}>
                    <Text className="text-blue-400">✏️ Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("DeviceStatus", { deviceId: device.id })}>
                    <Text className="text-red-400">🗑️ Eliminar</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );
}
