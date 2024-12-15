import { Stack } from "expo-router";

import "@/ui/global.css";
import { Scanner } from "@/ui/components/scanner";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Lista de itens",
          headerLargeTitle: true,
          headerRight: () => <Scanner />,
          headerSearchBarOptions: {
            placement: "automatic",
            placeholder: "Buscar itens na lista",
          },
        }}
      />
    </Stack>
  );
}
