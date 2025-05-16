"use client"

import { useState } from "react"
import { X } from "lucide-react"
import "./CartOverlay.css"

// Datos de ejemplo para el carrito
const sampleCartItems = [
  { id: 1, name: "Producto 1", price: 19.99, quantity: 1, image: "/placeholder.jpg" },
  { id: 2, name: "Producto 2", price: 29.99, quantity: 2, image: "/placeholder.jpg" },
]

function CartOverlay({ onClose }: { onClose: () => void }) {
  const [cartItems, setCartItems] = useState(sampleCartItems)

  const handleRemoveItem = (id:any) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  const handleQuantityChange = (id:any, newQuantity:any) => {
    if (newQuantity < 1) return

    setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)
  }

  return (
    <div className="cart-overlay" onClick={(e) => e.stopPropagation()}>
      <div className="cart-header">
        <h3>Tu Carrito</h3>
        <button className="close-button" onClick={onClose}>
          <X size={18} />
        </button>
      </div>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Tu carrito está vacío</p>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div className="cart-item" key={item.id}>
                <div className="item-image">
                  <img src={item.image || "/placeholder.svg"} alt={item.name} />
                </div>
                <div className="item-details">
                  <h4>{item.name}</h4>
                  <p className="item-price">${item.price}</p>
                  <div className="quantity-controls">
                    <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>+</button>
                  </div>
                </div>
                <button className="remove-item" onClick={() => handleRemoveItem(item.id)}>
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>

          <div className="cart-footer">
            <div className="cart-total">
              <span>Total:</span>
              <span>${calculateTotal()}</span>
            </div>
            <button className="checkout-button">Proceder al Pago</button>
            <button className="view-cart-button">Ver Carrito</button>
          </div>
        </>
      )}
    </div>
  )
}
export default CartOverlay
