import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, Alert, ScrollView } from "react-native";
// Custom imports
import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";
import Font from "../theme/Font";
import MainButton from "../components/MainButton";
import { Ionicons } from "@expo/vector-icons";

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  }
  return rndNum;
};

const renderListItem = (key, value, roundNumber) => {
  return (
    <View key={key} style={styles.listItem}>
      <Text style={Font.bodyText}># {roundNumber}</Text>
      <Text style={Font.bodyText}>{value}</Text>
    </View>
  );
};

const GameScreen = (props) => {
  // References
  const currentLow = useRef(1);
  const currentHigh = useRef(100);
  // Additional functionality
  const initialGuess = generateRandomBetween(
    currentLow.current,
    currentHigh.current,
    props.userChoice
  );
  // State
  const [state, updateState] = useState({
    currentGuess: initialGuess,
    pastGusses: [initialGuess],
  });

  // Side-effects
  const { userChoice, onGameOver } = props;
  useEffect(() => {
    if (state.currentGuess === userChoice) {
      onGameOver(state.pastGusses.length);
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
    const update = {
      currentGuess: nextNumber,
      pastGusses: [nextNumber, ...state.pastGusses],
    };
    updateState({ ...state, ...update });
  };

  return (
    <View style={styles.screen}>
      <Text style={Font.title}>Opponent's guess</Text>
      <NumberContainer>{state.currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <MainButton onPress={() => nextGuessHandler(false)}>
          <Ionicons name="remove" size={24} color="white" />
        </MainButton>
        <MainButton onPress={() => nextGuessHandler(true)}>
          <Ionicons name="add" size={24} color="white" />
        </MainButton>
      </Card>
      <View style={styles.listContainer}>
        <ScrollView contentContainerStyle={styles.list}>
          {state.pastGusses.map((guess, index) =>
            renderListItem(index, guess, state.pastGusses.length - index)
          )}
        </ScrollView>
      </View>
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
    maxWidth: "90%",
  },
  listContainer: {
    flex: 1,
  },
  list: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  listItem: {
    borderColor: "black",
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
  },
});

export default GameScreen;
