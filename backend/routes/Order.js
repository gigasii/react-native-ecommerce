// Imports
import Express from "express";
import Order from "../models/Order.js";

// Initialization
const router = Express.Router();

router.get("/fetch-orders", async (req, res) => {
  const orders = await Order.find();
  res.status(200).json(orders);
});

router.post("/add-order", async (req, res) => {
  const { cartItems, totalAmount, date } = req.body;
  const order = new Order({
    cartItems,
    totalAmount,
    date,
  });
  const result = await order.save();
  res.status(200).json(result);
});

export default router;
