import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { apicall } from "../helpers/axios";
import { setFood, setCategory, categorySeleted } from "../Store/food";
import { useDispatch } from "react-redux";
import Animated, {
  FadeInDown,
  FadeInUp,
  FadeOutUp,
  LinearTransition,
} from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
const layOutCnahe = LinearTransition.springify().damping(400).stiffness(100);
const FadeOutUp_ = FadeOutUp.springify().damping(100).stiffness(100);
const FadeIn_ = FadeInUp.springify().damping(100).stiffness(100);
const LoadingScreen = (CustomeTextAnimated) => {
  let nav = useNavigation();
  let dispatch = useDispatch();
  let [catloading, setcatloading] = useState(true);
  let [proloading, setproloading] = useState(true);
  let [status, setstatus] = useState("We are getting details");
  const NextScreen = () => {
    //  console.log("Next Screen");
    nav.reset({
          index: 0,
          routes: [{ name: "home" }],
        });
  };
  const getCatagory = () => {
    apicall("list.php?c=list")
      .then((res) => {
        console.log({ cat: res.data.meals.length });
        let arr = ["All"];
        for (let i = 0; i < res.data.meals.length; i++) {
          arr.push(res.data.meals[i].strCategory);
        }
        dispatch(setCategory(arr));
     
        setTimeout(()=>{
          setcatloading(false);
          setstatus("We got all category!!")
        },700)
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getAllFoods = () => {
    apicall("search.php?s")
      .then((res) => {
        console.log({ product: res.data.meals.length });
        dispatch(setFood(res.data.meals == null ? [] : res.data.meals));
       
        setTimeout(()=>{
          setproloading(false);
          setstatus("We got all products!!")
        },700)
      })
      .catch((err) => {
        console.log({ err });
      });
  };

  useEffect(() => {
    getCatagory();
    getAllFoods();
  }, []);
  useMemo(() => {
    if (!catloading && !proloading) {
      setTimeout(() => {
        NextScreen();
      }, 1700);
    }
  }, [catloading, proloading]);
  return (
    <View style={style.loadingMain}>
      <Animated.View layout={layOutCnahe} style={style.textController}>
        {catloading && proloading ? (
          <Animated.Text
            layout={layOutCnahe}
            entering={FadeIn_}
            exiting={FadeOutUp_}
            style={style.text}
          >
            Hii, There!!!!
          </Animated.Text>
        ) : (
          <></>
        )}
      </Animated.View>
      {
        <Animated.Text
          layout={layOutCnahe}
          entering={FadeIn_}
          exiting={FadeOutUp_}
          style={style.status}
        >
          {status}
        </Animated.Text>
      }
      {(catloading || proloading )&&Platform.OS=="android" && <ActivityIndicator />}
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
  status:{
    fontSize:13,
    fontFamily: "Poppins-Regular",
    marginTop:-10
  },  
  textController: {
    alignItems: "center",
    padding: 10,
    justifyContent: "center",
    minWidth: Dimensions.get("screen").width / 2,
  },
});
export default LoadingScreen;
