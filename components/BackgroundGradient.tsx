import { View, Image } from "react-native";

const BackgroundGradient = () => {
  return (
    <View className="absolute inset-0 ">
      <Image source={require("@/assets/images/background-gradient.png")} />
    </View>
  );
};

export default BackgroundGradient;
