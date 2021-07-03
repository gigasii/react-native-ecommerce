import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Switch, Platform } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
// Custom imports
import HeaderButton from "../components/HeaderButton";
import Colors from "../constants/Colors";

const FilterSwitch = (props) => {
  return (
    <View style={styles.filterContainer}>
      <Text>{props.label}</Text>
      <Switch
        trackColor={{ true: Colors.primaryColor }}
        thumbColor={Platform.OS === "android" ? Colors.primaryColor : ""}
        value={props.state}
        onValueChange={props.onChange}
      />
    </View>
  );
};

const FilterScreen = (props) => {
  // State
  const [state, updateState] = useState({
    isGlutenFree: false,
    isLactoseFree: false,
    isVegan: false,
    isVegetarian: false,
  });

  // Callback to resave filters
  const saveFilters = () => {
    const appliedFilters = {
      glutenFree: state.isGlutenFree,
      lactoseFree: state.isLactoseFree,
      vegan: state.isVegan,
      isVegetarian: state.isVegetarian,
    };
    console.log(appliedFilters);
  };

  // Side-effects
  useEffect(() => {
    props.navigation.setParams({ save: saveFilters });
  }, [
    state.isGlutenFree,
    state.isLactoseFree,
    state.isVegan,
    state.isVegetarian,
  ]);

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Available Filters / Restrictions</Text>
      <FilterSwitch
        label="Gluten-free"
        state={state.isGlutenFree}
        onChange={(newValue) =>
          updateState({ ...state, isGlutenFree: newValue })
        }
      />
      <FilterSwitch
        label="Lactose-free"
        state={state.isLactoseFree}
        onChange={(newValue) =>
          updateState({ ...state, isLactoseFree: newValue })
        }
      />
      <FilterSwitch
        label="Vegan"
        state={state.isVegan}
        onChange={(newValue) => updateState({ ...state, isVegan: newValue })}
      />
      <FilterSwitch
        label="Vegetarian"
        state={state.isVegetarian}
        onChange={(newValue) =>
          updateState({ ...state, isVegetarian: newValue })
        }
      />
    </View>
  );
};

// Screen styling
FilterScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Filter Meals",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => navData.navigation.toggleDrawer()}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Save"
          iconName="ios-save"
          onPress={navData.navigation.getParam("save")}
        />
      </HeaderButtons>
    ),
  };
};

// Component styling
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 22,
    margin: 20,
    textAlign: "center",
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
    marginVertical: 15,
  },
});

export default FilterScreen;
