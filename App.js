import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, View, FlatList, Button } from "react-native";
// Custom imports
import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";

export default function App() {
  const [state, updateState] = useState({
    courseGoals: [],
    addMode: false,
  });

  const addGoalHandler = (goal) => {
    let newCourseGoals = [
      ...state.courseGoals,
      { id: Math.random().toString(), value: goal },
    ];
    let update = { courseGoals: newCourseGoals, addMode: false };
    updateState({ ...state, ...update });
  };

  const removeGoalHandler = (id) => {
    updateState({
      ...state,
      courseGoals: state.courseGoals.filter((goal) => goal.id !== id),
    });
  };

  const setAddMode = (status) => {
    updateState({ ...state, addMode: status });
  };

  return (
    <View style={styles.screen}>
      <Button title="Add new goal" onPress={() => setAddMode(true)} />
      <GoalInput
        onAddGoal={addGoalHandler}
        onCancel={() => setAddMode(false)}
        visible={state.addMode}
      />
      <FlatList
        data={state.courseGoals}
        renderItem={(itemData) => (
          <GoalItem
            id={itemData.item.id}
            title={itemData.item.value}
            onDelete={removeGoalHandler}
          />
        )}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50,
  },
});
