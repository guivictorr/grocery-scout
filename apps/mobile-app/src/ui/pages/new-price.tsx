import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";
import CurrencyInput from "../components/currency-input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/api/api-client";
import { PriceDto } from "@/lib/react-query";

interface NewPriceRequest {
  price_cents: number;
  productId: number;
  marketId: number;
}

export function NewPrice() {
  const [price, setPrice] = useState(0);

  const queryClient = useQueryClient();
  const { marketId, productId } = useLocalSearchParams();

  const { mutate: createPriceMutation } = useMutation({
    mutationFn: (data: NewPriceRequest) =>
      api.post<NewPriceRequest, PriceDto>("prices", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["markets"] });
      queryClient.invalidateQueries({ queryKey: ["prices", marketId] });
      router.back();
    },
  });

  function handleNewPrice() {
    createPriceMutation({
      price_cents: price,
      marketId: Number(marketId),
      productId: Number(productId),
    });
  }

  return (
    <View className="flex-1 h-[380px] w-full px-6 pt-12">
      <Text className="text-4xl font-medium mb-8">Preço</Text>
      <CurrencyInput onBlur={handleNewPrice} onValueChange={setPrice} />
    </View>
  );
}
