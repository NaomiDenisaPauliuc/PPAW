// server/controllers/ItemController.js
const ItemModel = require("../models/ItemModel");

exports.getAllItems = async (req, res) => {
  try {
    const items = await ItemModel.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
