import React from "react";
import { View, Text } from "react-native";

const FavouritesScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text>Favourites screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default FavouritesScreen;
