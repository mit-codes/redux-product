import React, { useState } from "react";
import "./Form.css";
import { useDispatch } from "react-redux";
import { addProduct } from "../redux/slices/ProductSlice";
import { useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";

const Form = () => {
  const navigate = useNavigate();
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

    setFormData((prev) => ({
      ...prev,
      [name]: prev[name].includes(id)
        ? prev[name].filter((item) => item !== id)
        : [...prev[name], id],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // let pastProduct = localStorage.getItem("productes")
    //   ? JSON.parse(localStorage.getItem("productes"))
    //   : [];
    // localStorage.setItem(
    //   "productes",
    //   JSON.stringify([...pastProduct, formData])
    // );
    const productId = nanoid();
    const productWithId = { ...formData, id: productId };
    dispatch(addProduct(productWithId));
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
                    checked={formData.size.includes(size)}
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
                    checked={formData.color.includes(color)}
                    onChange={handleCheckBox}
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

          <div className="button-section">
            <button type="submit" className="submit-btn">
              Add Product
            </button>
            <button 
              type="button" 
              className="view-list-btn"
              onClick={() => navigate("/list")}
            >
              View Product List
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
