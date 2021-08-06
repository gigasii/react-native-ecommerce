// Imports
import Express from "express";
import Mongoose from "mongoose";
import env from "dotenv";
import productRoutes from "./routes/Product.js";
import orderRoutes from "./routes/Order.js";
import accountRoutes from "./routes/Account.js";

// Initialization
env.config();
const app = Express();
const PORT = process.env.PORT || 8080;
const MONGO_DB_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.7daxr.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

// Request parsing
app.use(Express.json({ limit: "50mb" }));

// Routes
app.use("/account", accountRoutes);
app.use("/product", productRoutes);
app.use("/order", orderRoutes);

(async () => {
  // Connect to database
  await Mongoose.connect(MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
  // Start server
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
})();
