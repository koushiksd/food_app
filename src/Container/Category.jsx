import { Text, View, FlatList, StyleSheet, Pressable ,ActivityIndicator} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  categoryList,
  categorySeleted,
  isLoading,
  setFood,
  setLoading,
  setSeletedCategory,
} from "../Store/food";
import Animated, { FadeInUp } from "react-native-reanimated";
import { apicall } from "../helpers/axios";
import { BounceInLeft } from "react-native-reanimated/src/layoutReanimation";
const FadeIn_ = FadeInUp.springify().damping(100).stiffness(100);
const Category = () => {
  let dispath = useDispatch();
  let loading = useSelector(isLoading)
  let category = useSelector(categoryList);
  let seletedCategory = useSelector(categorySeleted);
  const updateCatagory = (value) => {
    dispath(setLoading(true))
    dispath(setSeletedCategory(value));
    let search = value == "All" ? "search.php?s" :"filter.php?c=" + value;
//    console.log(search);

    apicall( search)
      .then((res) => {
        dispath(setFood(res.data.meals));
        setTimeout(()=>{
          dispath(setLoading(false))
        },2000)
        
      })
      .catch((err) => {
        setTimeout(()=>{
          dispath(setLoading(false))
        },2000)
        console.log({ err });
      });
  };

  return (
    <View style={style.categoryContainer}>
      <FlatList
        horizontal
        bounces={false}
        showsHorizontalScrollIndicator={false}
        data={category}
        keyExtractor={(item, index) => index}
        renderItem={(item, index) => {
          return (
            <Pressable
              onPress={() => {
                updateCatagory(item.item);
              }}
            >
              <Animated.View
                entering={FadeIn_}

                style={[
                  style.itemContainer,
                  {
                    backgroundColor:
                      seletedCategory == item.item ? "#129575" : "white",
                  },
                ]}
              >
                <Animated.Text
             
                  style={{
                    color: seletedCategory == item.item ? "#FFFFFF" : "#71B1A1",
                    fontFamily: "Poppins-Regular",
                    fontSize:12,
                    fontWeight:600
                  }}
                >
                  {item.item}{" "}
                </Animated.Text>
             
              </Animated.View>
            </Pressable>
          );
        }}
      />
    </View>
  );
};
const style = StyleSheet.create({
  categoryContainer: {
    paddingVertical: 15,
  },
  itemContainer: {
    paddingVertical: 7,
    paddingHorizontal: 20,
    borderRadius: 10,
    justifyContent: "center",
    flexDirection:'row',
    
    alignItems: "center",
  },
});
export default Category;
