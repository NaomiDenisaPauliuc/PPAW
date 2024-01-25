// controllers/dataController.js
const express = require("express");
const router = express.Router();

// Middleware function
router.use((req, res, next) => {
  // Middleware logic
  next();
});

// Define routes
router.get("/data", (req, res) => {
  // Route logic
  res.json({ message: "Data endpoint" });
});

module.exports = router;
