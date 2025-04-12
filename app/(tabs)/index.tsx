import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Textarea } from "@/components/ui/textarea";
import { Alert, Image, Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlashList } from "@shopify/flash-list";
import { logoStyles } from "@/constants/logoStyles";
import { cn } from "@/lib/utils";
import Stars from "@/assets/icons/Stars";
import BackgroundGradient from "@/components/BackgroundGradient";
import StatusChip from "@/components/StatusChip";
import useCreateProject from "@/api/mutations/useCreateProject";
import { projectPromptSchema } from "@/constants/schemas";
import { useNewProjectStore } from "@/store/newProjectStore";
import { randomPrompts } from "@/constants/randomPrompts";
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from "react-native-reanimated";
import useIsProcessing from "@/hooks/useIsProcessing";
import { useCallback, useMemo } from "react";

export default function HomeScreen() {
  return (
    <View className="flex-1">
      <BackgroundGradient />

      <SafeAreaView className="flex-1 p-6 gap-6">
        <Animated.View
          className="flex-1 gap-6"
          entering={FadeIn}
          exiting={FadeOut}
          layout={LinearTransition}
        >
          <Header />
          <StatusChip />
          <PromptInput />
          <LogoStyleList />
        </Animated.View>
        <CreateButton />
      </SafeAreaView>
    </View>
  );
}

const Header = () => {
  return (
    <View className="mb-2">
      <Text className="text-center font-extrabold">AI Logo</Text>
    </View>
  );
};

const PromptInput = () => {
  const prompt = useNewProjectStore((state) => state.prompt);
  const setPrompt = useNewProjectStore((state) => state.setPrompt);
  const id = useNewProjectStore((state) => state.id);

  const isProcessing = useIsProcessing(id);

  return (
    <View>
      <View className="mb-3 flex-row items-center justify-between">
        <Text className="text-xl font-extrabold">Enter Your Prompt</Text>
        <SurpriseMeButton />
      </View>
      <Textarea
        editable={!isProcessing}
        placeholder="A blue lion logo reading 'HEXA' in bold letters"
        maxLength={500}
        value={prompt}
        onChangeText={setPrompt}
      />
    </View>
  );
};

const SurpriseMeButton = () => {
  const prompt = useNewProjectStore((state) => state.prompt);
  const setPrompt = useNewProjectStore((state) => state.setPrompt);
  const id = useNewProjectStore((state) => state.id);
  const isProcessing = useIsProcessing(id);

  const getRandomPrompt = useCallback(() => {
    // Filter out the current prompt to avoid getting the same one
    const availablePrompts = randomPrompts.filter((p) => p !== prompt);

    return availablePrompts[
      Math.floor(Math.random() * availablePrompts.length)
    ];
  }, [prompt]);

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt();
    setPrompt(randomPrompt);
  };

  return (
    <Button variant="link" onPress={handleSurpriseMe} disabled={isProcessing}>
      <Image source={require("@/assets/icons/dice.png")} className="w-4" />
      <Text className="text-foreground">Surprise me</Text>
    </Button>
  );
};

const LogoStyleList = () => {
  return (
    <View>
      <View className="mb-3 flex-row items-center justify-between">
        <Text className="text-xl font-extrabold">Logo Styles</Text>
      </View>
      <View>
        <FlashList
          showsHorizontalScrollIndicator={false}
          data={logoStyles}
          horizontal
          renderItem={({ item }) => <LogoStyleItem item={item} />}
          estimatedItemSize={94}
        />
      </View>
    </View>
  );
};

const LogoStyleItem = ({ item }: { item: (typeof logoStyles)[number] }) => {
  const style = useNewProjectStore((state) => state.style);
  const setStyle = useNewProjectStore((state) => state.setStyle);
  const id = useNewProjectStore((state) => state.id);

  const isProcessing = useIsProcessing(id);

  const isSelected = style === item.value;

  const handlePress = () => {
    if (isProcessing) return;
    setStyle(item.value);
  };

  return (
    <Pressable
      className={cn("pressable", isProcessing && "opacity-50")}
      disabled={isProcessing}
      onPress={handlePress}
    >
      <View className="mr-3">
        <Image
          source={item.image}
          className={cn(
            "w-24 h-24 border-2 rounded-xl ",
            isSelected ? "border-foreground" : "border-transparent"
          )}
        />
        <Text
          className={cn(
            "text-center text-xs mt-1.5 text-muted-foreground",
            isSelected && "font-bold text-foreground"
          )}
        >
          {item.label}
        </Text>
      </View>
    </Pressable>
  );
};

const CreateButton = () => {
  const prompt = useNewProjectStore((state) => state.prompt);
  const style = useNewProjectStore((state) => state.style);
  const id = useNewProjectStore((state) => state.id);

  const isProcessing = useIsProcessing(id);
  const createProjectMutation = useCreateProject();

  const hasAlreadyCreated = useMemo(() => {
    return !!id && !isProcessing;
  }, [id, isProcessing]);

  const handleCreateProject = async () => {
    if (hasAlreadyCreated) {
      return Alert.alert(
        "Start a New Logo?",
        "You already have a completed logo. Creating a new one will replace your current design. Would you like to continue?",
        [
          {
            text: "Keep Current Logo",
            style: "cancel",
          },
          {
            text: "Create New Logo",
            onPress: async () => {
              await createNewProject();
            },
          },
        ]
      );
    }

    await createNewProject();
  };

  const createNewProject = async () => {
    const result = projectPromptSchema.safeParse(prompt);

    if (!result.success) {
      return Alert.alert(result.error.errors[0].message);
    }

    await createProjectMutation.mutateAsync({ prompt, style });
  };

  return (
    <Button
      isGradient
      onPress={handleCreateProject}
      isLoading={createProjectMutation.isPending}
      disabled={isProcessing}
    >
      <Text>{hasAlreadyCreated ? "Create New" : "Create"}</Text>
      <Stars />
    </Button>
  );
};
