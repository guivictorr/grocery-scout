import { View } from "react-native";
import { useCallback, useRef } from "react";
import { BarcodeScanningResult, CameraView } from "expo-camera";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";

import { api } from "@/api/api-client";
import { ProductDto } from "@/lib/queries";

export function Scanner() {
  const { marketId } = useLocalSearchParams();
  const scannerLockRef = useRef(false);
  const isScannerLocked = !!scannerLockRef.current;

  const lockScanner = () => (scannerLockRef.current = true);
  const unlockScanner = () => (scannerLockRef.current = false);
  const handleBarCodeScan = async ({ data: ean }: BarcodeScanningResult) => {
    if (isScannerLocked) return;
    if (ean) {
      lockScanner();
    }

    const product = await api.get<ProductDto>(`products/${ean}`);

    if (!product.data) {
      router.push({
        pathname: "/new-product",
        params: { ean: ean, marketId },
      });
    }

    router.push({
      pathname: "/new-price",
      params: { productId: product.data.id, marketId },
    });
  };

  useFocusEffect(
    useCallback(() => {
      unlockScanner();
    }, []),
  );

  return (
    <View className="flex-1 relative">
      <CameraView
        onBarcodeScanned={handleBarCodeScan}
        barcodeScannerSettings={{ barcodeTypes: ["ean8", "ean13"] }}
        style={{ flex: 1 }}
      />
    </View>
  );
}
