import React from "react";
// Custom imports
import { CATEGORIES, MEALS } from "../data/dummy-data";
import MealList from "../components/MealList";

const CategoryMealScreen = (props) => {
  // Determine meals under this category
  const catId = props.navigation.getParam("categoryId");
  const displayedMeals = MEALS.filter((meal) =>
    meal.categoryIds.includes(catId)
  );

  return <MealList listData={displayedMeals} navigation={props.navigation} />;
};

// Screen styling
CategoryMealScreen.navigationOptions = (navigationData) => {
  // Retrieve parameters passed to screen
  const catId = navigationData.navigation.getParam("categoryId");
  const selectedCategory = CATEGORIES.find((cat) => cat.id === catId);
  return {
    headerTitle: selectedCategory.title,
  };
};

export default CategoryMealScreen;
