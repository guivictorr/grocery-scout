import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";

import "@/ui/global.css";
import { Scanner } from "@/ui/components/scanner";
import { migrateDb } from "@/infra/database";

export default function RootLayout() {
  return (
    <SQLiteProvider databaseName="database.db" onInit={migrateDb}>
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
    </SQLiteProvider>
  );
}
