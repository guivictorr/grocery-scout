import { Stack, Link, router } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "@/ui/global.css";
import { migrateDb } from "@/infra/database";
import { Button } from "react-native";
const queryClient = new QueryClient();
export default function RootLayout() {
  return (
    <SQLiteProvider databaseName="database.db" onInit={migrateDb}>
      <QueryClientProvider client={queryClient}>
        <Stack>
          <Stack.Screen
            name="index"
            options={{
              title: "Lista de itens",
              headerLargeTitle: true,
              headerRight: () => (
                <Link href="/scanner" asChild>
                  <Button title="Scan" />
                </Link>
              ),
              // headerSearchBarOptions: {
              //   placement: "automatic",
              //   placeholder: "Buscar itens na lista",
              // },
            }}
          />
          <Stack.Screen
            name="scanner"
            options={{
              presentation: "modal",
              headerShown: false,
            }}
          />
        </Stack>
      </QueryClientProvider>
    </SQLiteProvider>
  );
}
