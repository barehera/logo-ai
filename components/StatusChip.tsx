import { View, ActivityIndicator, Image, Pressable } from "react-native";
import React from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { useColorScheme } from "@/lib/useColorScheme";
import Gradient from "./Gradient";
import AlertCircle from "@/assets/icons/AlertCircle";
import { Text } from "./ui/text";

interface StatusChipProps {
  status?: "designReady" | "eta" | "error";
}

const StatusChip = ({ status }: StatusChipProps) => {
  if (status === "designReady") {
    return <DesignReadyChip />;
  }

  if (status === "eta") {
    return <ETAChip />;
  }

  if (status === "error") {
    return <ErrorChip />;
  }

  return null;
};

export default StatusChip;

const ETAChip = () => {
  const { colors } = useColorScheme();

  return (
    <Card className="flex-row h-[70px]">
      <CardHeader className="bg-accent p-0 w-[70px] items-center justify-center">
        <ActivityIndicator color={colors.foreground} />
      </CardHeader>
      <CardContent className="flex-1 justify-center p-0 px-3">
        <View>
          <Text className="font-extrabold">Creating Your Design...</Text>
          <Text className="text-muted-foreground text-xs font-medium">
            Ready in 2 minutes
          </Text>
        </View>
      </CardContent>
    </Card>
  );
};

const DesignReadyChip = () => {
  return (
    <Pressable className="pressable">
      <Card className="flex-row h-[70px]">
        <CardHeader className="p-0 w-[70px]">
          <Image
            source={require("@/assets/images/dummy-logo.jpg")}
            className="w-full h-full"
          />
        </CardHeader>
        <CardContent className="flex-1 justify-center p-0 px-3">
          <Gradient />
          <View>
            <Text className="font-extrabold">Your Design is Ready!</Text>
            <Text className="text-foreground/70 text-xs font-medium">
              Tap to see it.
            </Text>
          </View>
        </CardContent>
      </Card>
    </Pressable>
  );
};

const ErrorChip = () => {
  return (
    <Pressable className="pressable">
      <Card className="flex-row h-[70px]">
        <CardHeader className="bg-destructive/70 p-0 w-[70px] items-center justify-center">
          <AlertCircle />
        </CardHeader>
        <CardContent className="bg-destructive flex-1 justify-center p-0 px-3">
          <View>
            <Text className="font-extrabold">Oops, something went wrong!</Text>
            <Text className="text-foreground/70 text-xs font-medium">
              Click to try again.
            </Text>
          </View>
        </CardContent>
      </Card>
    </Pressable>
  );
};
