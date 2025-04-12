import { View, ActivityIndicator, Image, Pressable } from "react-native";
import { Card, CardContent, CardHeader } from "./ui/card";
import { useColorScheme } from "@/lib/useColorScheme";
import Gradient from "./Gradient";
import AlertCircle from "@/assets/icons/AlertCircle";
import { Text } from "./ui/text";
import { useNewProjectStore } from "@/store/newProjectStore";
import useGetProject from "@/api/queries/useGetProject";
import { useEffect } from "react";
import useCompleteProject from "@/api/mutations/useCompleteProject";
import useIsProcessing from "@/hooks/useIsProcessing";
import Animated, { FadeInUp, FadeOutUp } from "react-native-reanimated";
import { router } from "expo-router";

// This component is used to display the status of a project.
const StatusChip = () => {
  const id = useNewProjectStore((state) => state.id);

  const projectQuery = useGetProject(id);
  const isProcessing = useIsProcessing(id);
  const isReady = !!id && !isProcessing && !projectQuery.isLoading;

  if (projectQuery.isError) {
    return <ErrorChip refetch={projectQuery.refetch} />;
  }

  if (isProcessing) {
    return <ETAChip eta={projectQuery.data?.eta} />;
  }

  if (isReady) {
    return <DesignReadyChip />;
  }

  return null;
};

export default StatusChip;

const ETAChip = ({ eta }: { eta?: number }) => {
  const { colors } = useColorScheme();
  useMockProjectProcessingComplete(eta);

  return (
    <Animated.View entering={FadeInUp} exiting={FadeOutUp}>
      <Card className="flex-row h-[70px]">
        <CardHeader className="bg-accent p-0 w-[70px] items-center justify-center">
          <ActivityIndicator color={colors.foreground} />
        </CardHeader>
        <CardContent className="flex-1 justify-center p-0 px-3">
          <View>
            <Text className="font-extrabold">Creating Your Design...</Text>
            {eta && (
              <Text className="text-muted-foreground text-xs font-medium">
                Ready in {eta} seconds
              </Text>
            )}
          </View>
        </CardContent>
      </Card>
    </Animated.View>
  );
};

const DesignReadyChip = () => {
  const handleOpenDesign = () => {
    router.push(`/modals/outputModal`);
  };

  return (
    <Animated.View entering={FadeInUp} exiting={FadeOutUp}>
      <Pressable className="pressable" onPress={handleOpenDesign}>
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
    </Animated.View>
  );
};

const ErrorChip = ({ refetch }: { refetch: () => void }) => {
  return (
    <Animated.View entering={FadeInUp} exiting={FadeOutUp}>
      <Pressable className="pressable" onPress={refetch}>
        <Card className="flex-row h-[70px]">
          <CardHeader className="bg-destructive/70 p-0 w-[70px] items-center justify-center">
            <AlertCircle />
          </CardHeader>
          <CardContent className="bg-destructive flex-1 justify-center p-0 px-3">
            <View>
              <Text className="font-extrabold">
                Oops, something went wrong!
              </Text>
              <Text className="text-foreground/70 text-xs font-medium">
                Click to try again.
              </Text>
            </View>
          </CardContent>
        </Card>
      </Pressable>
    </Animated.View>
  );
};

// This hook is used to mock the project processing complete by setting the eta to 0 after the ETA has reached 0.
const useMockProjectProcessingComplete = (eta?: number) => {
  const id = useNewProjectStore((state) => state.id);
  const completeProjectMutation = useCompleteProject();

  useEffect(() => {
    const timer = setTimeout(() => {
      completeProjectMutation.mutate(id);
    }, eta * 1000);

    return () => clearTimeout(timer);
  }, [eta]);
};
