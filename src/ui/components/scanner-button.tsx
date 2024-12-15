import { TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export function ScannerButton() {
  return (
    <TouchableOpacity>
      <Ionicons name="barcode-outline" size={24} color="black" />
    </TouchableOpacity>
  );
}
