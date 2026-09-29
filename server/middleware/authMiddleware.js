
const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Not authorized. Token required.",
      });
    }

    const token = authHeader.split(" ")[1];

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is missing in environment variables");

      return res.status(500).json({
        message: "Server authentication configuration error.",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Token mein valid userId hona zaroori hai.
    if (!decoded.userId) {
      return res.status(401).json({
        message: "Invalid token: userId missing.",
      });
    }

    // Har request ke liye authenticated user ki ID.
    req.user = decoded.userId;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token.",
    });
  }
};

module.exports = protect;