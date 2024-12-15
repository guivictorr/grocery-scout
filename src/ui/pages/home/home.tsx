import { FlatList, Text, View } from "react-native";

function generateMockData(count: number) {
  const items = ["Manteiga", "Queijo", "Leite", "Pão", "Ovos", "Iogurte"];

  return Array.from({ length: count }, (_, index) => {
    const randomItem = items[Math.floor(Math.random() * items.length)];
    const randomDate = new Date(
      Date.now() + Math.random() * 365 * 24 * 60 * 60 * 1000, // Data futura aleatória dentro de um ano
    );

    return {
      id: `item-${index + 1}-${randomItem}`, // ID único com base no índice
      name: randomItem,
      expiration: randomDate,
    };
  });
}

export function Home() {
  return (
    <FlatList
      data={generateMockData(30)}
      contentInsetAdjustmentBehavior="always"
      keyExtractor={(item) => item.toString()}
      ListEmptyComponent={() => <Text>Vazio</Text>}
      renderItem={({ item }) => (
        <View className="flex-row justify-between items-center px-4 py-3 border-b-[0.3px] border-gray-400">
          <Text className="text-lg">{item.name}</Text>
          <Text className="text-lg">
            {item.expiration.toLocaleDateString("pt-br")}
          </Text>
        </View>
      )}
    />
  );
}
