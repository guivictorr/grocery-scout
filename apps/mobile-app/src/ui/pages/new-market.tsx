import {
  getCurrentPositionAsync,
  LocationObject,
  requestForegroundPermissionsAsync,
} from "expo-location";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, Text, TextInput, View } from "react-native";
import queries, { MarketDto } from "@/lib/react-query";
import { api } from "@/api/api-client";

interface NewMarketRequest {
  name: string;
  lat: number;
  lon: number;
}

export function NewMarket() {
  const queryClient = useQueryClient();
  const [location, setLocation] = useState<LocationObject | null>(null);
  const [marketName, setMarketName] = useState("");
  const { mutate } = useMutation({
    mutationFn: (data: NewMarketRequest) =>
      api.post<NewMarketRequest, MarketDto>("markets", data),
    onSuccess: () => {
      queryClient.invalidateQueries(queries.listMarketsQuery);
      router.back();
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
      const { status } = await requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permissão para acessar localização negada");
        return;
      }

      const location = await getCurrentPositionAsync();
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
