// lib/api.ts
import axios from "axios";
import { BACKEND_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const api = axios.create({
  baseURL: BACKEND_URL,
});

export const authHeader = async () => {
  const token = await AsyncStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};
