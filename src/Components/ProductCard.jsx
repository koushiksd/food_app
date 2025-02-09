import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
const width_ = (Dimensions.get("screen").width - 100) / 2;
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  FadeInUp,
  FadeOutUp,
  LinearTransition,
} from "react-native-reanimated";

const layOutCnahe = LinearTransition.springify().damping(400).stiffness(100);
const FadeOutUp_ = FadeOutUp.springify()
  .duration(12)
  .damping(100)
  .stiffness(100);
const FadeIn_ = FadeInUp.springify().duration(12).damping(100).stiffness(100);
const ProductCard = ({ item }) => {

  return (
    <Animated.View
      layout={layOutCnahe}
      entering={FadeIn_}
      exiting={FadeOutUp_}
      style={style.cardMainContainer}
    >
      <View style={style.rating}>
      <FontAwesome name="star" size={10} color={item.rating<3?"red":"gold"} />  
         <Text style={style.ratingText}>{item.rating}</Text>
      </View>
      <View>
        <Image source={{ uri: item.strMealThumb }} style={style.image} />
      </View>
      <LinearGradient
        // Button Linear Gradient
        colors={["rgba(169, 168, 168, 0)", "rgb(52, 52, 52)"]}
        style={style.shade}
      />
      <View style={style.textContainer}>
        <Text style={style.title}>{item.strMeal}</Text>
        {item.strCategory && (
          <Text style={style.title}>{item.strCategory}</Text>
        )}
      </View>
      {item.locationTitle && (
        <View style={style.location}>
          <Text style={style.locationTitle}>from {item.strArea}</Text>
        </View>
      )}
    </Animated.View>
  );
};
const style = StyleSheet.create({
    rating:{
        position:'absolute',
        top:10,
        right:10,
        zIndex:10,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#FFE1B3',
        paddingVertical:3,
        paddingHorizontal:5,
        borderRadius:10

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

    width: 150,
    borderRadius: 10,
    marginVertical: 10,
    position: "relative",
    overflow: "hidden",
  },
  ratingText: {
    marginRight: 5,
    fontFamily: "Poppins-Regular",
    fontSize: 11,
    marginLeft:5,
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
    width: 150,
  },
  shade: {
    height: 150,
    width: 150,
    position: "absolute",
    top: 0,
    left: 0,
  },
});

export default ProductCard;
