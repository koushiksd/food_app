import { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { apicall } from "../helpers/axios";
import LoadingText from "../Components/Loading";
import { CustomeText } from "../Components/Text";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import Entypo from "@expo/vector-icons/Entypo";

const ProductDetails = ({ navigation, route }) => {
  let [item, setitem] = useState(null);
  let [ingredient, setingredient] = useState([]);
  let [loading, setloading] = useState(true);
  //lookup.php?i=\
  let nav = useNavigation();
  let fetchProducts = () => {
    setloading(true);
    apicall("lookup.php?i=" + route.params.idMeal)
      .then((res) => {
        let ing = [];
        let data = res.data.meals[0];
        setitem(data);
        for (let i = 1; i <= 20; i++) {
          let str = "strIngredient" + i;
          let str1 = "strMeasure" + i;
          data[str] != "" && ing.push(`${data[str]} - ${data[str1]}`);
        }
        setingredient(ing);
 
        setTimeout(() => {
          setloading(false);
        }, 1000);
      })
      .catch((err) => {
        // setloading(false);
        console.log(err);
      });
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <View style={style.mainContainer}>
      {loading ? (
        <LoadingText />
      ) : (
        <View
       
          style={{ padding: 10, flex: 1 }}
        >
          <View
       style={style.header}>
            <Pressable
              onPress={() => {
                nav.goBack();
              }}
              style={{
                backgroundColor: "white",
                width: 40,
                height: 40,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 10,
                zIndex: 10,
              }}
            >
              <View style={{}}>
                <Ionicons name="arrow-back-sharp" size={30} color="black" />
              </View>
            </Pressable>
            <CustomeText>Recipe</CustomeText>
            <View>
              <Entypo name="heart-outlined" size={30} color="black" />
            </View>
          </View>
          <CustomeText
            style={{
              fontSize: 20,
              fontFamily: "Poppins-SemiBold",
              marginTop: 20,
              width: Dimensions.get("screen").width - 100,
            }}
          >
            {item.strMeal} - {item.strCategory}
          </CustomeText>
          <CustomeText style={{ fontSize: 12, marginTop: -5, marginBottom: 5 }}>
            from {item.strArea}
          </CustomeText>
          <View style={style.imageContainer}>
            <Image source={{ uri: item.strMealThumb }} style={style.image} />
          </View>

          <View style={{ flex: 1 }}>
            <ScrollView bounces={false} contentContainerStyle={{ flexGrow: 1 }}>
              <View style={{ flex: 1 }}>
                <CustomeText
                  style={{ fontFamily: "Poppins-SemiBold", fontSize: 14 }}
                >
                  Required Ingredients
                </CustomeText>
                <View style={{ padding: 10 }}>
                  <FlatList
                    data={ingredient}
                    scrollEnabled={false}
                    keyExtractor={(item, index) => index}
                    renderItem={({ item, index }) => {
                      return (
                        <CustomeText style={{ fontSize: 12 }}>
                          {index + 1}. {item}
                        </CustomeText>
                      );
                    }}
                  />
                </View>

                <CustomeText
                  style={{ fontFamily: "Poppins-SemiBold", fontSize: 14 }}
                >
                  Instructions
                </CustomeText>
                <CustomeText style={{ fontSize: 12, padding: 10 }}>
                  {item.strInstructions}
                </CustomeText>
              </View>
            </ScrollView>
          </View>
        </View>
      )}
    </View>
  );
};
const style = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
    paddingBottom: 50,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  imageContainer: {
    borderRadius: 20,
    marginVertical: 20,
    overflow: "hidden",
  },
  image: {
    width: Dimensions.get("screen").width - 20,
    height: 200,
    resizeMode: "fill",
  },
});
export default ProductDetails;
