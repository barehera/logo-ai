import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Image, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlashList } from "@shopify/flash-list";
import { logoStyles } from "@/constants/logoStyles";
import { cn } from "@/lib/utils";
import Stars from "@/assets/icons/Stars";
import BackgroundGradient from "@/components/BackgroundGradient";

export default function HomeScreen() {
  return (
    <View className="flex-1">
      <BackgroundGradient />

      <SafeAreaView className="flex-1 p-6">
        <Header />
        <View className="flex-1 gap-6">
          <PromptInput />
          <LogoStyleList />
        </View>
        <View className="mt-6">
          <CreateButton />
        </View>
      </SafeAreaView>
    </View>
  );
}

const Header = () => {
  return (
    <View className="mb-3">
      <Text className="text-center font-extrabold">AI Logo</Text>
    </View>
  );
};

const PromptInput = () => {
  const [prompt, setPrompt] = useState("");

  return (
    <View>
      <View className="mb-3 flex-row items-center justify-between ">
        <Text className="text-xl font-extrabold">Enter Your Prompt</Text>
        <Button variant="link">
          <Image source={require("@/assets/icons/dice.png")} className="w-4" />
          <Text className="text-foreground">Surprise me</Text>
        </Button>
      </View>
      <Textarea
        placeholder="A blue lion logo reading 'HEXA' in bold letters"
        maxLength={500}
        value={prompt}
        onChangeText={setPrompt}
      />
    </View>
  );
};

const LogoStyleList = () => {
  return (
    <View>
      <View className="mb-3 flex-row items-center justify-between ">
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
  const isSelected = false;

  return (
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
  );
};

const CreateButton = () => {
  return (
    <Button isGradient>
      <Text>Create</Text>
      <Stars />
    </Button>
  );
};
