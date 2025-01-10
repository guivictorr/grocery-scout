import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createProduct, getProductByEan } from "@/infra/database";

export function NewProduct() {
  const [productName, setProductName] = useState("");

  const { ean, marketId } = useLocalSearchParams();

  const queryClient = useQueryClient();
  const { mutate: createProductMutation } = useMutation({
    mutationFn: createProduct,
    onSuccess: ({ insertedRowId }) => {
      console.log(insertedRowId);
      queryClient.invalidateQueries({ queryKey: ["products"] });
      router.replace({
        pathname: "/new-price",
        params: { marketId, productId: insertedRowId },
      });
    },
  });

  function handleNewProduct() {
    createProductMutation({
      ean: ean.toString(),
      name: productName,
    });
  }

  return (
    <View className="flex-1 h-[380px] w-full px-6 pt-12">
      <Text className="text-4xl font-medium mb-8">Nome do produto</Text>
      <TextInput
        placeholder="Arroz Urbano 1kg"
        className="w-full text-6xl text-gray-600"
        autoFocus
        multiline
        onChangeText={setProductName}
        numberOfLines={4}
        onSubmitEditing={handleNewProduct}
        returnKeyType="next"
        submitBehavior="blurAndSubmit"
      />
    </View>
  );
}
