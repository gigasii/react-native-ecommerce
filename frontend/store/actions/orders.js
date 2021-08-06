import Order from "../../models/order";

// Constants
export const ADD_ORDER = "ADD_ORDER";
export const SET_ORDERS = "SET_ORDERS";
const BASE_URL = "http://192.168.0.199:8080/order";

export const fetchOrders = () => {
  return async (dispatch) => {
    // Request for orders from server
    const res = await fetch(`${BASE_URL}/fetch-orders`);
    if (!res.ok) {
      throw new Error("Request to fetch orders failed");
    }
    const orders = await res.json();
    // Convert data recieved
    const loadedOrders = [];
    orders.forEach((order) => {
      loadedOrders.push(
        new Order(
          order._id,
          order.cartItems,
          order.totalAmount,
          new Date(order.date)
        )
      );
    });
    // Update redux store
    dispatch({ type: SET_ORDERS, orders: loadedOrders });
  };
};

export const addOrder = (cartItems, totalAmount) => {
  return async (dispatch) => {
    // Request for orders from server
    const res = await fetch(`${BASE_URL}/add-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cartItems,
        totalAmount,
        date: new Date().toISOString(),
      }),
    });
    if (!res.ok) {
      throw new Error("Request to add order failed");
    }
    const order = await res.json();
    // Update redux store
    dispatch({
      type: ADD_ORDER,
      payload: {
        id: order._id,
        items: cartItems,
        amount: totalAmount,
        date: order.date,
      },
    });
  };
};
