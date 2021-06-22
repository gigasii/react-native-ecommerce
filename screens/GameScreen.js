import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  FlatList,
  Dimensions,
} from "react-native";
// Custom imports
import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";
import Font from "../theme/Font";
import MainButton from "../components/MainButton";
import { Ionicons } from "@expo/vector-icons";
import * as ScreenOrientation from "expo-screen-orientation";

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  }
  return rndNum;
};

const renderListItem = (value, roundNumber) => {
  return (
    <View style={styles.listItem}>
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
    pastGusses: [initialGuess.toString()],
    deviceWidth: Dimensions.get("window").width,
    deviceHeight: Dimensions.get("window").height,
  });

  // Locks orientation
  //ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);

  // Side-effects
  const { userChoice, onGameOver } = props;

  useEffect(() => {
    if (state.currentGuess === userChoice) {
      onGameOver(state.pastGusses.length);
    }
  }, [state.currentGuess, userChoice, onGameOver]);

  useEffect(() => {
    // Orientation listener
    const updateLayout = () => {
      const update = {
        deviceWidth: Dimensions.get("window").width,
        deviceHeight: Dimensions.get("window").height,
      };
      updateState({ ...state, ...update });
    };
    Dimensions.addEventListener("change", updateLayout);
    // Cleanup listener
    return () => Dimensions.removeEventListener("change", updateLayout);
  });

  // Game logic
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
      currentLow.current = state.currentGuess + 1;
    }
    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      state.currentGuess
    );
    const update = {
      currentGuess: nextNumber,
      pastGusses: [nextNumber.toString(), ...state.pastGusses],
    };
    updateState({ ...state, ...update });
  };

  // Determine what layout to render
  if (state.deviceHeight < 500) {
    return (
      <View style={styles.screen}>
        <Text style={Font.title}>Opponent's guess</Text>
        <View style={styles.controls}>
          <MainButton onPress={() => nextGuessHandler(false)}>
            <Ionicons name="remove" size={24} color="white" />
          </MainButton>
          <NumberContainer>{state.currentGuess}</NumberContainer>
          <MainButton onPress={() => nextGuessHandler(true)}>
            <Ionicons name="add" size={24} color="white" />
          </MainButton>
        </View>
        <View style={styles.listContainer}>
          <FlatList
            contentContainerStyle={styles.list}
            keyExtractor={(item) => item}
            data={state.pastGusses}
            renderItem={(itemData) =>
              renderListItem(
                itemData.item,
                state.pastGusses.length - itemData.index
              )
            }
          />
        </View>
      </View>
    );
  }

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
        <FlatList
          contentContainerStyle={styles.list}
          keyExtractor={(item) => item}
          data={state.pastGusses}
          renderItem={(itemData) =>
            renderListItem(
              itemData.item,
              state.pastGusses.length - itemData.index
            )
          }
        />
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
    marginTop: Dimensions.get("window").width > 600 ? 20 : 5,
    width: 300,
    maxWidth: "90%",
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "80%",
  },
  listContainer: {
    flex: 1,
    width: "60%",
  },
  list: {
    flexGrow: 1,
    //justifyContent: "flex-end",
  },
  listItem: {
    borderColor: "black",
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});

export default GameScreen;
