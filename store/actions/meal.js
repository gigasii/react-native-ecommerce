// Constants
export const TOGGLE_FAVORITE = "TOGGLE_FAVORITE";

// Actions
export const toggleFavorite = (id) => {
  return { type: TOGGLE_FAVORITE, payload: id };
};
