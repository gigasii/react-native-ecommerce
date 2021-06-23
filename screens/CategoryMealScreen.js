import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
// Custom imports
import { CATEGORIES } from "../data/dummy-data";

const CategoryMealScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text>Category Meal screen</Text>
      <Button
        title="Go to details"
        onPress={() => props.navigation.navigate({ routeName: "MealDetail" })}
      />
    </View>
  );
};

// Header styling
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
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CategoryMealScreen;
