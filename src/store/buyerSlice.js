import { createSlice } from "@reduxjs/toolkit";

const buyerSlice = createSlice({
    name: "buyer",
    initialState: {
        nameD: "",
        telD: "",
        cityD: "",
        streetD: "",
        commentsD: "",
        houseD: "",
        roomD: "",
        entranceD: "",
        floorD: "",
        nameP: "",
        telP: "",
        cityP: "",
        restaurantP: "",
        commentsP: "",
        detail: {
            number: null,
            method: null
        }
    },
    reducers: {
        setDetail(state, action) {
            state.detail.number = action.payload.number;
            state.detail.method = action.payload.method;
        },
        setNameD(state, action) {
            state.nameD = action.payload
        },
        setTelD(state, action) {
            state.telD = action.payload
        },
        setCityD(state, action) {
            state.cityD = action.payload
        },
        setStreetD(state, action) {
            state.streetD = action.payload
        },
        setCommentsD(state, action) {
            state.commentsD = action.payload
        },
        setHouseD(state, action) {
            state.houseD = action.payload
        },
        setRoomD(state, action) {
            state.roomD = action.payload
        },
        setEntranceD(state, action) {
            state.entranceD = action.payload
        },
        setFloorD(state, action) {
            state.floorD = action.payload
        },
        setRestaurantP(state, action) {
            state.restaurantP = action.payload
        },
        setNameP(state, action) {
            state.nameP = action.payload
        },
        setTelP(state, action) {
            state.telP = action.payload
        },
        setCityP(state, action) {
            state.cityP = action.payload
        },
        setCommentsP(state, action) {
            state.commentsP = action.payload
        }
    }
});

export const {
    setDetail,
    setNameD,
    setTelD,
    setCityD,
    setStreetD,
    setCommentsD,
    setHouseD,
    setRoomD,
    setEntranceD,
    setFloorD,
    setRestaurantP,
    setNameP,
    setTelP,
    setCityP,
    setCommentsP
} = buyerSlice.actions;

export default buyerSlice.reducer;