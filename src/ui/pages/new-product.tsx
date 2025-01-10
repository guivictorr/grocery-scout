import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Text, TextInput, View } from "react-native";
import CurrencyInput from "../components/currency-input";

export function NewProduct() {
  const [step, setStep] = useState("name");
  const params = useLocalSearchParams();
  const ean = params.ean;

  return (
    <>
      {step === "name" && (
        <View className="flex-1 h-[380px] w-full px-6 pt-12">
          <Text className="text-4xl font-medium mb-8">Nome do produto</Text>
          <TextInput
            placeholder="Arroz Urbano 1kg"
            className="w-full text-6xl text-gray-600"
            autoFocus
            multiline
            numberOfLines={4}
            onSubmitEditing={() => setStep("price")}
            returnKeyType="next"
            submitBehavior="blurAndSubmit"
          />
        </View>
      )}
      {step === "price" && (
        <View className="flex-1 h-[380px] w-full px-6 pt-12">
          <Text className="text-4xl font-medium mb-8">Preço</Text>
          <CurrencyInput onBlur={() => router.back()} />
        </View>
      )}
    </>
  );
}
