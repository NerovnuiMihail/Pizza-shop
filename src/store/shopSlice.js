import { createSlice } from "@reduxjs/toolkit";

const shopSlice = createSlice({
    name: "shop",
    initialState: {
        pizza: [],
        combos: [],
        dessert: [],
        drinks: [],
        snacks: [],
        bonus: [],
        selectPizza: {
            dough: "traditional",
            size: 25
        }
    },
    reducers: {
        setPizzaData(state, action) {
            state.pizza = action.payload.pizza
        },
        setDessertData(state, action) {
            state.dessert = action.payload.dessert
        },
        setDrinksData(state, action) {
            state.drinks = action.payload.drinks
        },
        setSnacksData(state, action) {
            state.snacks = action.payload.snacks
        },
        setBonusData(state, action) {
            state.bonus = action.payload.bonus
        },
        changeSelectPizza(state, action) {
            state.selectPizza.dough = action.payload.dough;
            state.selectPizza.size = action.payload.size
        }
    }
});

export const { 
    setPizzaData, 
    setDessertData, 
    setDrinksData, 
    setSnacksData, 
    setBonusData, 
    changeSelectPizza 
} = shopSlice.actions;
export default shopSlice.reducer;