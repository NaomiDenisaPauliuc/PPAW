//server/server.js
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json()); // Parse JSON requests

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456789asdF",
  database: "ppaw",
});

app.get("/", (re, res) => {
  return res.json("From Backend Side");
});

app.get("/category", (req, res) => {
  const sql = "SELECT * FROM category";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

//items
app.get("/items", (req, res) => {
  const sql = "SELECT * FROM items";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
app.get("/items/category/:categoryId", (req, res) => {
  const categoryId = req.params.categoryId;
  const sql = `SELECT * FROM items WHERE IdCategory = ${categoryId}`;
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// Get a specific category by ID
app.get("/category/:id", (req, res) => {
  const categoryId = req.params.id;
  const sql = `SELECT * FROM category WHERE IdCategory = ${categoryId}`;
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data[0]); // Assuming there is only one matching category
  });
});
// Update a category by ID
app.put("/category/:id", (req, res) => {
  const categoryId = req.params.id;
  const { Category_name } = req.body;

  const sql = `UPDATE category SET Category_name = ? WHERE IdCategory = ?`;
  db.query(sql, [Category_name, categoryId], (err, result) => {
    if (err) return res.json(err);

    // Check if any rows were affected
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Send a success response
    return res.json({ message: "Category updated successfully" });
  });
});

// Add a new endpoint for inserting a category
app.post("/category", (req, res) => {
  const { Category_name } = req.body;

  const sql = "INSERT INTO category (Category_name) VALUES (?)";
  db.query(sql, [Category_name], (err, result) => {
    if (err) return res.json(err);

    // Send a success response with the insertId
    return res.json({
      message: "Category inserted successfully",
      insertId: result.insertId,
    });
  });
});

// Add a new endpoint for deleting a category
app.delete("/category", (req, res) => {
  const { Category_name } = req.body;

  const sql = "DELETE FROM category WHERE Category_name = ?";
  db.query(sql, [Category_name], (err, result) => {
    if (err) return res.json(err);

    // Check if any rows were affected
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Send a success response
    return res.json({ message: "Category deleted successfully" });
  });
});

// Endpoint to update category IDs consecutively
app.put("/category/updateIds", (req, res) => {
  // Update the IDs consecutively starting from 1
  const updateSql = `SET @newId = 0;
    UPDATE category SET IdCategory = @newId:= @newId + 1 ORDER BY IdCategory;`;

  db.query(updateSql, (updateErr, updateResult) => {
    if (updateErr) return res.json(updateErr);

    return res.json({ message: "Category IDs updated successfully" });
  });
});

// Endpoint to update category IDs consecutively
app.put("/category/updateIds", (req, res) => {
  // Update the IDs consecutively starting from 1
  const updateSql = `SET @newId = 0;
    UPDATE category SET IdCategory = @newId:= @newId + 1 ORDER BY IdCategory;`;

  db.query(updateSql, (updateErr, updateResult) => {
    if (updateErr) return res.json(updateErr);

    return res.json({ message: "Category IDs updated successfully" });
  });
});

// Update an item by ID
app.put("/items/:id", (req, res) => {
  const itemId = req.params.id;
  const { Price, Status } = req.body;

  const sql = `UPDATE items SET Price = ?, Status = ? WHERE IdItem = ?`;
  db.query(sql, [Price, Status, itemId], (err, result) => {
    if (err) return res.json(err);

    // Check if any rows were affected
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Item not found" });
    }

    // Send a success response
    return res.json({ message: "Item updated successfully" });
  });
});

app.listen(3000, () => {
  console.log("listening");
});
