import React from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { FlatList, View, Text, ListRenderItemInfo } from "react-native";

import queries, { PriceDto } from "@/lib/queries";
import { ListEmpty } from "../components/list-empty";

export function Products() {
  const { marketId } = useLocalSearchParams();
  const { data, isRefetching, refetch } = useSuspenseQuery(
    queries.listPricesQuery(marketId.toString()),
  );

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
        ListEmptyComponent={<ListEmpty />}
        renderItem={(item) => <ListItem {...item} />}
      />
    </View>
  );
}

function ListItem({ item }: ListRenderItemInfo<PriceDto>) {
  return (
    <View className="flex-row justify-between items-center active:bg-gray-100 px-5 py-4 border-b-[0.3px] border-gray-400 w-full">
      <Text className="text-2xl">{item.product_name}</Text>
      <Text className="text-lg">R${item.price_cents / 100}</Text>
    </View>
  );
}
