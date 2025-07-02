// // app/device/editDevice.tsx
// import { useState, useEffect } from "react";
// import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
// import { getDevice, patchDevice } from "../../lib/deviceService";

// type Props = {
//   deviceId: string;
//   onUpdated: () => void;
// };

// export default function EditDevice({ deviceId, onUpdated }: Props) {
//   const [alias, setAlias] = useState("");
//   const [kind, setKind] = useState("");
//   const [port, setPort] = useState("");
//   const [loading, setLoading] = useState(false);

//   const fetchDevice = async () => {
//     try {
//       const data = await getDevice(deviceId);
//       setAlias(data.alias);
//       setKind(data.kind);
//       setPort(data.port);
//     } catch (error) {
//       console.error("Error al cargar dispositivo:", error);
//       Alert.alert("Error", "No se pudo cargar el dispositivo.");
//     }
//   };

//   useEffect(() => {
//     fetchDevice();
//   }, [deviceId]);

//   const handleUpdate = async () => {
//     setLoading(true);
//     try {
//       await patchDevice(deviceId, { alias, kind, port });
//       Alert.alert("✅ Dispositivo actualizado", "Los cambios fueron guardados.");
//       onUpdated();
//     } catch (error) {
//       console.error("Error al actualizar dispositivo:", error);
//       Alert.alert("Error", "No se pudo actualizar el dispositivo.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <View className="bg-neutral-900 p-4 rounded mb-6">
//       <Text className="text-white text-lg mb-2">Editar dispositivo</Text>

//       <TextInput
//         className="bg-white p-3 rounded mb-2"
//         placeholder="Alias"
//         onChangeText={setAlias}
//         value={alias}
//       />

//       <TextInput
//         className="bg-white p-3 rounded mb-2"
//         placeholder="Tipo"
//         onChangeText={setKind}
//         value={kind}
//       />

//       <TextInput
//         className="bg-white p-3 rounded mb-4"
//         placeholder="Puerto"
//         onChangeText={setPort}
//         value={port}
//       />

//       <TouchableOpacity
//         className={`py-3 rounded ${loading ? "bg-gray-400" : "bg-blue-600"}`}
//         onPress={handleUpdate}
//         disabled={loading}
//       >
//         <Text className="text-white text-center text-lg">
//           {loading ? "Guardando..." : "Guardar cambios"}
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

import { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { getDevice, patchDevice } from "../../lib/deviceService";

type Props = {
  deviceId: string;
  onUpdated: () => void;
};

export default function EditDevice({ deviceId, onUpdated }: Props) {
  const [alias, setAlias] = useState("");
  const [kind, setKind] = useState("");
  const [port, setPort] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const data = await getDevice(deviceId);
        setAlias(data.alias);
        setKind(data.kind);
        setPort(data.port);
      } catch (error) {
        Alert.alert("Error", "No se pudo cargar el dispositivo.");
      }
    })();
  }, [deviceId]);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      await patchDevice(deviceId, { alias, kind, port });
      Alert.alert("✅ Dispositivo actualizado", "Los cambios fueron guardados.");
      onUpdated();
    } catch (error) {
      Alert.alert("Error", "No se pudo actualizar el dispositivo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="bg-neutral-900 p-4 rounded mb-6">
      <Text className="text-white text-lg mb-2">Editar dispositivo</Text>
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
        className={`py-3 rounded ${loading ? "bg-gray-400" : "bg-blue-600"}`}
        onPress={handleUpdate}
        disabled={loading}
      >
        <Text className="text-white text-center text-lg">
          {loading ? "Guardando..." : "Guardar cambios"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
