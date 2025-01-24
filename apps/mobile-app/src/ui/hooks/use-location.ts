import { useState, useEffect } from "react";
import { Alert } from "react-native";
import {
  LocationObject,
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
} from "expo-location";

export function useLocation() {
  const [location, setLocation] = useState<LocationObject | null>(null);
  useEffect(() => {
    async function getCurrentLocation() {
      const { status } = await requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return Alert.alert("Permissão para acessar localização negada");
      }

      const location = await getCurrentPositionAsync();
      setLocation(location);
    }

    getCurrentLocation();
  }, []);

  return location;
}
