import { listMarkets } from "@/infra/database";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import { Button, FlatList, Pressable, Text, View } from "react-native";

export function Home() {
  const { showActionSheetWithOptions } = useActionSheet();
  const { data, refetch, isRefetching } = useQuery({
    queryFn: listMarkets,
    queryKey: ["markets"],
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
        ListFooterComponent={() => (
          <Button
            onPress={() => router.push("/new-market")}
            title="Novo mercado"
          />
        )}
        ListEmptyComponent={() => (
          <View className="mt-8">
            <Text className="text-lg">Nenhum item encontrado</Text>
          </View>
        )}
        renderItem={({ item }) => (
          <Pressable
            onPress={() =>
              showActionSheetWithOptions(
                {
                  options: ["Scanner", "Products", "Cancelar"],
                  cancelButtonIndex: 2,
                },
                (selectedOption) => {
                  switch (selectedOption) {
                    case 0:
                      router.push({
                        pathname: "/scanner",
                        params: { marketId: item.id },
                      });
                      break;
                  }
                },
              )
            }
            className="flex-row justify-between items-center active:bg-gray-100 px-5 py-4 border-b-[0.3px] border-gray-400 w-full"
          >
            <Text className="text-2xl">{item.name}</Text>
            <Text className="text-lg">{item.productCount} Produtos</Text>
          </Pressable>
        )}
      />
    </View>
  );
}
