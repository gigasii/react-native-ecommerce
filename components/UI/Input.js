import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

const Input = (props) => {
  // State
  const [state, updateState] = useState({
    value: props.initiallyValid ? props.initiallyValid[props.id] : "",
    isValid: props.initiallyValid ? true : false,
    touched: false,
  });

  // Input change handler
  const textChangeHandler = (text) => {
    // Validation
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValid = true;
    if (props.required && text.trim().length === 0) {
      isValid = false;
    }
    if (props.email && !emailRegex.test(text.toLowerCase())) {
      isValid = false;
    }
    if (props.min != null && +text < props.min) {
      isValid = false;
    }
    if (props.max != null && +text > props.max) {
      isValid = false;
    }
    if (props.minLength != null && text.length < props.minLength) {
      isValid = false;
    }
    updateState({ ...state, value: text, isValid: isValid });
  };

  // Focus handler
  const focusHandler = (status) => {
    updateState({ ...state, touched: !status });
  };

  // Update parent component with latest inputs
  useEffect(() => {
    props.onInputChange(props.id, state.value, state.isValid);
  }, [state.touched]);

  return (
    <View style={styles.formControl}>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput
        {...props}
        style={styles.input}
        value={state.value}
        onChangeText={textChangeHandler}
        onBlur={() => focusHandler(false)}
        onFocus={() => focusHandler(true)}
      />
      {!state.isValid && state.touched && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{props.errorText}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  formControl: {
    width: "100%",
  },
  label: {
    fontFamily: "open-sans-bold",
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  errorContainer: {
    marginVertical: 5,
  },
  errorText: {
    fontFamily: "open-sans",
    color: "red",
    fontSize: 13,
  },
});

export default Input;
