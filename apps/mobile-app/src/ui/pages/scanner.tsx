import { api } from "@/api/api-client";
import { ProductDto } from "@/lib/react-query";
import { CameraView } from "expo-camera";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useRef } from "react";
import { View } from "react-native";
export function Scanner() {
  const { marketId } = useLocalSearchParams();
  const scannerLockRef = useRef(false);

  useFocusEffect(
    useCallback(() => {
      scannerLockRef.current = false;
    }, []),
  );

  return (
    <View className="flex-1 relative">
      <CameraView
        onBarcodeScanned={async ({ data: ean }) => {
          if (scannerLockRef.current) return;
          if (ean) {
            scannerLockRef.current = true;
          }
          const product = await api.get<ProductDto>(`products/${ean}`);
          if (product.data) {
            router.push({
              pathname: "/new-price",
              params: { productId: product.data.id, marketId },
            });
          } else {
            router.push({
              pathname: "/new-product",
              params: { ean: ean, marketId },
            });
          }
        }}
        barcodeScannerSettings={{ barcodeTypes: ["ean8", "ean13"] }}
        style={{ flex: 1 }}
      />
    </View>
  );
}
