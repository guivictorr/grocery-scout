import { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useMutation } from "@tanstack/react-query";

import mutations from "@/lib/mutations";

export function NewProduct() {
  const [productName, setProductName] = useState("");

  const { ean, marketId } = useLocalSearchParams();

  const { mutate, isPending } = useMutation(mutations.createProduct());

  function handleNewProduct() {
    mutate(
      {
        ean: ean.toString(),
        name: productName,
      },
      {
        onSuccess: ({ data }) => {
          router.replace({
            pathname: "/new-price",
            params: { marketId, productId: data.id },
          });
        },
      },
    );
  }

  return (
    <View className="flex-1 h-[380px] w-full px-6 pt-12">
      <Text className="text-4xl font-medium mb-8">Nome do produto</Text>
      <TextInput
        placeholder="Arroz Urbano 1kg"
        className="w-full text-6xl text-gray-600 h-full"
        autoFocus
        multiline
        onChangeText={setProductName}
        numberOfLines={4}
        onSubmitEditing={handleNewProduct}
        returnKeyType="next"
        submitBehavior="blurAndSubmit"
        scrollEnabled={false}
        readOnly={isPending}
      />
    </View>
  );
}
