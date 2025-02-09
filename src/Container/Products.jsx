import { Text, View, FlatList, StyleSheet, Dimensions } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { foodList, isLoading } from "../Store/food";

import ProductCard from "../Components/ProductCard";
import { useEffect, useState } from "react";
import Animated, { FadeInUp } from "react-native-reanimated";
const FadeIn_ = FadeInUp.springify().damping(0).stiffness(100);
const Products = () => {
  let dispatch = useDispatch();
  let texts = [
    "Applesauce was the first food eaten in space.",
    " Broccoli contains more protein (per calorie) than steak!",
    "Raspberries are a member of the rose family.",
    "Potatoes were the first food planted in space.",
    "Cucumbers are 95% water.",
    "Figs aren’t fruits, they are flowers.",
  ];
  let loading = useSelector(isLoading);
  let [cheight, setcheight] = useState(300);
  let products = useSelector(foodList);
  const style = StyleSheet.create({
    productMain: {
      height: cheight,
    },
    factsContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    facts: {
      fontSize: 24,
      fontFamily: "Poppins-Bold",
      textAlign: "center",
    },
  });
  useEffect(() => {
    console.log({ products });
  }, [products]);
  return (
    <View
      style={style.productMain}
      onLayout={(e) => {
        e.target.measure((x, y, width, height, pagex, pagey) => {
          console.log({
            x,
            y,
            pagey,
            Dimensions: Dimensions.get("screen").height,
          });
          setcheight(
            Dimensions.get("screen").height - pagey < 200
              ? 200
              : Dimensions.get("screen").height - pagey - 50
          );
        });
      }}
    >
      {loading ? (
        <Animated.View style={style.factsContainer} entering={FadeIn_}>
          <Animated.Text entering={FadeIn_} style={style.facts}>
            {texts[Math.floor(Math.random() * 5)]}
          </Animated.Text>
        </Animated.View>
      ) : products.length > 0 ? (
        <Animated.View
          style={style.factsContainer}
          entering={FadeIn_.delay(10)}
          exiting={FadeIn_}
        >
          <Animated.FlatList
            data={products}
            entering={FadeIn_}
            exiting={FadeIn_}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              justifyContent: "space-around",
              flexDirection: "row",
              flexWrap: "wrap",
            }}
            keyExtractor={(item) => item.idMeal}
            renderItem={(item, index) => {
              return (
                <ProductCard
                  item={item.item}
                 
                />
              );
            }}
          />
        </Animated.View>
      ) : (
        <Animated.View style={style.factsContainer} entering={FadeIn_}>
        <Animated.Text entering={FadeIn_} style={style.facts}>
          No Products Found, Sorry!
        </Animated.Text>
      </Animated.View>
      )}
    </View>
  );
};

export default Products;
