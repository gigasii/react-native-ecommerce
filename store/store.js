import { createStore, combineReducers, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
// Custom imports
import productsReducer from "../store/reducers/products";
import cartReducer from "../store/reducers/cart";
import orderReducer from "../store/reducers/orders";

// Combine reducers
const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: orderReducer,
});

// Create store
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default store;
