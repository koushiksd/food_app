import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import Animated, { FadeOutUp } from "react-native-reanimated";
import { FadeInUp } from "react-native-reanimated/src";

const texts = [
  "Applesauce was the first food eaten in space.",
  " Broccoli contains more protein (per calorie) than steak!",
  "Raspberries are a member of the rose family.",
  "Potatoes were the first food planted in space.",
  "Cucumbers are 95% water.",
  "Figs aren’t fruits, they are flowers.",
  "Around 66 percent of Americans like their toast lightly toasted.",
  "McDonald’s isn’t the oldest fast-food chain.",
  "Florida isn’t the biggest seller of ice cream in the United States.",
  "Pilgrims are responsible for apples in America","Bubble tea is around 40 years old.",
  "Most grapes end up as wine."
];
const FadeOutUp_ = FadeOutUp.springify().damping(100).stiffness(100);
const FadeIn_ = FadeInUp.springify().damping(0).stiffness(100);
const LoadingText = () => {
  let [dispText, setDispText] = useState("");
  useEffect(() => {
    setDispText(texts[Math.floor(Math.random() * texts.length)]);
  }, []);
  return (
    <Animated.View style={style.factsContainer}exiting={FadeOutUp_} entering={FadeIn_}>
      <Animated.Text entering={FadeIn_} style={style.facts}>
        {dispText}
      </Animated.Text>
    </Animated.View>
  );
};

const style = StyleSheet.create({
  factsContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  facts: {
    fontSize: 22,
    fontFamily: "Poppins-Bold",
    textAlign: "center",
  },
});
export default LoadingText;
