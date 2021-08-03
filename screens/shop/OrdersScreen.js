import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Platform,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
// Custom imports
import HeaderButton from "../../components/UI/HeaderButton";
import OrderItem from "../../components/shop/OrderItem";
import Colors from "../../constants/Colors";
import * as orderActions from "../../store/actions/orders";

const OrdersScreen = (props) => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.orders);
  // State
  const [state, updateState] = useState({
    isLoading: false,
  });

  const loadOrders = async () => {
    updateState({ isLoading: true });
    await dispatch(orderActions.fetchOrders());
    updateState({ isLoading: false });
  };

  useEffect(() => {
    // Use ComponentDidMount for initial page load
    loadOrders();
    // Use listener for subsequent page loads
    const loadListener = props.navigation.addListener("willFocus", loadOrders);
    return () => loadListener.remove();
  }, []);

  // Logic
  if (state.isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <FlatList
      data={orders}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <OrderItem
          amount={itemData.item.totalAmount}
          date={itemData.item.readableDate}
          items={itemData.item.items}
        />
      )}
    />
  );
};

// Screen styling
const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

// Component styling
OrdersScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Your Orders",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => navData.navigation.toggleDrawer()}
        />
      </HeaderButtons>
    ),
  };
};

export default OrdersScreen;
