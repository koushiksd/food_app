import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, { FadeOutUp } from "react-native-reanimated";
import { FadeInUp } from "react-native-reanimated/src";
import Ionicons from "@expo/vector-icons/Ionicons";
import Search from "../Components/Search";
import Products from "../Container/Products";
import { useDispatch, useSelector } from "react-redux";
import { resultsLoading, searchList, setSearch } from "../Store/food";
import { useNavigation } from "@react-navigation/native";
import { CustomeText } from "../Components/Text";
import { useEffect } from "react";
const ProductsPage = () => {
  let products = useSelector(searchList);
  let nav = useNavigation();
  let loading = useSelector(resultsLoading);
  let dispatch = useDispatch();
  useEffect(()=>{
    
    nav.addListener("beforeRemove",(e)=>{
      dispatch(setSearch(""));
    })
  },[])
  return (
    <Animated.View
      entering={FadeInUp.springify().delay(500).damping(100).stiffness(100)}
      exiting={FadeOutUp.springify().damping(100).stiffness(100)}
      style={style.mainContainer}
    >
      <View style={style.header}>
        <Pressable
          onPress={() => {
          

            nav.goBack();
          }}
          style={{
            zIndex: 10,
          }}
        >
          <View>
            <Ionicons name="arrow-back-sharp" size={30} color="black" />
          </View>
        </Pressable>
        <Text
          style={{
            fontFamily: "Poppins-Bold",
            fontSize: 18,
            flex: 1,
            textAlign: "center",
            marginLeft: -30,
          }}
        >
          Search recipes
        </Text>
      </View>

      <Animated.View sharedTransitionTag="search" style={{ marginTop: 30 }}>
        <Search />
      </Animated.View>
      <View style={style.searchReasult}>
        <CustomeText style={{fontSize:16,fontFamily:"Poppins-Bold"}}>Search Result</CustomeText>
        <CustomeText style={{color:'#A9A9A9',fontSize:12}}>{products.length} results</CustomeText>
      </View>
      <View style={{ height: 10 }} />
      <Products products={products} loading={loading} />
    </Animated.View>
  );
};

const style = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  searchReasult:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginVertical:20,


  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
});
export default ProductsPage;
