import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, Text, TextInput, View } from "react-native";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/lib/queries";
import { useLocation } from "../hooks/use-location";
import mutations from "@/lib/mutations";

export function NewMarket() {
  const queryClient = useQueryClient();
  const [marketName, setMarketName] = useState("");
  const location = useLocation();

  const { mutate } = useMutation(mutations.createMarket());

  function handleNewMarket() {
    if (!location) {
      return Alert.alert("Permissão para acessar localização negada");
    }

    mutate(
      {
        name: marketName,
        lat: location.coords.latitude,
        lon: location.coords.longitude,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: queryKeys.markets });
          router.back();
        },
      },
    );
  }

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
