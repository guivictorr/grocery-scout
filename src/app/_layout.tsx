import { Stack } from "expo-router";
import "@/ui/global.css";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Lista de itens",
          headerLargeTitle: true,
          headerSearchBarOptions: {
            placement: "automatic",
            placeholder: "Buscar itens na lista",
          },
        }}
      />
    </Stack>
  );
}
