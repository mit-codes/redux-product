import React from 'react'
import './ProductList.css'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const ProductList = () => {
  const products = useSelector((state) => state.product)
  const navigate = useNavigate()
  console.log(products);
  
  return (
    <div className="list-container">
      <div className="list-wrapper">
        <div className="list-header">
          <div className="header-left">
            <h2>Product Listing</h2>
            <div className="item-count">{products.length} items</div>
          </div>
          <button 
            className="add-product-btn"
            onClick={() => navigate("/")}
            title="Add New Product"
          >
            <span className="arrow-left">←</span>
            Add Product
          </button>
        </div>

        {products.length === 0 ? (
          <div className="empty-state">No products yet. Add some using the form.</div>
        ) : (
          <div className="products-grid">
            {products.map((p) => (
              <div className="product-card" key={Date.now()}>
                <div className="product-title">{p.name || 'Untitled'}</div>
                <div className="product-desc">{p.description || '-'}</div>
                <div className="product-meta">
                  <div className="meta-item">Stock: {p.stock ?? 0}</div>
                  <div className="meta-item">Size: {Array.isArray(p.size) ? p.size.join(', ') : p.size || '-'}</div>
                  <div className="meta-item">Color: {Array.isArray(p.color) ? p.color.join(', ') : p.color || '-'}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductList
