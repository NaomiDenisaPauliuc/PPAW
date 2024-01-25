// client/src/EditCategory.jsx
import React, { useState } from "react";

const EditCategory = ({ category, onCancel, onUpdateCategory }) => {
  const [editedName, setEditedName] = useState(category.Category_name);

  const handleSave = () => {
    // Update the local state
    onUpdateCategory(category.IdCategory, editedName);

    // Make API call to update the category name in the MySQL database
    fetch(`http://localhost:3000/category/${category.IdCategory}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Category_name: editedName,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Category updated in the database:", data);
      })
      .catch((err) => console.error("Error updating category:", err));

    // Reset the edit mode
    onCancel();
  };

  return (
    <div>
      <h2>Edit Category</h2>
      <label>
        New Name:
        <input
          type="text"
          value={editedName}
          onChange={(e) => setEditedName(e.target.value)}
        />
      </label>

      <button onClick={handleSave}>Save</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default EditCategory;
