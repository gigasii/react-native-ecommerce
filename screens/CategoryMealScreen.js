import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
// Custom imports
import { CATEGORIES } from "../data/dummy-data";
import MealList from "../components/MealList";

const CategoryMealScreen = (props) => {
  // Retrieve params passed to this screen
  const catId = props.navigation.getParam("categoryId");
  // Determine meals under this category
  const availableMeals = useSelector((state) => state.meals.filteredMeals);
  const displayedMeals = availableMeals.filter((meal) =>
    meal.categoryIds.includes(catId)
  );

  // Render component
  if (displayedMeals.length === 0) {
    return (
      <View style={styles.content}>
        <Text>No meals found</Text>
      </View>
    );
  }

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

// Component styling
const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CategoryMealScreen;
