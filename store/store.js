import { createStore, combineReducers } from "redux";
// Custom imports
import productsReducer from "../store/reducers/products";
import cartReducer from "../store/reducers/cart";

// Combine reducers
const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
});

// Create store
const store = createStore(rootReducer);

export default store;
