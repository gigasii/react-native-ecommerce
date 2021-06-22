import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Text, View } from "react-native";
// Custom imports
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

// Load assets asynchronously before app starts
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

  // Splash screen remains untill fonts load
  if (!state.fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => updateState({ ...state, fontLoaded: true })}
        onError={(err) => {}}
      />
    );
  }

  return (
    <View>
      <Text>Hello World</Text>
      <StatusBar style="auto" />
    </View>
  );
}
