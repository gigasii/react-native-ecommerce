// Imports
import Express from "express";
import Order from "../models/Order.js";
import Account from "../models/Account.js";
import fetch from "node-fetch";

// Initialization
const router = Express.Router();

router.get("/fetch-orders", async (req, res) => {
  const orders = await Order.find();
  res.status(200).json(orders);
});

router.post("/add-order", async (req, res) => {
  // Retrieve params from request
  const { cartItems, totalAmount, date, buyer } = req.body;
  // Unique users to notify
  const usersToNotify = [...new Set(cartItems.map((item) => item.ownerId))];
  // Iterate through all users to form message objects
  const promises = usersToNotify.map(async (user) => {
    const { notificationToken } = await Account.findById(user);
    return notificationToken;
  });
  const pushTokens = await Promise.all(promises);
  // Expo's server to notify users
  fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-Encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      to: pushTokens,
      title: `Order placed on ${date}`,
      body: `Bought by ${buyer}`,
    }),
  });
  // Create new order
  const order = new Order({
    cartItems,
    totalAmount,
    date,
  });
  const result = await order.save();
  res.status(200).json(result);
});

export default router;
