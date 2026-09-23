const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");

const projectRoutes = require("./routes/projectRoutes");
const profileRoutes = require("./routes/profileRoutes");
const skillRoutes = require("./routes/skillRoutes");
const publicRoutes = require("./routes/publicRoutes");
const contactRoutes = require("./routes/contactRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const app = express();

// Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

app.use("/api/projects", projectRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/public", publicRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/resume", resumeRoutes);
// Test Route
app.get("/", (req, res) => {
  res.json({
    message: "CodeFolio API is running 🚀",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});