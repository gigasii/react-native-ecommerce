import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Modal } from "react-native";

const GoalInput = (props) => {
  const [state, updateState] = useState({
    enteredGoal: "",
  });

  const goalInputHandler = (enteredText) => {
    updateState({ ...state, enteredGoal: enteredText });
  };

  const addGoalHandler = () => {
    props.onAddGoal(state.enteredGoal);
    updateState({ ...state, enteredGoal: "" });
  };

  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Course Goal"
          style={styles.input}
          onChangeText={goalInputHandler}
          value={state.enteredGoal}
        />
        <View style={styles.buttonContainer}>
          <Button title="CANCEL" color="red" onPress={props.onCancel} />
          <Button title="ADD" onPress={addGoalHandler} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "80%",
    borderColor: "black",
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
  },
});

export default GoalInput;
