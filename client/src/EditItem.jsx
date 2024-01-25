// client/src/EditItem.jsx
import React, { useState } from "react";

const EditItem = ({ item, onCancel, onUpdateItem }) => {
  const [editedPrice, setEditedPrice] = useState(item.Price);
  const [editedStatus, setEditedStatus] = useState(item.Status);

  const handleSave = () => {
    onUpdateItem(item.IdItem, editedPrice, editedStatus);
    fetch(`http://localhost:3000/items/${item.IdItem}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Price: editedPrice,
        Status: editedStatus,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Item updated in the database:", data);
      })
      .catch((err) => console.error("Error updating item:", err));
    onCancel();
  };

  return (
    <div>
      <h2>Edit Item</h2>
      <label>
        New Price:
        <input
          type="text"
          value={editedPrice}
          onChange={(e) => setEditedPrice(e.target.value)}
        />
      </label>
      <label>
        New Status:
        <input
          type="text"
          value={editedStatus}
          onChange={(e) => setEditedStatus(e.target.value)}
        />
      </label>
      <button onClick={handleSave}>Save</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default EditItem;
