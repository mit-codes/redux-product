import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import './ProductDetail.css'

const ProductDetail = () => {
  const { id } = useParams()
  const products = useSelector((state) => state.product)
  
  // Find product by ID instead of using array index
  const product = products.find((p) => p.id === id)

  return (
    <div className="form-container">
      <div className="form-wrapper">
        <h1>Product Detail</h1>

        {!product ? (
          <div className="empty-state">
            Product not found.
            <div style={{ marginTop: 12 }}>
              <Link to="/list" className="back-link">Back to list</Link>
            </div>
          </div>
        ) : (
          <div className="detail-body">
            <div className="detail-row">
              <div className="detail-label">Name</div>
              <div className="detail-value">{product.name || '-'}</div>
            </div>

            <div className="detail-row">
              <div className="detail-label">Description</div>
              <div className="detail-value">{product.description || '-'}</div>
            </div>

            <div className="detail-row">
              <div className="detail-label">Size</div>
              <div className="detail-value">{Array.isArray(product.size) ? product.size.join(', ') : product.size || '-'}</div>
            </div>

            <div className="detail-row">
              <div className="detail-label">Color</div>
              <div className="detail-value">{Array.isArray(product.color) ? product.color.join(', ') : product.color || '-'}</div>
            </div>

            <div className="detail-row">
              <div className="detail-label">Stock</div>
              <div className="detail-value">{product.stock ?? 0}</div>
            </div>

            <div style={{ marginTop: 18 }}>
              <Link to="/list" className="back-link">Back to list</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductDetail
