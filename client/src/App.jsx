import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import "./globalStyles.css";
import Details from "./Details";
import EditCategory from "./EditCategory";
import ItemDetails from "./ItemDetails"; // Import the new component

function App() {
  const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isInsertMode, setIsInsertMode] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [deleteCategoryName, setDeleteCategoryName] = useState("");
  const [itemsData, setItemsData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/category")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    fetch("http://localhost:3000/items")
      .then((res) => res.json())
      .then((data) => setItemsData(data))
      .catch((err) => console.log(err));
  }, []);

  const handleDetailsClick = (category) => {
    setSelectedCategory(category);
  };

  const handleBackClick = () => {
    setSelectedCategory(null);
  };

  const handleInsertClick = () => {
    setIsInsertMode(true);
  };

  const handleDeleteClick = () => {
    setIsDeleteMode(true);
  };

  const handleInfoClick = (item) => {
    setSelectedItem(item);
  };

  const handleInsertCategory = () => {
    // Send a POST request to the server to insert the new category
    fetch("http://localhost:3000/category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Category_name: newCategoryName }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Category inserted:", data);
        // Update the local state with the new category
        setData((prevData) => [
          ...prevData,
          { IdCategory: data.insertId, Category_name: newCategoryName },
        ]);
      })
      .catch((err) => console.error("Error inserting category:", err));

    // Reset the insert mode and input value
    setIsInsertMode(false);
    setNewCategoryName("");
  };

  const handleDeleteCategory = () => {
    // Send a DELETE request to the server to delete the category
    fetch("http://localhost:3000/category", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Category_name: deleteCategoryName }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Category deleted:", data);
        // Update the local state by filtering out the deleted category
        setData((prevData) =>
          prevData.filter(
            (category) => category.Category_name !== deleteCategoryName
          )
        );
      })
      .catch((err) => console.error("Error deleting category:", err));

    // Reset the delete mode and input value
    setIsDeleteMode(false);
    setDeleteCategoryName("");
  };

  const handleUpdateItem = (itemId, editedPrice, editedStatus) => {
    // Update the itemsData state with the edited item details
    const updatedItems = itemsData.map((item) =>
      item.IdItem === itemId
        ? { ...item, Price: editedPrice, Status: editedStatus }
        : item
    );
    setItemsData(updatedItems);

    // Optionally, you can make an API call to update the item details in the MySQL database
    fetch(`http://localhost:3000/items/${itemId}`, {
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
  };

  if (selectedItem) {
    return (
      <div style={{ padding: "50px" }}>
        <Navbar />
        <ItemDetails
          item={selectedItem}
          onBackClick={() => setSelectedItem(null)}
        />
      </div>
    );
  }

  if (isInsertMode) {
    return (
      <div style={{ padding: "50px" }}>
        <Navbar />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleInsertCategory();
          }}
        >
          <label>
            New Category:
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
            />
          </label>
          <button type="submit">Add</button>
          <button type="button" onClick={() => setIsInsertMode(false)}>
            Cancel
          </button>
        </form>
      </div>
    );
  }

  if (selectedCategory) {
    return (
      <div style={{ padding: "50px" }}>
        <Navbar />
        <Details
          category={selectedCategory}
          onBackClick={handleBackClick}
          onUpdateCategory={(categoryId, newName) => {
            handleUpdateCategory(categoryId, newName);
          }}
        />
      </div>
    );
  }

  if (isDeleteMode) {
    return (
      <div style={{ padding: "50px" }}>
        <Navbar />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleDeleteCategory();
          }}
        >
          <label>
            Category to Delete:
            <input
              type="text"
              value={deleteCategoryName}
              onChange={(e) => setDeleteCategoryName(e.target.value)}
            />
          </label>
          <button type="submit">Delete</button>
          <button type="button" onClick={() => setIsDeleteMode(false)}>
            Cancel
          </button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ padding: "50px" }}>
      <Navbar />
      <div style={{ marginRight: "50px" }}>
        <h1>Categoriile produselor de vanzare</h1>
        <button onClick={handleInsertClick}>Add</button>
        <button onClick={handleDeleteClick}>Delete</button>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {data.map((category, i) => (
              <tr key={i}>
                <td>{category.IdCategory}</td>
                <td>{category.Category_name}</td>
                <td
                  className="details"
                  onClick={() => handleDetailsClick(category)}
                >
                  Info
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Second Table for Items */}
      <div>
        <h1>Items</h1>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Item</th>
              <th>Category ID</th>
              <th>Price</th>
              <th>Brand</th>
              <th>Status</th>
              <th>Year</th>
              <th>Color</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {itemsData.map((item) => (
              <tr key={item.IdItem}>
                <td>{item.IdItem}</td>
                <td>{item.Item}</td>
                <td>{item.IdCategory}</td>
                <td>{item.Price}</td>
                <td>{item.Brand}</td>
                <td>{item.Status}</td>
                <td>{item.Year}</td>
                <td>{item.Color}</td>
                <td>{item.Details}</td>
                <td className="details" onClick={() => handleInfoClick(item)}>
                  Info
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
