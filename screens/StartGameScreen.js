import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
// Custom imports
import Color from "../theme/Color";
import Card from "../components/Card";
import Input from "../components/Input";

const StartGameScreen = (props) => {
  const [state, updateState] = useState({
    enteredValue: "",
  });

  // Handle validation and set number entered
  const numberInputHandler = (inputText) => {
    updateState({ ...state, enteredValue: inputText.replace(/[^0-9]/g, "") });
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.screen}>
        <Text style={styles.title}>Start a New Game!</Text>
        <Card style={styles.inputContainer}>
          <Text>Select a number</Text>
          <Input
            style={styles.input}
            blurOnSubmit
            autoCapitialize="none"
            autoCorrect={false}
            keyboardType="number-pad"
            maxLength={2}
            onChangeText={numberInputHandler}
            value={state.enteredValue}
          />
          <View style={styles.buttonContainer}>
            <Button title="RESET" color={Color.primary} />
            <Button title="CONFIRM" color={Color.accent} />
          </View>
        </Card>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
  },
  inputContainer: {
    width: 300,
    maxWidth: "80%",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  input: {
    width: 50,
    textAlign: "center",
  },
});

export default StartGameScreen;
