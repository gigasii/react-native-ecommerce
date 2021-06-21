import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
// Custom imports
import Color from "../theme/Color";
import Card from "../components/Card";
import Input from "../components/Input";
import NumberContainer from "../components/NumberContainer";
import MainButton from "../components/MainButton";

const StartGameScreen = (props) => {
  const [state, updateState] = useState({
    enteredValue: "",
    confirmed: false,
    selectedNumber: 0,
    buttonWidth: Dimensions.get("window").width / 4,
  });

  useEffect(() => {
    // Orientation listener
    const updateLayout = () => {
      updateState({
        ...state,
        buttonWidth: Dimensions.get("window").width / 4,
      });
    };
    Dimensions.addEventListener("change", updateLayout);
    // Cleanup listener
    return () => Dimensions.removeEventListener("change", updateLayout);
  });

  // Handle validation and set number entered
  const numberInputHandler = (inputText) => {
    updateState({ ...state, enteredValue: inputText.replace(/[^0-9]/g, "") });
  };

  const resetInputHandler = () => {
    const update = {
      enteredValue: "",
      confirmed: false,
    };
    updateState({ ...state, ...update });
  };

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(state.enteredValue);
    // Check for numbers that are not accepted
    if (isNaN(chosenNumber) || chosenNumber == 0) {
      Alert.alert("Invalid number!", "Must be between 0 and 99", [
        { text: "Okay", style: "cancel", onpress: resetInputHandler },
      ]);
      return;
    }
    const update = {
      enteredValue: "",
      selectedNumber: chosenNumber,
      confirmed: true,
    };
    updateState({ ...state, ...update });
    Keyboard.dismiss();
  };

  // Logic
  let confirmedOutput;
  if (state.confirmed) {
    confirmedOutput = (
      <Card style={styles.summaryContainer}>
        <Text>You selected</Text>
        <NumberContainer>{state.selectedNumber}</NumberContainer>
        <MainButton onPress={() => props.onStartGame(state.selectedNumber)}>
          START GAME
        </MainButton>
      </Card>
    );
  }

  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
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
                <View style={{ width: state.buttonWidth }}>
                  <Button
                    title="RESET"
                    color={Color.primary}
                    onPress={resetInputHandler}
                  />
                </View>
                <View style={{ width: state.buttonWidth }}>
                  <Button
                    title="CONFIRM"
                    color={Color.accent}
                    onPress={confirmInputHandler}
                  />
                </View>
              </View>
            </Card>
            {confirmedOutput}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
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
    //width: 300,
    //maxWidth: "80%",
    width: "80%",
    minWidth: 300,
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
  summaryContainer: {
    marginTop: 20,
    alignItems: "center",
  },
});

export default StartGameScreen;
