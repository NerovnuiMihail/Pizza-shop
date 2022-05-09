import { createSlice } from "@reduxjs/toolkit";

const shopSlice = createSlice({
    name: "shop",
    initialState: {
        pizza: [],
        dessert: [],
        drinks: [],
        snacks: [],
        bonus: []
    },
    reducers: {
        setPizzaData(state,action) {
            state.pizza = action.payload.pizza
        },
        setDessertData(state,action) {
            state.dessert = action.payload.dessert
        },
        setDrinksData(state,action) {
            state.drinks = action.payload.drinks
        },
        setSnacksData(state,action) {
            state.snacks = action.payload.snacks
        },
        setBonusData(state,action) {
            state.bonus = action.payload.bonus
        }
    }
});

export const { setPizzaData, setDessertData, setDrinksData, setSnacksData, setBonusData } = shopSlice.actions;
export default shopSlice.reducer;