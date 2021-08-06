import React, { useState } from "react";
import { Provider } from "react-redux";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
// Custom imports
import store from "./store/store";
import ShopNavigator from "./navigation/ShopNavigator";

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

export default function App() {
  // State
  const [state, updateState] = useState({
    fontLoaded: false,
  });

  // Load assets asynchronously before app starts
  if (!state.fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => updateState({ ...state, fontLoaded: true })}
        onError={(error) => {}}
      />
    );
  }

  // Render
  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  );
}
