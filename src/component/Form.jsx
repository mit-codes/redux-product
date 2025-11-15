import React, { useState } from "react";
import "./Form.css";
import { useDispatch } from "react-redux";
import { addProduct } from "../redux/slices/ProductSlice";

const Form = () => {
  const dispatch = useDispatch();
  const sizeOptions = ["XS", "S", "M", "L", "XL", "XXL"];
  const colorOptions = ["Red", "Blue", "Black", "White", "Green", "Yellow"];

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    size: [],
    color: [],
    stock: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckBox = (e) => {
    const { name, id } = e.target;
    if (formData[name].includes(id)) {
      formData[name].splice(formData[name].indexOf(id), 1);
    } else {
      formData[name].push(id);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let pastProduct = localStorage.getItem("productes")
      ? JSON.parse(localStorage.getItem("productes"))
      : [];
    localStorage.setItem(
      "productes",
      JSON.stringify([...pastProduct, formData])
    );
    dispatch(addProduct(formData));
    setFormData({
      name: "",
      description: "",
      size: [],
      color: [],
      stock: "",
    });
  };

  return (
    <div className="form-container">
      <div className="form-wrapper">
        <h1>Add Product</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Product Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter product name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter product description"
              rows="4"
              required
            />
          </div>

          <div className="form-group">
            <label>Size</label>
            <div className="checkbox-group">
              {sizeOptions.map((size) => (
                <div key={size} className="checkbox-item">
                  <input
                    type="checkbox"
                    name="size"
                    id={size}
                    onChange={handleCheckBox}
                  />
                  <label htmlFor={`size-${size}`}>{size}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Color</label>
            <div className="checkbox-group">
              {colorOptions.map((color) => (
                <div key={color} className="checkbox-item">
                  <input
                    type="checkbox"
                    name="color"
                    id={color}
                    onChange={handleCheckBox}
                    value={color}
                  />
                  <label htmlFor={`color-${color}`}>{color}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="stock">Stock</label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              placeholder="Enter stock quantity"
              min="0"
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
