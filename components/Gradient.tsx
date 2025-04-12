import { useColorScheme } from "@/lib/useColorScheme";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { View } from "react-native";

const Gradient = () => {
  const { colors } = useColorScheme();

  return (
    <View className="absolute inset-0">
      <LinearGradient
        colors={[colors.primary, colors.secondary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        className="h-full w-full"
      />
    </View>
  );
};

export default Gradient;
