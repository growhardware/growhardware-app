// app/device/photo.tsx
import { useEffect, useState } from "react";
import { View, Text, Image, ActivityIndicator, TouchableOpacity, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../navigation/AppNavigator";

export default function DevicePhotoScreen() {
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute();
  const { deviceId } = route.params as { deviceId: string };

  const fetchPhoto = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const res = await axios.get(
        `https://backend-production-98b7.up.railway.app/api/photo/get-photo?deviceId=${deviceId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPhotoUrl(res.data?.url);
    } catch (err) {
      console.error("Error al cargar foto:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPhoto();
  }, [deviceId]);

  return (
    <ScrollView className="flex-1 bg-black p-6">
      <TouchableOpacity onPress={() => navigation.goBack()} className="mb-4">
        <Text className="text-green-400">⬅️ Volver</Text>
      </TouchableOpacity>

      <Text className="text-white text-2xl mb-4">📸 Última Foto del Módulo</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#00ff99" />
      ) : photoUrl ? (
        <Image
          source={{ uri: photoUrl }}
          style={{ width: "100%", height: 300, borderRadius: 10 }}
          resizeMode="cover"
        />
      ) : (
        <Text className="text-white">No se encontró imagen disponible.</Text>
      )}
    </ScrollView>
  );
}
