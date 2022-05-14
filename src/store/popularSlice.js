import { createSlice } from "@reduxjs/toolkit";

const popularSlice = createSlice({
    name: "popular",
    initialState: {
        pizza: [],
        dessert: [],
        drinks: [],
        snacks: [],
        combos: []
    },
    reducers: {
        addPopularPizza(state, action) {
            state.pizza = action.payload
        },
        addPopularDessert(state, action) {
            state.dessert = action.payload
        },
        addPopularDrinks(state, action) {
            state.drinks = action.payload
        },
        addPopularSnacks(state, action) {
            state.snacks = action.payload
        },
        addPopularCombos(state, action) {
            state.combos = action.payload
        }
    }
});

export const {
    addPopularPizza,
    addPopularDessert,
    addPopularDrinks,
    addPopularSnacks,
    addPopularCombos
} = popularSlice.actions;

export default popularSlice.reducer;