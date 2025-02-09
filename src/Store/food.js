import { createSlice } from "@reduxjs/toolkit";

export const FoodSlice = createSlice({
  name: "food",
  initialState: {
    food: [],
    loading:false,
    category: [],
    seletedCategory: "All",
    results: [],
    search: [],
  },
  reducers: {
    setFood: (state, action) => {
      console.log(action.payload,"asd")
    
      action.payload.map((i)=>{
        i.rating=(2 + Math.random() * (5 - 2)).toFixed(1)
      })
      state.food = action.payload==null?[]:action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setSeletedCategory: (state, action) => {
      state.seletedCategory = action.payload;
    },
    setLoading:(state,action)=>{
      state.loading=action.payload
    }
  },
});

export const { setFood, setCategory,setSeletedCategory,setLoading } = FoodSlice.actions;
export const foodList = (state) => state.food.food;
export const categoryList = (state) => state.food.category;
export const isLoading = (state)=>state.food.loading
export const categorySeleted = (state) => state.food.seletedCategory;
export default FoodSlice.reducer;
