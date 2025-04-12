import { Text } from "@/components/ui/text";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 px-6 py-3">
      <Text className="text-center font-extrabold">AI Logo</Text>
    </SafeAreaView>
  );
}
