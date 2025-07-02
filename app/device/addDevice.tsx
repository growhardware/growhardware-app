// // app/device/addDevice.tsx
// import { useState } from "react";
// import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
// import { postDevice } from "../../lib/deviceService";

// type Props = {
//   onCreated: () => void;
// };

// export default function AddDevice({ onCreated }: Props) {
//   const [alias, setAlias] = useState("");
//   const [kind, setKind] = useState("");
//   const [port, setPort] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleAdd = async () => {
//     if (!alias || !kind || !port) {
//       return Alert.alert("Error", "Todos los campos son obligatorios.");
//     }

//     setLoading(true);
//     try {
//       await postDevice({ alias, kind, port });
//       Alert.alert("✅ Dispositivo creado", "Tu módulo fue registrado correctamente.");
//       setAlias("");
//       setKind("");
//       setPort("");
//       onCreated(); // actualiza lista de dispositivos
//     } catch (err: any) {
//       console.error("Error al registrar dispositivo:", err?.response?.data || err.message);
//       Alert.alert("Error", "No se pudo registrar el dispositivo.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <View className="bg-neutral-900 p-4 rounded mb-6">
//       <Text className="text-white text-lg mb-2">Agregar nuevo dispositivo</Text>

//       <TextInput
//         className="bg-white p-3 rounded mb-2"
//         placeholder="Alias (ej: Indoor Propagation)"
//         onChangeText={setAlias}
//         value={alias}
//       />

//       <TextInput
//         className="bg-white p-3 rounded mb-2"
//         placeholder="Tipo (ej: propagation-module)"
//         onChangeText={setKind}
//         value={kind}
//       />

//       <TextInput
//         className="bg-white p-3 rounded mb-4"
//         placeholder="Puerto (ej: USB1 / COM3 / GPIO)"
//         onChangeText={setPort}
//         value={port}
//       />

//       <TouchableOpacity
//         className={`py-3 rounded ${loading ? "bg-gray-400" : "bg-green-600"}`}
//         onPress={handleAdd}
//         disabled={loading}
//       >
//         <Text className="text-white text-center text-lg">
//           {loading ? "Agregando..." : "Agregar"}
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { postDevice } from "../../lib/deviceService";

type Props = {
  onCreated: () => void;
};

export default function AddDevice({ onCreated }: Props) {
  const [alias, setAlias] = useState("");
  const [kind, setKind] = useState("");
  const [port, setPort] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    if (!alias || !kind || !port) {
      return Alert.alert("Error", "Todos los campos son obligatorios.");
    }

    setLoading(true);
    try {
      await postDevice({ alias, kind, port });
      Alert.alert("✅ Dispositivo creado", "Tu módulo fue registrado correctamente.");
      setAlias("");
      setKind("");
      setPort("");
      onCreated();
    } catch (err: any) {
      console.error("Error al registrar dispositivo:", err?.response?.data || err.message);
      Alert.alert("Error", "No se pudo registrar el dispositivo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="bg-neutral-900 p-4 rounded mb-6">
      <Text className="text-white text-lg mb-2">Agregar nuevo dispositivo</Text>
      <TextInput
        className="bg-white p-3 rounded mb-2"
        placeholder="Alias"
        onChangeText={setAlias}
        value={alias}
      />
      <TextInput
        className="bg-white p-3 rounded mb-2"
        placeholder="Tipo"
        onChangeText={setKind}
        value={kind}
      />
      <TextInput
        className="bg-white p-3 rounded mb-4"
        placeholder="Puerto"
        onChangeText={setPort}
        value={port}
      />
      <TouchableOpacity
        className={`py-3 rounded ${loading ? "bg-gray-400" : "bg-green-600"}`}
        onPress={handleAdd}
        disabled={loading}
      >
        <Text className="text-white text-center text-lg">
          {loading ? "Agregando..." : "Agregar"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

