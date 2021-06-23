import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
// Custom imports
import Colors from "../constants/Colors";
import CategoriesScreen from "../screens/CategoriesScreen";
import CategoryMealsScreen from "../screens/CategoryMealScreen";
import MealDetailScreen from "../screens/MealDetailScreen";

const MealsNavigator = createStackNavigator(
  {
    Categories: CategoriesScreen,
    CategoryMeals: CategoryMealsScreen,
    MealDetail: MealDetailScreen,
  },
  {
    initialRouteName: "Categories",
    mode: "card",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "",
      },
      headerTintColor: Colors.primaryColor,
    },
  }
);

export default createAppContainer(MealsNavigator);
