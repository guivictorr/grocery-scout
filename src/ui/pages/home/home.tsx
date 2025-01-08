import { listProducts, ProductData } from "@/infra/database";
import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";

export function Home() {
  const [data, setData] = useState<ProductData[]>([]);

  useEffect(() => {
    listProducts().then(setData);
  }, []);

  return (
    <FlatList
      data={data}
      contentInsetAdjustmentBehavior="always"
      keyExtractor={(item) => String(item.id)}
      ListEmptyComponent={() => <Text>Vazio</Text>}
      renderItem={({ item }) => (
        <View className="flex-row justify-between items-center px-4 py-3 border-b-[0.3px] border-gray-400">
          <Text className="text-lg">{item.name}</Text>
          <Text className="text-lg">{item.createdAt}</Text>
        </View>
      )}
    />
  );
}
