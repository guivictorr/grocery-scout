import { CameraView } from "expo-camera";
import { Button, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  FadeIn,
  FadeInUp,
  FadeOut,
  FadeOutDown,
  FadeOutUp,
  SlideOutUp,
} from "react-native-reanimated";
import { useNavigation } from "expo-router";
import { ScannerButton } from "./scanner-button";

export function Scanner() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

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
                  onBarcodeScanned={() =>
                    navigation.setOptions({ header: undefined })
                  }
                />
              </View>
            </Animated.View>
          ),
        });
      }}
    />
  );
}
