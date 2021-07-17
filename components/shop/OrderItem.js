import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
// Custom imports
import CartItem from "./CartItem";
import Colors from "../../constants/Colors";
import Card from "../UI/Card";

const OrderItem = (props) => {
  const [state, updateState] = useState({
    showDetails: false,
  });

  return (
    <Card style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.totalAmount}>${props.amount.toFixed(2)}</Text>
        <Text style={styles.date}>{props.date}</Text>
      </View>
      <Button
        color={Colors.primary}
        title={state.showDetails ? "Hide Details" : "Show Details"}
        onPress={() =>
          updateState({ ...state, showDetails: !state.showDetails })
        }
      />
      {state.showDetails && (
        <View style={styles.detailItems}>
          {props.items.map((cartItem) => (
            <CartItem
              key={cartItem.productId}
              quantity={cartItem.quantity}
              amount={cartItem.sum}
              title={cartItem.productTitle}
            />
          ))}
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    margin: 20,
    padding: 10,
    alignItems: "center",
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 15,
  },
  totalAmount: {
    fontFamily: "open-sans-bold",
    fontSize: 16,
  },
  date: {
    fontSize: 16,
    fontFamily: "open-sans",
    color: "#888",
  },
  detailItems: {
    flex: 1,
  },
});

export default OrderItem;
