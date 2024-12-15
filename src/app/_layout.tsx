import { Stack } from "expo-router";

import "@/ui/global.css";
import { Pressable, Text, TouchableOpacity } from "react-native";
import { ScannerButton } from "@/ui/components/scanner-button";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Lista de itens",
          headerLargeTitle: true,
          headerRight: () => <ScannerButton />,
          headerSearchBarOptions: {
            placement: "automatic",
            placeholder: "Buscar itens na lista",
          },
        }}
      />
    </Stack>
  );
}
