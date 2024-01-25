// client/src/components/TableView.js
import React from "react";

const TableView = ({ data, onRowClick }) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              <td>{row.IdCategory}</td>
              <td>{row.Category_name}</td>
              <td>
                <button onClick={() => onRowClick(row)}>Details</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableView;
