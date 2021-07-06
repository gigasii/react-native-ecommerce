import { MEALS } from "../../data/dummy-data";
import { TOGGLE_FAVORITE } from "../actions/meal";

// State
const initialState = {
  meals: MEALS,
  filteredMeals: MEALS,
  favoriteMeals: [],
};

// Reducer (Event-listener)
const mealsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FAVORITE:
      const existingIndex = state.favoriteMeals.findIndex(
        (meal) => meal.id === action.payload
      );
      // Remove favorite
      if (existingIndex != -1) {
        const updatedFavMeals = [...state.favoriteMeals];
        updatedFavMeals.splice(existingIndex, 1);
        return { ...state, favoriteMeals: updatedFavMeals };
      }
      // Add favorite
      else {
        const addedMeal = state.meals.find(
          (meal) => meal.id === action.payload
        );
        const updatedFavMeals = [...state.favoriteMeals];
        updatedFavMeals.push(addedMeal);
        return { ...state, favoriteMeals: updatedFavMeals };
      }
    default:
      return state;
  }
};

export default mealsReducer;
