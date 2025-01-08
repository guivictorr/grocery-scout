import { listProducts, ProductData } from "@/infra/database";
import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";

export function Home() {
  const [isPending, setIsPending] = useState(false);
  const [data, setData] = useState<ProductData[]>([]);

  async function handleProductsList() {
    setIsPending(true);
    const products = await listProducts();

    setTimeout(() => {
      setData(products);
      setIsPending(false);
    }, 1000);
  }

  useEffect(() => {
    handleProductsList();
  }, []);

  return (
    <FlatList
      data={data}
      contentInsetAdjustmentBehavior="always"
      keyExtractor={(item) => String(item.id)}
      ListEmptyComponent={() => <Text>Vazio</Text>}
      refreshing={isPending}
      onRefresh={handleProductsList}
      renderItem={({ item }) => (
        <View className="flex-row justify-between items-center px-4 py-3 border-b-[0.3px] border-gray-400">
          <Text className="text-lg">{item.name}</Text>
          <Text className="text-lg">{item.createdAt}</Text>
        </View>
      )}
    />
  );
}
