// app/login.tsx
import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useLogin } from "../lib/useLogin";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading } = useLogin();

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleLogin = async () => {
    const ok = await login(email, password);
    if (ok) {
      navigation.replace("Dashboard");
    } else {
      Alert.alert("Error", "Credenciales incorrectas o fallo de conexión.");
    }
  };

  return (
    <View className="flex-1 justify-center items-center px-6 bg-neutral-950">
      <Text className="text-white text-2xl mb-6">GrowHardware Login</Text>

      <TextInput
        className="w-full bg-white rounded p-3 mb-4"
        placeholder="Email"
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        className="w-full bg-white rounded p-3 mb-6"
        placeholder="Contraseña"
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity
        className={`bg-green-600 px-6 py-3 rounded ${loading ? "opacity-50" : ""}`}
        onPress={handleLogin}
        disabled={loading}
      >
        <Text className="text-white text-lg">{loading ? "Cargando..." : "Iniciar sesión"}</Text>
      </TouchableOpacity>
    </View>
  );
}
