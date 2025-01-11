import { Stack, Link } from "expo-router";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { SQLiteProvider } from "expo-sqlite";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "@/ui/global.css";
import { cleanProducts, migrateDb } from "@/infra/database";
import { Button } from "react-native";
const queryClient = new QueryClient();
export default function RootLayout() {
  return (
    <ActionSheetProvider>
      <SQLiteProvider databaseName="database.db" onInit={migrateDb}>
        <QueryClientProvider client={queryClient}>
          <Stack>
            <Stack.Screen
              name="index"
              options={{
                title: "Mercados",
                headerLargeTitle: true,
                // headerSearchBarOptions: {
                //   placement: "automatic",
                //   placeholder: "Buscar itens na lista",
                // },
              }}
            />
            <Stack.Screen
              name="scanner"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="new-market"
              options={{
                presentation: "formSheet",
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="new-price"
              options={{
                presentation: "formSheet",
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="new-product"
              options={{
                headerShown: false,
                presentation: "formSheet",
              }}
            />
            <Stack.Screen
              name="products"
              options={{
                title: "Preços",
                headerLargeTitle: true,
                headerRight: () => (
                  <Button
                    title="Deletar produtos"
                    onPress={async () => await cleanProducts()}
                  />
                ),
                // headerSearchBarOptions: {
                //   placement: "automatic",
                //   placeholder: "Buscar itens na lista",
                // },
              }}
            />
          </Stack>
        </QueryClientProvider>
      </SQLiteProvider>
    </ActionSheetProvider>
  );
}
