import { Easing, Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
  interpolate,
  Keyframe,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { CustomeText } from "./Text";
import Entypo from "@expo/vector-icons/Entypo";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";

const Collapsible = ({ title, children, bgColor, pstyle, setheight }) => {
  let deg = useSharedValue(180);
  let height = useSharedValue(setheight);
  const rotation = useDerivedValue(() => {
    return interpolate(deg.value, [180, 0], [0, 180]);
  });
  const heightAdject = useDerivedValue(() => {
    return interpolate(height.value, [setheight, 70], [70, setheight]);
  });
  const animatedProps = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: rotation.value + "deg" }],
    };
  });
  const animatedProp2 = useAnimatedStyle(() => {
    return {
      height: heightAdject.value,
    };
  });
  const show = () => {
    deg.value = withTiming(180, {
      duration: 300,
    });
    height.value = withTiming(setheight, {
      duration: 500,
    });
  };

  const close = () => {
    console.log("called")
    deg.value = withTiming(0, {
      duration: 300,
    });
    height.value = withTiming(70, {
      duration: 500,
    });
  };
  useEffect(() => {
    close();
  }, []);
  let [open, setopen] = useState(false);
  const style = StyleSheet.create({
    mainContainer: {
      backgroundColor: bgColor,
      padding: 10,
      borderRadius: 20,
      overflow: "hidden",
    },
    iconCOntainer: {
      height: 30,
      width: 30,
      justifyContent: "center",
      alignItems: "center",
    },
  });
  return (
    <Animated.View style={[style.mainContainer, animatedProp2, pstyle]}>
      <Pressable
        onPress={() => {
          if (open) {
            show();
          } else {
            close();
          }
          setopen(!open);
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 7,
          }}
        >
          <CustomeText
            style={{
              fontFamily: "Poppins-Medium",
              fontSize: 16,
              fontWeight: 600,
            }}
          >
            {title}
          </CustomeText>
          {
            <Animated.View style={[animatedProps, style.iconCOntainer]}>
              <Entypo name="chevron-small-down" size={24} color="black" />
            </Animated.View>
          }
        </View>
      </Pressable>
      <Animated.View style={{ marginTop: 20, flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} bounces={false}>
          {children}
        </ScrollView>
      </Animated.View>
    </Animated.View>
  );
};

export default Collapsible;
