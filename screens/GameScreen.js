import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
// Custom imports
import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";
import Font from "../theme/Font";

// Additional functionality
const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  }
  return rndNum;
};

const GameScreen = (props) => {
  const currentLow = useRef(1);
  const currentHigh = useRef(100);
  const [state, updateState] = useState({
    currentGuess: generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      props.userChoice
    ),
    rounds: 0,
  });

  // Side-effects
  const { userChoice, onGameOver } = props;
  useEffect(() => {
    if (state.currentGuess === userChoice) {
      onGameOver(state.rounds);
    }
  }, [state.currentGuess, userChoice, onGameOver]);

  const nextGuessHandler = (direction) => {
    // User gave wrong instruction
    if (
      (!direction && state.currentGuess < props.userChoice) ||
      (direction && state.currentGuess > props.userChoice)
    ) {
      Alert.alert("Incorrect selection", "Try again", [
        { text: "Retry", style: "cancel" },
      ]);
      return;
    }
    // Generate another number with new min max
    if (!direction) {
      currentHigh.current = state.currentGuess;
    } else {
      currentLow.current = state.currentGuess;
    }
    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      state.currentGuess
    );
    const update = { currentGuess: nextNumber, rounds: state.rounds + 1 };
    updateState({ ...state, ...update });
  };

  return (
    <View style={styles.screen}>
      <Text style={Font.title}>Opponent's guess</Text>
      <NumberContainer>{state.currentGuess}</NumberContainer>
      <Card>
        <Button title="LOWER" onPress={() => nextGuessHandler(false)} />
        <Button title="GREATER" onPress={() => nextGuessHandler(true)} />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    width: 300,
    maxWidth: "80%",
  },
});

export default GameScreen;
