// Imports
import Mongoose from "mongoose";

// Initialization
const Schema = Mongoose.Schema;

// Define collection structure
const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    ownerId: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);

export default Mongoose.model("Product", productSchema);
