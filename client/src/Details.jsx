// client/src/Details.jsx
/*import React from "react";

const Details = ({ category, onBackClick }) => {
  return (
    <div>
      <h2>Category Details</h2>
      <p>Id: {category.IdCategory}</p>
      <p>Name: {category.Category_name}</p>
      {// Add more details as needed }

      {// Back button }
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};

export default Details;
*/
// client/src/Details.jsx
// client/src/Details.jsx
import React, { useState } from "react";
import EditCategory from "./EditCategory";

const Details = ({ category, onBackClick, onUpdateCategory }) => {
  const [isEditMode, setIsEditMode] = useState(false);

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  return (
    <div>
      <h2>Category Details</h2>
      <p>Id: {category.IdCategory}</p>
      <p>Name: {category.Category_name}</p>
      {/* Add more details as needed */}

      {/* Edit and Back buttons */}
      <button onClick={handleEditClick}>Edit</button>
      <button onClick={onBackClick}>Back</button>

      {/* Render EditCategory component if in Edit mode */}
      {isEditMode && (
        <EditCategory
          category={category}
          onCancel={() => setIsEditMode(false)}
          onUpdateCategory={onUpdateCategory}
        />
      )}
    </div>
  );
};

export default Details;
