import { createStore, combineReducers } from "redux";
// Custom imports
import mealsReducer from "./reducers/meals";

// Combine reducers into a single instance
const rootReducer = combineReducers({
  meals: mealsReducer,
});

// Create central store
const store = createStore(rootReducer);

export default store;
