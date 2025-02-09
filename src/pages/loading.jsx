import { useEffect, useMemo, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { apicall } from "../helpers/axios";
import { setFood, setCategory } from "../Store/food";
import { useDispatch } from "react-redux";
import Animated, {
  FadeInDown,
  FadeInUp,
  FadeOutUp,
  LinearTransition,
} from "react-native-reanimated";
import { CustomeText, CustomeTextAnimated } from "../Components/Text";
import { useNavigation } from "@react-navigation/native";
const layOutCnahe = LinearTransition.springify().damping(400).stiffness(100);
const FadeOutUp_ = FadeOutUp.springify().damping(100).stiffness(100);
const FadeIn_ = FadeInUp.springify().damping(100).stiffness(100);
const LoadingScreen = (CustomeTextAnimated) => {
  let nav = useNavigation();
  let dispatch = useDispatch();
  let [text, settext] = useState("Hii, There!!!!");
  let [loading, setLoading] = useState(0);

  const NextScreen = () => {
    console.log("Next Screen");
    nav.navigate("home");
  };
  const getCatagory = () => {
    apicall("list.php?c=list")
      .then((res) => {
        let arr = ["All"];
        for (let i = 0; i < res.data.meals.length; i++) {
          arr.push(res.data.meals[i].strCategory);
        }

        dispatch(setCategory(arr));

        setLoading(2);
      })
      .catch((err) => {
        console.log("err");
      });
  };
  const getAllFoods = () => {
    apicall("search.php?s")
      .then((res) => {
        setLoading(1);
        dispatch(setFood(res.data.meals));

        setTimeout(() => {
          getCatagory();
        }, 2000);
      })
      .catch((err) => {
        console.log({ err });
      });
  };
  useEffect(() => {
    getAllFoods();
  }, []);
  useMemo(() => {
    if (loading == 2) {
      setTimeout(() => {
        setLoading(3);
        setTimeout(() => {
          NextScreen();
        }, 1000);
      }, 2000);
    }
  }, [loading]);
  return (
    <View style={style.loadingMain}>
      <Animated.View layout={layOutCnahe} style={style.textController}>
        {loading == 0 ? (
          <Animated.Text
            layout={layOutCnahe}
            entering={FadeIn_}
            exiting={FadeOutUp_}
            style={style.text}
          >
            Hii, There!!!!
          </Animated.Text>
        ) : loading == 1 ? (
          <Animated.Text
            layout={layOutCnahe}
            entering={FadeIn_}
            exiting={FadeOutUp_}
            style={style.text}
          >
            We are got new list for you!
          </Animated.Text>
        ) : loading == 2 ? (
          <Animated.Text
            layout={layOutCnahe}
            entering={FadeIn_}
            exiting={FadeOutUp_}
            style={style.text}
          >
            Welcome!!
          </Animated.Text>
        ) : (
          <></>
        )}
      </Animated.View>
    </View>
  );
};
const style = new StyleSheet.create({
  loadingMain: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 24,
    fontFamily: "Poppins-Bold",
  },
  textController: {
    alignItems: "center",
    padding: 10,
    justifyContent: "center",
    minWidth: Dimensions.get("screen").width / 2,
  },
});
export default LoadingScreen;
