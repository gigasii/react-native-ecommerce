import React from "react";
import { View, Text, StyleSheet } from "react-native";
// Custom imports
import { MEALS } from "../data/dummy-data";

const MealDetailScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text>Meal Detail screen</Text>
    </View>
  );
};

// Header styling
MealDetailScreen.navigationOptions = (navigationData) => {
  // Retrieve parameters passed to screen
  const mealId = navigationData.navigation.getParam("mealId");
  const selectedMeal = MEALS.find((meal) => meal.id === mealId);
  return { headerTitle: selectedMeal.title };
};

// Component styling
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MealDetailScreen;
