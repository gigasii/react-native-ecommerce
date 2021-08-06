// Imports
import Mongoose from "mongoose";

// Initialization
const Schema = Mongoose.Schema;

// Define collection structure
const orderSchema = new Schema(
  {
    cartItems: {
      type: Array,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  { versionKey: false }
);

export default Mongoose.model("Order", orderSchema);
