import { useActionSheet } from "@expo/react-native-action-sheet";
import { router } from "expo-router";
import { FlatList, Pressable, Text, View } from "react-native";

export function Home() {
  const { showActionSheetWithOptions } = useActionSheet();
  return (
    <View className="flex-1">
      <FlatList
        data={[{ id: "id", name: "Mercado 1", createdAt: new Date() }]}
        contentInsetAdjustmentBehavior="always"
        contentContainerClassName="items-center justify-center"
        keyExtractor={(item) => String(item.id)}
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
                      router.push("/scanner");
                      break;
                  }
                },
              )
            }
            className="flex-row justify-between items-center active:bg-gray-100 px-4 py-3 border-b-[0.3px] border-gray-400 w-full"
          >
            <Text className="text-lg">{item.name}</Text>
            <Text className="text-lg">8 produtos</Text>
          </Pressable>
        )}
      />
    </View>
  );
}
