import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  Platform,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";
// Custom imports
import HeaderButton from "../../components/UI/HeaderButton";
import * as productsActions from "../../store/actions/products";

const EditProductScreen = (props) => {
  const dispatch = useDispatch();

  // Determine if editing or adding product
  const prodId = props.navigation.getParam("productId");
  const editedProduct = useSelector((state) =>
    state.products.userProducts.find((prod) => prod.id === prodId)
  );

  // State
  const [state, updateState] = useState({
    title: editedProduct ? editedProduct.title : "",
    imageUrl: editedProduct ? editedProduct.imageUrl : "",
    description: editedProduct ? editedProduct.description : "",
    price: "",
  });

  // Retrieve state
  const { title, description, imageUrl, price } = state;

  // Determine what action should handler dispatch
  const submitHandler = useCallback(() => {
    // Edit
    if (editedProduct) {
      dispatch(
        productsActions.updateProduct(prodId, title, description, imageUrl)
      );
    }
    // Add
    else {
      dispatch(
        productsActions.createProduct(title, description, imageUrl, +price)
      );
    }
    props.navigation.goBack();
  }, [prodId, title, description, imageUrl, price]);

  // Update handler with latest input changes
  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={(text) => updateState({ ...state, title: text })}
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Image URL</Text>
          <TextInput
            style={styles.input}
            value={imageUrl}
            onChangeText={(text) => updateState({ ...state, imageUrl: text })}
          />
        </View>
        {editedProduct ? null : (
          <View style={styles.formControl}>
            <Text style={styles.label}>Price</Text>
            <TextInput
              style={styles.input}
              value={price}
              onChangeText={(text) => updateState({ ...state, price: text })}
            />
          </View>
        )}
        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={(text) =>
              updateState({ ...state, description: text })
            }
          />
        </View>
      </View>
    </ScrollView>
  );
};

EditProductScreen.navigationOptions = (navData) => {
  const submitFn = navData.navigation.getParam("submit");
  return {
    headerTitle: navData.navigation.getParam("productId")
      ? "Edit Product"
      : "Add Product",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Save"
          iconName={
            Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"
          }
          onPress={submitFn}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
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
});

export default EditProductScreen;
