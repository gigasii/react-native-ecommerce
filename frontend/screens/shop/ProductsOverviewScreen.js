import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Button,
  Platform,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import * as Notifications from "expo-notifications";
// Custom imports
import ProductItem from "../../components/shop/ProductItem";
import HeaderButton from "../../components/UI/HeaderButton";
import Colors from "../../constants/Colors";
import * as cartActions from "../../store/actions/cart";
import * as productsActions from "../../store/actions/products";
import * as authActions from "../../store/actions/auth";

const ProductsOverviewScreen = (props) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.availableProducts);
  // State
  const [state, updateState] = useState({
    isLoading: true,
    isRefreshing: false,
    error: null,
  });

  // Send product details to screen layout
  const selectItemHandler = (id, title) => {
    props.navigation.navigate("ProductDetail", {
      productId: id,
      productTitle: title,
    });
  };

  const loadProducts = async (loadType) => {
    updateState({ ...state, [loadType]: true, error: null });
    try {
      await dispatch(productsActions.fetchProducts());
      updateState({ ...state, [loadType]: false });
    } catch (err) {
      if (err.code == 401) {
        dispatch(authActions.tokenAuthFail(err.message));
        props.navigation.navigate("Auth");
        return;
      }
      updateState({ ...state, [loadType]: false, error: err.message });
    }
  };

  // Notification request
  const requestNotificationPermission = async () => {
    // Check if permissions has been granted
    const { granted } = await Notifications.getPermissionsAsync();
    if (!granted) {
      // Ask users for permission
      const result = await Notifications.requestPermissionsAsync();
      if (result.granted) {
        // Permission granted, retrieve Expo's notification push token
        const token = (await Notifications.getExpoPushTokenAsync()).data;
        dispatch(authActions.updateNotificationStatus(token));
      }
    }
  };

  useEffect(() => {
    // Use ComponentDidMount for initial page load
    requestNotificationPermission();
    loadProducts("isLoading");
    // Use listener for subsequent page loads
    const loadListener = props.navigation.addListener("willFocus", () =>
      loadProducts("isLoading")
    );
    return () => loadListener.remove();
  }, []);

  // Logic
  if (state.error) {
    return (
      <View style={styles.centered}>
        <Text>{state.error}</Text>
        <Button
          title="Try again"
          onPress={() => loadProducts("isLoading")}
          color={Colors.primary}
        />
      </View>
    );
  }

  if (state.isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <FlatList
      onRefresh={() => loadProducts("isRefreshing")}
      refreshing={state.isRefreshing}
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() =>
            selectItemHandler(itemData.item.id, itemData.item.title)
          }
        >
          <Button
            color={Colors.primary}
            title="View Details"
            onPress={() =>
              selectItemHandler(itemData.item.id, itemData.item.title)
            }
          />
          <Button
            color={Colors.primary}
            title="To Cart"
            onPress={() => dispatch(cartActions.addToCart(itemData.item))}
          />
        </ProductItem>
      )}
    />
  );
};

// Component styling
const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

// Screen styling
ProductsOverviewScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "All Products",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => navData.navigation.toggleDrawer()}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Cart"
          iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
          onPress={() => navData.navigation.navigate("Cart")}
        />
      </HeaderButtons>
    ),
  };
};

export default ProductsOverviewScreen;
