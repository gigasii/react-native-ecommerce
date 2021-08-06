// Imports
import Mongoose from "mongoose";

// Initialization
const Schema = Mongoose.Schema;

// Define collection structure
const accountSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);

export default Mongoose.model("Account", accountSchema);
