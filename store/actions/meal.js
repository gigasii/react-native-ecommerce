// Constants
export const TOGGLE_FAVORITE = "TOGGLE_FAVORITE";
export const SET_FILTERS = "SET_FILTERS";

// Actions (Events that convey info to reducers)
export const toggleFavorite = (id) => {
  return { type: TOGGLE_FAVORITE, payload: id };
};

export const setFilters = (filterSettings) => {
  return { type: SET_FILTERS, payload: filterSettings };
};
