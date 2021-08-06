// Imports
import jwt from "jsonwebtoken";

export default (req, res, next) => {
  // Retrieve token from authorization header
  const authHeader = req.get("Authorization");
  // No token found
  if (!authHeader) {
    return res.status(401).json({ message: "Missing token" });
  }
  const token = authHeader.split(" ")[1];
  // Decode token
  try {
    jwt.verify(token, process.env.WEB_TOKEN_KEY);
  } catch (err) {
    return res.status(401).json({ message: `${err.name}: ${err.message}` });
  }
  // Token is valid, proceed to operation
  next();
};
