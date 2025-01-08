import { CameraView } from "expo-camera";
import { View } from "react-native";
export function Scanner() {
  return (
    <View className="flex-1">
      <CameraView style={{ flex: 1 }} />
    </View>
  );
}
