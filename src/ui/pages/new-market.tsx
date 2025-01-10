import { router } from "expo-router";
import React from "react";
import { Text, TextInput, View } from "react-native";

export function NewMarket() {
  return (
    <View className="flex-1 h-[380px] w-full px-6 pt-12">
      <Text className="text-4xl font-medium mb-8">Mercado</Text>
      <TextInput
        placeholder="Mercadinho do seu zé da esquina"
        className="w-full text-6xl text-gray-600"
        autoFocus
        multiline
        numberOfLines={4}
        onSubmitEditing={() => router.back()}
        returnKeyType="next"
        submitBehavior="blurAndSubmit"
      />
    </View>
  );
}
