"use client"

import type React from "react"
import { ShoppingCart, Eye, Star } from "lucide-react"
import type { Product } from "../../../Types/Product"
import "./ProductCard.css"

interface ProductCardProps {
  product: Product
  onView: () => void
}

export default function ProductCard({ product, onView }: ProductCardProps) {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    console.log("Agregado al carrito:", product.name)
  }

  const handleView = (e: React.MouseEvent) => {
    e.stopPropagation()
    onView()
  }

  // Simulate different trust scores and discounts for demo
  const trustScore = Math.floor(Math.random() * 30) + 70 // 70-100
  const originalPrice = product.price * (1 + Math.random() * 0.5) // Add 0-50% markup
  const discount = originalPrice - product.price
  const sellerName = `Seller ${Math.floor(Math.random() * 1000)}`
  const rating = 3.5 + Math.random() * 1.5 // 3.5-5.0
  const reviewCount = Math.floor(Math.random() * 2000) + 100

  const getTrustScoreColor = (score: number) => {
    if (score >= 90) return { color: "#10b981", label: "Excellent" }
    if (score >= 80) return { color: "#3b82f6", label: "Very Good" }
    if (score >= 70) return { color: "#f59e0b", label: "Good" }
    return { color: "#ef4444", label: "Fair" }
  }

  const trustData = getTrustScoreColor(trustScore)

  return (
    <div className="product-card">
      {discount > 2 && <div className="product-card-discount-badge">Save ${discount.toFixed(2)}</div>}

      <div className="product-card-image-container">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="product-card-image"
        />
        <div className="product-card-overlay">
          <button onClick={handleView} className="product-card-overlay-button product-card-view-button">
            <Eye className="product-card-overlay-icon" />
          </button>
          
        </div>
      </div>

      <div className="product-card-content">
        <h3 className="product-card-title">{product.name}</h3>

        {product.description && <p className="product-card-description">{product.description}</p>}

        <div className="product-card-rating">
          <div className="product-card-stars">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`product-card-star ${i < Math.floor(rating) ? "product-card-star-filled" : ""}`}
              />
            ))}
          </div>
          <span className="product-card-rating-text">({reviewCount})</span>
        </div>

        <div className="product-card-price">
          <span className="product-card-price-current">${product.price.toFixed(2)}</span>
          {discount > 2 && <span className="product-card-price-original">${originalPrice.toFixed(2)}</span>}
        </div>

        <div className="product-card-seller">
          by <span className="product-card-seller-name">{sellerName}</span>
        </div>

       
        <div className="product-card-actions">
          <button onClick={handleAddToCart} className="product-card-add-to-cart">
            <ShoppingCart className="product-card-action-icon" />
            Agregar
          </button>
        </div>
      </div>
    </div>
  )
}
