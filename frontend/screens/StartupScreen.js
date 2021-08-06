import React, { useEffect } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
// Custom imports
import Colors from "../constants/Colors";
import * as authActions from "../store/actions/auth";

const StartupScreen = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Check of token exist in device storage
    (async () => {
      const credentialsExist = await AsyncStorage.getItem(
        authActions.STORAGE_TOKEN_CREDENTIALS
      );
      // No token found
      if (!credentialsExist) {
        props.navigation.navigate("Auth");
        return;
      }
      // Retrieve stored credentials
      const credentials = JSON.parse(credentialsExist);
      const { userId, token } = credentials;
      // Relog via token
      try {
        await dispatch(authActions.relog(userId, token));
        props.navigation.navigate("Shop");
      } catch (err) {
        dispatch(authActions.tokenAuthFail(err.message));
        props.navigation.navigate("Auth");
      }
    })();
  }, []);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
};

// Component styling
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default StartupScreen;
