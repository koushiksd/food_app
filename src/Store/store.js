import { configureStore } from "@reduxjs/toolkit";
import FoodReducers from "./food"

export const store = configureStore({
    reducer:{
        food:FoodReducers
    }
})