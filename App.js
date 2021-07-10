import React from "react";
import { Provider } from "react-redux";
// Custom imports
import store from "./store/store";
import ShopNavigator from "./navigation/ShopNavigator";

export default function App() {
  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  );
}
