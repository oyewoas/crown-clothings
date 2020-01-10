import { combineReducers } from "redux";
import userReducer from "./user/user.reducer";
import cartReducer from "./cart/cart.reducer";

// represent all the state(reducer) for the App

export default combineReducers({
    user: userReducer,
    cart: cartReducer
})
