import { Image, StyleSheet, Text, View } from "react-native";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  FadeOutUp,
} from "react-native-reanimated";
import Search from "../Components/Search";
import Category from "../Container/Category";
import Products from "../Container/Products";

const ProfileHeader = () => {
  return (
    <View style={style.headerContianer}>
      <View>
        <Text style={{ fontFamily: "Poppins-Bold", fontSize: 20 }}>
          Hello Jay!
        </Text>
        <Text
          style={{
            fontSize: 12,
            color: "#A9A9A9",
            fontFamily: "Poppins-Regular",
          }}
        >
          What are you having today?
        </Text>
      </View>
      <View style={style.imgContainer}>
        <Image
          style={{ resizeMode: "contain", width: 40, height: 40 }}
          source={require("../assets/icons/profile.png")}
        />
      </View>
    </View>
  );
};

const HomePage = () => {
  return (
    <Animated.View
      entering={FadeInUp.springify().delay(2000).damping(100).stiffness(100)}
      exiting={FadeOutUp.springify().damping(100).stiffness(100)}
      style={style.mainContainer}
    >
      <ProfileHeader />
      <View style={{height:30}} />

 
      <Search />
      <View style={{height:30}} />
      <Category />
      <View style={{height:30}} />
      <Products />
    </Animated.View>
  );
};
const style = new StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 10,
    paddingVertical: 20,
    paddingHorizontal: 30,
    backgroundColor: "#ffffff",
  },
  headerContianer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  imgContainer: {
    height: 40,
    borderRadius: 10,
    backgroundColor: "#FFCE80",
    width: 40,
  },
});
export default HomePage;
