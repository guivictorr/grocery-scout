import { Alert, View } from "react-native";
import { useCallback, useRef, useState } from "react";
import { BarcodeScanningResult, CameraView } from "expo-camera";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";

import { api } from "@/api/api-client";
import { ProductDto } from "@/lib/queries";
import { AxiosError } from "axios";
import { Loading } from "../components/loading";

export function Scanner() {
  const [isPending, setIsPending] = useState(false);
  const { marketId } = useLocalSearchParams();
  const scannerLockRef = useRef(false);

  const handleBarCodeScan = async ({ data: ean }: BarcodeScanningResult) => {
    if (scannerLockRef.current) return;
    if (ean) {
      scannerLockRef.current = true;
    }

    try {
      setIsPending(true);
      const product = await api.get<ProductDto>(`products/${ean}`);
      router.push({
        pathname: "/new-price",
        params: { productId: product.data.id, marketId },
      });
    } catch (error) {
      if (error instanceof AxiosError && error.status === 404) {
        return router.push({
          pathname: "/new-product",
          params: { ean: ean, marketId },
        });
      }

      Alert.alert("Erro inesperado");
    } finally {
      setIsPending(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      scannerLockRef.current = false;
    }, []),
  );

  return (
    <View className="flex-1 relative">
      <CameraView
        onBarcodeScanned={handleBarCodeScan}
        barcodeScannerSettings={{ barcodeTypes: ["ean8", "ean13"] }}
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {isPending && (
          <View className="flex-1 w-full bg-black/75">
            <Loading />
          </View>
        )}
      </CameraView>
    </View>
  );
}
