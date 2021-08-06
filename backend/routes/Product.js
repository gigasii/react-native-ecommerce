// Imports
import Express from "express";
import Product from "../models/Product.js";
import auth from "../middleware/Auth.js";

// Initialization
const router = Express.Router();

// Authentication middleware
router.use(auth);

// Routes
router.get("/fetch-products", async (req, res) => {
  const products = await Product.find();
  res.status(200).json(products);
});

router.post("/add-product", async (req, res) => {
  const { title, description, imageUrl, price, ownerId } = req.body;
  const product = new Product({
    title,
    description,
    imageUrl,
    price,
    ownerId,
  });
  const result = await product.save();
  res.status(200).json(result);
});

router.get("/delete-product/:id", async (req, res) => {
  const { id } = req.params;
  const result = await Product.deleteOne({ _id: id });
  res.status(200).json(result);
});

router.post("/update-product", async (req, res) => {
  const { id, title, description, imageUrl } = req.body;
  const result = await Product.findOneAndUpdate(
    { _id: id },
    { title, description, imageUrl },
    { new: true }
  );
  res.status(200).json(result);
});

export default router;
