import { createSlice } from "@reduxjs/toolkit";

export const FoodSlice = createSlice({
  name: "food",
  initialState: {
    food: [],
    loading: false,
    category: [],
    seletedCategory: "All",
    results: {
      data: [],
      loading: false,
    },
    search: "",
  },
  reducers: {
    setFood: (state, action) => {
      action.payload.map((i) => {
        i.rating = (2 + Math.random() * (5 - 2)).toFixed(1);
      });
      state.food = action.payload == null ? [] : action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setSeletedCategory: (state, action) => {
      state.seletedCategory = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setResultLoading: (state, action) => {
      state.results.loading = action.payload;
    },
    setResult: (state, action) => {
      action.payload.map((i) => {
        i.rating = (2 + Math.random() * (5 - 2)).toFixed(1);
      });
    
      state.results.data = action.payload == null ? [] : action.payload;
    },
  },
});

export const {
  setFood,
  setCategory,
  setSeletedCategory,
  setLoading,
  setSearch,
  setResult,setResultLoading
} = FoodSlice.actions;
export const foodList = (state) => state.food.food;
export const searchList = (state) => state.food.results.data;
export const resultsLoading = (state) => state.food.results.loading;
export const categoryList = (state) => state.food.category;
export const isLoading = (state) => state.food.loading;
export const categorySeleted = (state) => state.food.seletedCategory;
export const searchString = (state) => state.food.search;
export default FoodSlice.reducer;
