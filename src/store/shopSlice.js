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
        extra: [],
        selectPizza: {
            dough: "traditional",
            size: 25
        }
    },
    reducers: {
        setPizzaData(state, action) {
            state.pizza = action.payload.pizza
        },
        setCombosData(state, action) {
            state.combos = action.payload.combos
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
        setExtraData(state, action) {
            state.extra = action.payload.extra
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
    setExtraData,
    changeSelectPizza,
    setCombosData
} = shopSlice.actions;
export default shopSlice.reducer;