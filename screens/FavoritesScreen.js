import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector } from "react-redux";
// Custom imports
import MealList from "../components/MealList";
import HeaderButton from "../components/HeaderButton";

const FavoritesScreen = (props) => {
  // Determine meals under this screen
  const favMeals = useSelector((state) => state.meals.favoriteMeals);

  // Render component
  if (favMeals.length === 0) {
    return (
      <View style={styles.content}>
        <Text>No favorite meals found</Text>
      </View>
    );
  }

  return <MealList listData={favMeals} navigation={props.navigation} />;
};

// Screen styling
FavoritesScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Your Favorites",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => navData.navigation.toggleDrawer()}
        />
      </HeaderButtons>
    ),
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

export default FavoritesScreen;
