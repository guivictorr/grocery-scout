import { useState } from "react";
import { Text, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import mutations from "@/lib/mutations";
import CurrencyInput from "../components/currency-input";

export function NewPrice() {
  const [price, setPrice] = useState(0);

  const queryClient = useQueryClient();
  const { marketId, productId } = useLocalSearchParams();

  const { mutate: createPriceMutation, isPending } = useMutation(
    mutations.createPrice(),
  );

  function handleNewPrice() {
    createPriceMutation(
      {
        price_cents: price,
        marketId: Number(marketId),
        productId: Number(productId),
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["markets"] });
          queryClient.invalidateQueries({ queryKey: ["prices", marketId] });
          router.back();
        },
      },
    );
  }

  return (
    <View className="flex-1 h-[380px] w-full px-6 pt-12">
      <Text className="text-4xl font-medium mb-8">Preço</Text>
      <CurrencyInput
        readOnly={isPending}
        onBlur={handleNewPrice}
        onValueChange={setPrice}
      />
    </View>
  );
}
