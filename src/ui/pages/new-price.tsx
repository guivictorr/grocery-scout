import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";
import CurrencyInput from "../components/currency-input";
import { useMutation } from "@tanstack/react-query";
import { createPrice } from "@/infra/database";

export function NewPrice() {
  const [price, setPrice] = useState(0);

  const { marketId, productId } = useLocalSearchParams();

  const { mutate: createPriceMutation } = useMutation({
    mutationFn: createPrice,
    onSuccess: (data) => {
      console.log(data);
      router.back();
    },
  });

  function handleNewPrice() {
    createPriceMutation({
      price,
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
