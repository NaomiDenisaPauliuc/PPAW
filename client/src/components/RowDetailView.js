// client/src/components/RowDetailView.js
import React from "react";

const RowDetailView = ({ row, onReturnClick }) => {
  return (
    <div>
      <p>ID: {row.IdCategory}</p>
      <p>Name: {row.Category_name}</p>
      {/* Add more details as needed */}
      <button onClick={onReturnClick}>Back</button>
    </div>
  );
};

export default RowDetailView;
