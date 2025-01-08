import { listMarkets } from "@/infra/database";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { FlatList, Text, View } from "react-native";

export function Home() {
  const { data, isRefetching, refetch } = useQuery({
    queryFn: listMarkets,
    queryKey: ["products"],
  });

  return (
    <View className="flex-1">
      <FlatList
        data={data}
        contentInsetAdjustmentBehavior="always"
        contentContainerClassName="items-center justify-center"
        keyExtractor={(item) => String(item.id)}
        ListEmptyComponent={() => (
          <View className="mt-8">
            <Text className="text-lg">Nenhum item encontrado</Text>
          </View>
        )}
        refreshing={isRefetching}
        onRefresh={() => refetch()}
        renderItem={({ item }) => (
          <View className="flex-row justify-between items-center px-4 py-3 border-b-[0.3px] border-gray-400">
            <Text className="text-lg">{item.name}</Text>
            <Text className="text-lg">{item.createdAt}</Text>
          </View>
        )}
      />
    </View>
  );
}
