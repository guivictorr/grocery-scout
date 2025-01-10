import { CameraView } from "expo-camera";
import { router } from "expo-router";
import { View } from "react-native";
export function Scanner() {
  return (
    <View className="flex-1 relative">
      <CameraView
        onBarcodeScanned={({ data }) =>
          router.push({ pathname: "/new-product", params: { ean: data } })
        }
        barcodeScannerSettings={{ barcodeTypes: ["ean8", "ean13"] }}
        style={{ flex: 1 }}
      />
    </View>
  );
}
