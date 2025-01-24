import { useActionSheet } from "@expo/react-native-action-sheet";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import {
  Button,
  FlatList,
  ListRenderItemInfo,
  Pressable,
  Text,
  View,
} from "react-native";

import queries, { MarketDto } from "@/lib/queries";
import { ListEmpty } from "../components/list-empty";

export function Home() {
  const { data, refetch, isRefetching } = useQuery(queries.listMarketsQuery);

  return (
    <View className="flex-1">
      <FlatList
        data={data}
        contentInsetAdjustmentBehavior="always"
        keyExtractor={(item) => String(item.id)}
        refreshing={isRefetching}
        onRefresh={() => refetch()}
        ListFooterComponentClassName="mt-4"
        ListFooterComponent={() => (
          <Button
            onPress={() => router.push("/new-market")}
            title="Novo mercado"
          />
        )}
        ListEmptyComponent={<ListEmpty />}
        renderItem={(item) => <ListItem {...item} />}
      />
    </View>
  );
}

function ListItem({ item }: ListRenderItemInfo<MarketDto>) {
  const { showActionSheetWithOptions } = useActionSheet();

  const options = {
    options: ["Escanear", "Produtos", "Cancelar"],
    cancelButtonIndex: 2,
  };

  const handleSelectedOption = (selectedOption?: number) => {
    switch (selectedOption) {
      case 0:
        router.push({
          pathname: "/scanner",
          params: { marketId: item.id },
        });
        break;
      case 1:
        router.push({
          pathname: "/products",
          params: { marketId: item.id },
        });
        break;
    }
  };

  return (
    <Pressable
      onPress={() => showActionSheetWithOptions(options, handleSelectedOption)}
      className="active:bg-gray-100 px-5 py-4 border-b-[0.3px] border-gray-400"
    >
      <Text className="text-2xl">{item.name}</Text>
    </Pressable>
  );
}
