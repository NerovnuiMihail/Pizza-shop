import { createSlice } from "@reduxjs/toolkit";


const combosSlice = createSlice({
    name: "combos",
    initialState: {
        combosItems: []
    },
    reducers: {
        setCombosItem(state,action) {
            state.combosItems = action.payload;
        }
    }
});

export const {
    setCombosItem
} = combosSlice.actions;

export default combosSlice.reducer;