import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  FadeInUp,
  FadeOutUp,
  LinearTransition,
} from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import { FadeIn } from "react-native-reanimated/src";
const width_ =( Dimensions.get("screen").width/2)-50
const FadeInImg_ = FadeIn.springify().damping(100).stiffness(10);
const layOutCnahe = LinearTransition.springify().damping(400).stiffness(100);
const FadeOutUp_ = FadeOutUp.springify()
  .duration(12)
  .damping(100)
  .stiffness(100);
const FadeIn_ = FadeInUp.springify().duration(12).damping(100).stiffness(100);
const ProductCard = ({ item }) => {
  const nav = useNavigation()

  return (
    <Pressable onPress={()=>{
      console.log(item.idMeal)
      nav.navigate("productsdetails",{"idMeal":item.idMeal})
      
    }}> 
      <Animated.View
        layout={layOutCnahe}
        entering={FadeIn_}
        exiting={FadeOutUp_}
        style={style.cardMainContainer}
      >
        <View style={style.rating}>
          <FontAwesome
            name="star"
            size={10}
            color={item.rating < 3 ? "red" : "gold"}
          />
          <Text style={style.ratingText}>{item.rating}</Text>
        </View>
        <View>
          <Animated.Image entering={FadeInImg_} source={{ uri: item.strMealThumb }} style={style.image} />
        </View>
        <LinearGradient
          // Button Linear Gradient
          colors={["rgba(55, 55, 55, 0.18)","rgba(0, 0, 0, 0.32)", "rgb(2, 2, 2)"]}
          style={style.shade}
        />
        <View style={style.textContainer}>
          <Text style={style.title}>{item.strMeal}</Text>
          {item.strCategory && (
            <Text style={style.title}>{item.strCategory}</Text>
          )}
        </View>
        {item.strArea && (
          <View style={style.location}>
            <Text style={style.locationTitle}>from {item.strArea}</Text>
          </View>
        )}
      </Animated.View>
    </Pressable>
  );
};
const style = StyleSheet.create({
  rating: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFE1B3",
    paddingVertical: 3,
    paddingHorizontal: 5,
    borderRadius: 10,
  },
  textContainer: {
    position: "absolute",
    bottom: 25,
    width: 130,
    flexWrap: "wrap",

    left: 10,
    flexDirection: "row",
  },
  location: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    alignContent: "center",
    position: "absolute",
    bottom: 12,
    left: 10,
  },
  cardMainContainer: {
    height: 150,

    width: width_,
    borderRadius: 10,
    margin: 8,
  
    position: "relative",
    overflow: "hidden",
  },
  ratingText: {
    marginRight: 5,
    fontFamily: "Poppins-Regular",
    fontSize: 11,
    marginLeft: 5,
    color: "black",
  },
  title: {
    marginRight: 5,
    fontFamily: "Poppins-Bold",
    fontSize: 11,

    color: "white",
  },
  locationTitle: {
    marginRight: 5,
    fontFamily: "Poppins-Regular",
    fontSize: 8,
    color: "#A9A9A9",
  },
  image: {
    position: "absolute",
    top: 0,
    left: 0,
    height: 150,
    width: width_,
  },
  shade: {
    height: 150,
    width: width_,
    position: "absolute",
    top: 0,
    left: 0,
  },
});

export default ProductCard;
