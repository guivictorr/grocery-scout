import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export function ScannerButton(props: TouchableOpacityProps) {
  return (
    <TouchableOpacity {...props}>
      <Ionicons name="barcode-outline" size={24} color="black" />
    </TouchableOpacity>
  );
}
