// server/routes/api.js
const express = require("express");
const router = express.Router();
const ItemController = require("../controllers/ItemController");

router.get("/items", ItemController.getAllItems);

module.exports = router;
