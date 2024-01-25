// client/src/ItemDetails.jsx
import React, { useState } from "react";
import EditItem from "./EditItem";

const ItemDetails = ({ item, onBackClick, onUpdateItem }) => {
  const [isEditMode, setIsEditMode] = useState(false);

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  return (
    <div>
      <h2>Item Details</h2>
      <p>Id: {item.IdItem}</p>
      <p>Item: {item.Item}</p>
      <p>Category ID: {item.IdCategory}</p>
      <p>Price: {item.Price}</p>
      <p>Brand: {item.Brand}</p>
      <p>Status: {item.Status}</p>
      <p>Year: {item.Year}</p>
      <p>Color: {item.Color}</p>
      <p>Details: {item.Details}</p>

      <button onClick={handleEditClick}>Edit</button>
      <button onClick={onBackClick}>Back</button>

      {isEditMode && (
        <EditItem
          item={item}
          onCancel={() => setIsEditMode(false)}
          onUpdateItem={(itemId, editedPrice, editedStatus) => {
            onUpdateItem(itemId, editedPrice, editedStatus);
            setIsEditMode(false);
          }}
        />
      )}
    </div>
  );
};

export default ItemDetails;
