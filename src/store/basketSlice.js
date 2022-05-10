import { createSlice } from "@reduxjs/toolkit";

const basketSlice = createSlice({
    name: "basket",
    initialState: {
        basket: {
            pizza: [],
            dessert: [],
            drinks: [],
            snacks: [],
            combos: []
        }
    },
    reducers: {
        addNewPizzaItem(state, action) {
            state.basket.pizza = action.payload
        },
        addNewDessertItem(state, action) {
            state.basket.dessert = action.payload
        },
        addNewDrinksItem(state, action) {
            state.basket.drinks = action.payload
        },
        addNewSnacksItem(state, action) {
            state.basket.snacks = action.payload
        },
        addNewCombosItem(state, action) {
            state.basket.combos = action.payload
        },
    }
});

export const {
    addNewPizzaItem,
    addNewDessertItem,
    addNewDrinksItem,
    addNewSnacksItem,
    addNewCombosItem
} = basketSlice.actions;
export default basketSlice.reducer;