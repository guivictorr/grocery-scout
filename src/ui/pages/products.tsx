import { getLatestPricesInMarket } from "@/infra/database";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { FlatList, View, Text } from "react-native";

export function Products() {
  const { marketId } = useLocalSearchParams();
  const { data, isRefetching, refetch } = useQuery({
    queryFn: () => getLatestPricesInMarket(Number(marketId)),
    queryKey: ["prices", marketId],
  });
  return (
    <View className="flex-1">
      <FlatList
        data={data}
        contentInsetAdjustmentBehavior="always"
        contentContainerClassName="items-center justify-center"
        keyExtractor={(item) => String(item.id)}
        refreshing={isRefetching}
        onRefresh={() => refetch()}
        ListFooterComponentClassName="mt-4"
        ListEmptyComponent={() => (
          <View className="mt-8">
            <Text className="text-lg">Nenhum item encontrado</Text>
          </View>
        )}
        renderItem={({ item }) => (
          <View className="flex-row justify-between items-center active:bg-gray-100 px-5 py-4 border-b-[0.3px] border-gray-400 w-full">
            <Text className="text-2xl">{item.name}</Text>
            <Text className="text-lg">R${item.price / 100}</Text>
          </View>
        )}
      />
    </View>
  );
}
