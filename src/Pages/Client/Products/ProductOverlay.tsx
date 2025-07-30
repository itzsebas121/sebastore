"use client"

import type React from "react"
import { X, ShoppingCart, Star, Package, Shield } from "lucide-react"
import type { Product } from "../../../Types/Product"
import "./ProductOverlay.css"

interface ProductOverlayProps {
  product: Product
  onClose: () => void
}

export default function ProductOverlay({ product, onClose }: ProductOverlayProps) {
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const handleAddToCart = () => {
    console.log("Agregado al carrito:", product.name)
  }

  // Simulate data for demo
  const trustScore = Math.floor(Math.random() * 30) + 70
  const rating = 3.5 + Math.random() * 1.5
  const reviewCount = Math.floor(Math.random() * 2000) + 100

  const getTrustScoreColor = (score: number) => {
    if (score >= 90) return { color: "#10b981", label: "Excellent" }
    if (score >= 80) return { color: "#3b82f6", label: "Very Good" }
    if (score >= 70) return { color: "#f59e0b", label: "Good" }
    return { color: "#ef4444", label: "Fair" }
  }

  const trustData = getTrustScoreColor(trustScore)

  return (
    <div className="product-overlay-backdrop" onClick={handleBackdropClick}>
      <div className="product-overlay-container">
        <button onClick={onClose} className="product-overlay-close">
          <X className="product-overlay-close-icon" />
        </button>

        <div className="product-overlay-content">
          <div className="product-overlay-image-section">
            <img
              src={product.imageUrl || "/placeholder.svg?height=400&width=400&query=product"}
              alt={product.name}
              className="product-overlay-image"
            />
          </div>

          <div className="product-overlay-details">
            <div className="product-overlay-header">
              <h2 className="product-overlay-title">{product.name}</h2>
              <div className="product-overlay-rating">
                <div className="product-overlay-stars">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`product-overlay-star ${i < Math.floor(rating) ? "product-overlay-star-filled" : ""}`}
                    />
                  ))}
                </div>
                <span className="product-overlay-rating-text">({reviewCount}) reseñas</span>
              </div>
            </div>

            <div className="product-overlay-trust-section">
              <div className="product-overlay-trust-badge">
                <Shield className="product-overlay-trust-icon" />
                <div className="product-overlay-trust-info">
                  <span className="product-overlay-trust-label">Trust Score</span>
                  <span className="product-overlay-trust-score" style={{ color: trustData.color }}>
                    {trustScore}%
                  </span>
                </div>
                <div className="product-overlay-trust-bar">
                  <div
                    className="product-overlay-trust-fill"
                    style={{
                      width: `${trustScore}%`,
                      backgroundColor: trustData.color,
                    }}
                  />
                </div>
                <span className="product-overlay-trust-label-text" style={{ color: trustData.color }}>
                  {trustData.label}
                </span>
              </div>
            </div>

            {product.description && (
              <div className="product-overlay-description">
                <h3>Descripción</h3>
                <p>{product.description}</p>
              </div>
            )}

            <div className="product-overlay-specs">
              <h3>Especificaciones</h3>
              <div className="product-overlay-specs-grid">
                <div className="product-overlay-spec">
                  <Package className="product-overlay-spec-icon" />
                  <div>
                    <span className="product-overlay-spec-label">Categoría</span>
                    <span className="product-overlay-spec-value">ID: {product.categoryId}</span>
                  </div>
                </div>
                <div className="product-overlay-spec">
                  <Package className="product-overlay-spec-icon" />
                  <div>
                    <span className="product-overlay-spec-label">Producto ID</span>
                    <span className="product-overlay-spec-value">{product.productId}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="product-overlay-price-section">
              <div className="product-overlay-price">
                <span className="product-overlay-price-current">${product.price.toFixed(2)}</span>
              </div>

              <div className="product-overlay-actions">
                <button onClick={handleAddToCart} className="product-overlay-add-to-cart">
                  <ShoppingCart className="product-overlay-action-icon" />
                  Add to Cart
                </button>
              </div>
            </div>

            <div className="product-overlay-features">
              <h3>Características destacadas</h3>
              <ul className="product-overlay-features-list">
                <li>✓ Envío gratuito</li>
                <li>✓ Garantía de 1 año</li>
                <li>✓ Devoluciones fáciles</li>
                <li>✓ Soporte técnico 24/7</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
