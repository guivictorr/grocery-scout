import { View, Text } from "react-native";

export function ListEmpty() {
  return (
    <View className="mx-auto mt-8">
      <Text className="text-lg">Nenhum item encontrado</Text>
    </View>
  );
}
