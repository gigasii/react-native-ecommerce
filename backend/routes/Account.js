// Imports
import Express from "express";
import Account from "../models/Account.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import auth from "../middleware/Auth.js";

// Constants
const SALT_ROUNDS = 12;
const EXPIRATION_DURATION_IN_MINS = 60;

// Initialization
const router = Express.Router();

router.post("/create-account", async (req, res) => {
  const { email, password } = req.body;
  const account = await Account.findOne({ email });
  // Existing account with same email
  if (account) {
    return res.status(400).json({ message: "Email already in use" });
  }
  // Hash password
  const hashPassword = await bcrypt.hash(password, SALT_ROUNDS);
  // Create account
  const newAccount = new Account({ email, password: hashPassword });
  const result = await newAccount.save();
  // Send response back
  res.status(200).json(result);
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const account = await Account.findOne({ email });
  // No account with this email
  if (!account) {
    return res.status(400).json({ message: "Account does not exist" });
  }
  // Password does not match
  const passwordResult = await bcrypt.compare(password, account.password);
  if (!passwordResult) {
    return res.status(400).json({ message: "Password is incorrect" });
  }
  // Create token
  const token = jwt.sign(
    {
      id: account._id,
    },
    process.env.WEB_TOKEN_KEY,
    { expiresIn: 60 * EXPIRATION_DURATION_IN_MINS }
  );
  // Send response back
  res.status(200).json({ token, id: account._id });
});

router.get("/relog", auth, async (req, res) => {
  res.status(200).json({ message: "Relog successful" });
});

router.post("/update-notification-status", async (req, res) => {
  const { userId, token } = req.body;
  await Account.findOneAndUpdate(
    { _id: userId },
    { notificationToken: token },
    { new: true }
  );
  res.status(200).json({ message: "Updated user's notification status" });
});

export default router;
