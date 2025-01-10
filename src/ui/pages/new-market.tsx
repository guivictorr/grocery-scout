import {
  getCurrentPositionAsync,
  LocationObject,
  requestForegroundPermissionsAsync,
  useForegroundPermissions,
} from "expo-location";
import { createMarket } from "@/infra/database";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, Text, TextInput, View } from "react-native";

export function NewMarket() {
  const queryClient = useQueryClient();
  const [location, setLocation] = useState<LocationObject | null>(null);
  const [marketName, setMarketName] = useState("");
  const { mutate } = useMutation({
    mutationFn: createMarket,
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ["markets"] });
    },
  });

  function handleNewMarket() {
    if (!location) {
      Alert.alert("Permissão para acessar localização negada");
      return;
    }
    mutate({
      name: marketName,
      lat: location.coords.latitude,
      lon: location.coords.longitude,
    });
  }

  useEffect(() => {
    async function getCurrentLocation() {
      let { status } = await requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permissão para acessar localização negada");
        return;
      }

      let location = await getCurrentPositionAsync();
      setLocation(location);
    }

    getCurrentLocation();
  }, []);

  return (
    <View className="flex-1 h-[380px] w-full px-6 pt-12">
      <Text className="text-4xl font-medium mb-8">Mercado</Text>
      <TextInput
        placeholder="Mercadinho do seu zé da esquina"
        className="w-full text-6xl text-gray-600"
        autoFocus
        multiline
        numberOfLines={4}
        onSubmitEditing={handleNewMarket}
        onChangeText={setMarketName}
        returnKeyType="next"
        submitBehavior="blurAndSubmit"
      />
    </View>
  );
}
