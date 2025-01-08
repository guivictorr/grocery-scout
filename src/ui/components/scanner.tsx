import { CameraView } from "expo-camera";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { FadeOutDown } from "react-native-reanimated";
import { useNavigation } from "expo-router";
import { ScannerButton } from "./scanner-button";
import { createProduct } from "@/infra/database";
import { useRef } from "react";

export function Scanner() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const scannerLock = useRef(false);

  return (
    <ScannerButton
      onPress={() => {
        navigation.setOptions({
          header: () => (
            <Animated.View
              exiting={FadeOutDown}
              style={{
                paddingTop: insets.top,
                paddingBottom: 12,
                paddingHorizontal: 12,
              }}
            >
              <View className="items-center rounded-lg overflow-hidden w-full mx-auto bg-gray-200">
                <CameraView
                  style={{ width: "100%", height: 100 }}
                  barcodeScannerSettings={{ barcodeTypes: ["ean13", "ean8"] }}
                  onBarcodeScanned={async ({ data }) => {
                    if (scannerLock.current) return;
                    if (data) {
                      scannerLock.current = true;
                    }
                    await createProduct({ ean: data, name: "Pão Diverso" });
                    navigation.setOptions({ header: undefined });
                    scannerLock.current = false;
                  }}
                />
              </View>
            </Animated.View>
          ),
        });
      }}
    />
  );
}
