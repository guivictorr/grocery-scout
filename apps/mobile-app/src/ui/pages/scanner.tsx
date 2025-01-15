import { getProductByEan } from "@/infra/database";
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
        onBarcodeScanned={async ({ data }) => {
          if (scannerLockRef.current) return;
          if (data) {
            scannerLockRef.current = true;
          }
          const product = await getProductByEan(data);
          if (product) {
            router.push({
              pathname: "/new-price",
              params: { productId: product.id, marketId },
            });
          } else {
            router.push({
              pathname: "/new-product",
              params: { ean: data, marketId },
            });
          }
        }}
        barcodeScannerSettings={{ barcodeTypes: ["ean8", "ean13"] }}
        style={{ flex: 1 }}
      />
    </View>
  );
}
