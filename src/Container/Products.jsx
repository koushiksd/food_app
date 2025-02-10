import { Text, View, FlatList, StyleSheet, Dimensions } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  foodList,
  isLoading,
  searchString,
  setFood,
  setLoading,
  setResult,
  setResultLoading,
} from "../Store/food";

import ProductCard from "../Components/ProductCard";
import { useEffect, useState } from "react";
import Animated, { FadeInUp } from "react-native-reanimated";
import { apicall } from "../helpers/axios";
import LoadingText from "../Components/Loading";
const FadeIn_ = FadeInUp.springify().damping(0).stiffness(100);
const Products = ({ products, loading }) => {
  let dispatch = useDispatch();
  let search = useSelector(searchString);

  const style = StyleSheet.create({
    productMain: {
      flex: 1,
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
  let fetchProduts = (search) => {
    dispatch(setResultLoading(true));

    let searchString_ = search == "" ? "" : "=" + search;
    apicall("search.php?s" + searchString_)
      .then((res) => {
        dispatch(setResult(res.data.meals == null ? [] : res.data.meals));

        setTimeout(() => {
          dispatch(setResultLoading(false));
        }, 500);
      })
      .catch((err) => {
        dispatch(setResultLoading(false));
        console.log({ err });
      });
  };
  useEffect(() => {
    //console.log({ search },57);
    fetchProduts(search);
  }, [search]);
  return (
    <View style={style.productMain}>
      {loading ? (
        <LoadingText />
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
              justifyContent: "flex-between",
              flexDirection: "row",
              flexWrap: "wrap",
            
            }}
            keyExtractor={(item) => item.idMeal}
            renderItem={(item, index) => {
              return <ProductCard item={item.item} />;
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
