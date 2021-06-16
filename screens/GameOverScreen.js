import React from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";
// Custom imports
import Font from "../theme/Font";
import Color from "../theme/Color";

const GameOverScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text style={Font.title}>Game Over</Text>
      <View style={styles.imageContainer}>
        <Image
          //source={require("../assets/success.png")}
          source={{
            uri: "https://ichef.bbci.co.uk/news/976/cpsprodpb/C6EA/production/_112522905_whatsubject.jpg",
          }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View style={styles.resultContainer}>
        <Text style={Font.bodyText}>
          Your phone needed{" "}
          <Text style={styles.highlight}>{props.roundsNumber}</Text> rounds to
          guess the number{" "}
          <Text style={styles.highlight}>{props.roundsNumber}</Text>
        </Text>
        <Button title="NEW GAME" onPress={props.onRestart} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imageContainer: {
    width: 300,
    height: 300,
    borderRadius: 200,
    borderWidth: 3,
    borderColor: "black",
    overflow: "hidden",
    marginVertical: 30,
  },
  resultContainer: {
    marginHorizontal: 20,
  },
  highlight: {
    color: Color.primary,
  },
});

export default GameOverScreen;
