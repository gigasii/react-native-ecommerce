import React from "react";
import { View, Text, StyleSheet } from "react-native";
// Custom imports
import Color from "../theme/Color";

const NumberContainer = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.number}>{props.children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: Color.accent,
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  number: {
    color: Color.accent,
    fontSize: 22,
  },
});

export default NumberContainer;
