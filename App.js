import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { ProgressViewIOSComponent, StyleSheet, View } from "react-native";
// Custom imports
import Header from "./components/Header";
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";

export default function App() {
  const [state, updateState] = useState({
    userNumber: null,
    guessRounds: 0,
  });

  const startGameHandler = (selectedNumber) => {
    let update = { userNumber: selectedNumber, guessRounds: 0 };
    updateState({ ...state, ...update });
  };

  const gameOverHandler = (numOfRounds) => {
    updateState({ ...state, guessRounds: numOfRounds });
  };

  const configureNewGameHandler = () => {
    const update = { userNumber: null, guessRounds: 0 };
    updateState({ ...state, ...update });
  };

  // Logic
  let content = <StartGameScreen onStartGame={startGameHandler} />;
  if (state.userNumber != null) {
    if (state.guessRounds == 0) {
      content = (
        <GameScreen
          userChoice={state.userNumber}
          onGameOver={gameOverHandler}
        />
      );
    } else {
      content = (
        <GameOverScreen
          roundsNumber={state.guessRounds}
          userNumber={state.userNumber}
          onRestart={configureNewGameHandler}
        />
      );
    }
  }

  return (
    <View style={styles.screen}>
      <Header title="Guess a number" />
      <StatusBar style="auto" />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
