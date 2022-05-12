import { createSlice } from "@reduxjs/toolkit";

const basketSlice = createSlice({
    name: "basket",
    initialState: {
        basket: {
            pizza: [],
            dessert: [],
            drinks: [],
            snacks: [],
            combos: [],
            selectExtra: [],
            costExtra: 0,
            currentBasket: []
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
        ChangeSelectExtra(state, action) {
            state.basket.selectExtra = action.payload
        },
        setCostExtra(state, action) {
            state.basket.costExtra = action.payload
        },
        createCurrentBasket(state, action) {
            state.basket.currentBasket = action.payload
        }
    }
});

export const {
    addNewPizzaItem,
    addNewDessertItem,
    addNewDrinksItem,
    addNewSnacksItem,
    addNewCombosItem,
    ChangeSelectExtra,
    setCostExtra,
    createCurrentBasket
} = basketSlice.actions;
export default basketSlice.reducer;