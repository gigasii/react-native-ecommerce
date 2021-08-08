import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";

const ImgPicker = (props) => {
  const [state, updateState] = useState({
    pickedImage: props.initiallyValid ? props.initiallyValid[props.id] : null,
  });

  // Determine touchable component via OS
  let TouchableCmp = Platform.select({
    ios: TouchableOpacity,
    android: TouchableNativeFeedback,
  });

  // Handlers
  const takeImageHandler = async () => {
    // Check if permissions has been granted
    const { granted } = await Camera.getPermissionsAsync();
    if (!granted) {
      // Ask users for permission
      const result = await Camera.requestPermissionsAsync();
      if (!result.granted) {
        Alert.alert("Invalid", "Camera permissions required", [
          { text: "Close", style: "default" },
        ]);
        return;
      }
    }

    // Launch camera
    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
      base64: true,
    });
    // Set image
    const imageSource = `data:image/jpeg;base64,${image.base64}`;
    updateState({ pickedImage: imageSource });
    props.onInputChange(props.id, imageSource, true);
  };

  return (
    <TouchableCmp onPress={takeImageHandler}>
      <View style={styles.touchable}>
        <Image style={styles.image} source={{ uri: state.pickedImage }} />
      </View>
    </TouchableCmp>
  );
};

const styles = StyleSheet.create({
  touchable: {
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "90%",
    height: "90%",
    borderColor: "black",
    borderWidth: 1,
  },
});

export default ImgPicker;
