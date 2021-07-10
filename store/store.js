import { createStore, combineReducers } from "redux";
// Custom imports
import productsReducer from "../store/reducers/products";

// Combine reducers
const rootReducer = combineReducers({
  products: productsReducer,
});

// Create store
const store = createStore(rootReducer);

export default store;
