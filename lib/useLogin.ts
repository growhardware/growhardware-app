// lib/useLogin.ts
import { useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BACKEND_URL } from "@env";

export function useLogin() {
  const [loading, setLoading] = useState(false);

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    try {
      const response = await axios.put(`${BACKEND_URL}/api/v1/entrance/login`, {
        emailAddress: email,
        password: password,
      });

      const { token } = response.data;
      await AsyncStorage.setItem("token", token);
      return true;

    } catch (error: any) {
      console.error("Login error:", error?.response?.data || error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
}
