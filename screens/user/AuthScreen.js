import React, { useReducer, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  View,
  Button,
  StyleSheet,
  KeyboardAvoidingView,
  Alert,
  ActivityIndicator,
} from "react-native";
// Custom imports
import Input from "../../components/UI/Input";
import Card from "../../components/UI/Card";
import Colors from "../../constants/Colors";
import * as authActions from "../../store/actions/auth";

// Constants
const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

// Reducer (Actions listener)
const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};

const AuthScreen = (props) => {
  // Reducer state
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: "",
      password: "",
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false,
  });

  // State
  const [state, updateState] = useState({
    isLoading: false,
    error: null,
  });

  const dispatch = useDispatch();

  // Determine if signup or login
  const authHandler = async (login) => {
    const { email, password } = formState.inputValues;
    const action = login
      ? authActions.login(email, password)
      : authActions.signup(email, password);
    // Check for any validation errors
    updateState({ isLoading: true, error: null });
    try {
      await dispatch(action);
      login
        ? props.navigation.navigate("Shop")
        : updateState({ ...state, isLoading: false });
    } catch (err) {
      updateState({ isLoading: false, error: err.message });
    }
  };

  // Input handler
  const inputChangeHandler = (inputIdentifier, inputValue, inputValidity) => {
    dispatchFormState({
      type: FORM_INPUT_UPDATE,
      input: inputIdentifier,
      value: inputValue,
      isValid: inputValidity,
    });
  };

  // Side-effects
  useEffect(() => {
    if (state.error) {
      Alert.alert("An Error Occurred", state.error, [
        { text: "Retry", style: "default" },
      ]);
    }
  }, [state.error]);

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={25}
      style={styles.keyboard}
    >
      <View style={styles.screen}>
        <Card style={styles.authContainer}>
          <Input
            id="email"
            label="E-Mail"
            keyboardType="email-address"
            required
            email
            autoCapitalize="none"
            errorText="Please enter a valid email address"
            onInputChange={inputChangeHandler}
          />
          <Input
            id="password"
            label="Password"
            keyboardType="default"
            secureTextEntry
            required
            minLength={2}
            autoCapitalize="none"
            errorText="Please enter a valid password"
            onInputChange={inputChangeHandler}
          />
          {!state.isLoading ? (
            <View style={styles.buttonContainer}>
              <View styles={styles.button}>
                <Button
                  title="Signup"
                  color={Colors.primary}
                  onPress={() => authHandler(false)}
                />
              </View>
              <View styles={styles.button}>
                <Button
                  title="Login"
                  color={Colors.accent}
                  onPress={() => authHandler(true)}
                />
              </View>
            </View>
          ) : (
            <ActivityIndicator
              size="small"
              color={Colors.primary}
              style={styles.spinner}
            />
          )}
        </Card>
      </View>
    </KeyboardAvoidingView>
  );
};

// Screen styling
AuthScreen.navigationOptions = {
  headerTitle: "Authenticate",
};

// Component styling
const styles = StyleSheet.create({
  keyboard: {
    flex: 1,
  },
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  authContainer: {
    width: "80%",
    padding: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 20,
  },
  spinner: {
    margin: 20,
  },
});

export default AuthScreen;
