import { Alert, Image, ScrollView, View } from "react-native";
import { Text } from "@/components/ui/text";
import BackgroundGradient from "@/components/BackgroundGradient";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from "react-native-reanimated";
import Cancel from "@/assets/icons/Cancel";
import { Button } from "@/components/ui/button";
import { router } from "expo-router";
import { useNewProjectStore } from "@/store/newProjectStore";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Copy from "@/assets/icons/Copy";
import useGetProject from "@/api/queries/useGetProject";
import * as Clipboard from "expo-clipboard";

const OutputModal = () => {
  return (
    <View className="flex-1">
      <BackgroundGradient />

      <SafeAreaView className="flex-1 p-6">
        <Animated.View
          className="flex-1 gap-6"
          entering={FadeIn}
          exiting={FadeOut}
          layout={LinearTransition}
        >
          <Header />
          <LogoPreview />
          <PromptPreview />
        </Animated.View>
      </SafeAreaView>
    </View>
  );
};

export default OutputModal;

const Header = () => {
  return (
    <View className="flex-row justify-between items-center">
      <Text className="text-2xl font-extrabold">Your Design</Text>
      <Button variant="link" size="icon" onPress={() => router.back()}>
        <Cancel />
      </Button>
    </View>
  );
};

const LogoPreview = () => {
  return (
    <View>
      <Image
        source={require("@/assets/images/dummy-logo.jpg")}
        className="w-full h-[342px] rounded-2xl"
      />
    </View>
  );
};

const PromptPreview = () => {
  const id = useNewProjectStore((state) => state.id);
  const projectQuery = useGetProject(id);

  return (
    <Card>
      <CardHeader className="flex-row justify-between items-center p-3">
        <Text className="font-bold text-sm">Prompt</Text>
        <CopyButton />
      </CardHeader>
      <CardContent className="p-3 pt-0">
        <Text>{projectQuery.data?.prompt}</Text>
      </CardContent>
      {projectQuery.data?.style && (
        <CardFooter className="p-3 pt-0">
          <View className="py-1 px-2 bg-foreground/10 rounded-full">
            <Text className="capitalize text-xs">
              {projectQuery.data?.style}
            </Text>
          </View>
        </CardFooter>
      )}
    </Card>
  );
};

const CopyButton = () => {
  const id = useNewProjectStore((state) => state.id);
  const projectQuery = useGetProject(id);

  const handleCopy = async () => {
    await Clipboard.setStringAsync(projectQuery.data?.prompt);
  };

  return (
    <Button variant="link" onPress={handleCopy}>
      <Copy />
      <Text className="text-foreground/60 font-normal text-xs">Copy</Text>
    </Button>
  );
};
