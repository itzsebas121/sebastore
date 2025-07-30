"use client"

import type React from "react"
import { useEffect, useState, useRef } from "react"
import { X, ShoppingBag, Trash2, Plus, Minus, AlertCircle, Loader2 } from "lucide-react"
import config from "../../config"
import "./CartOverlay.css"
import { useAuth } from "../../context/AuthContext"

interface CartItem {
  CartItemId: number
  ImagenUrl: string
  Producto: string
  Descripcion: string
  Quantity: number
  Price: number
  Subtotal: number
  CreatedAt: string
  CartId: number
}

interface CartOverlayProps {
  onClose: () => void
  clientId: number
  isLoggedIn: boolean
}

interface DeleteConfirmation {
  isOpen: boolean
  itemId: number | null
  itemName: string
}

export default function CartOverlay({ onClose, clientId, isLoggedIn }: CartOverlayProps) {
  const { token } = useAuth()
  const [cartItems, setCartItems] = useState<CartItem[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [deleteConfirmation, setDeleteConfirmation] = useState<DeleteConfirmation>({
    isOpen: false,
    itemId: null,
    itemName: "",
  })

  const overlayRef = useRef<HTMLDivElement>(null)
  const isClosingRef = useRef<boolean>(false)

  useEffect(() => {
    if (!token || !isLoggedIn) {
      setCartItems(null)
      setLoading(false)
      return
    }

    const fetchCart = async () => {
      try {
        setLoading(true)
        const res = await fetch(`${config.apiBaseUrl}/api/cart/view/${clientId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (!res.ok) throw new Error("Error al cargar el carrito")
        const data = await res.json()
        setCartItems(data)
      } catch (err) {
        console.error("❌ Error al obtener el carrito:", err)
        setCartItems([])
      } finally {
        setLoading(false)
      }
    }

    fetchCart()
  }, [clientId, token, isLoggedIn])

  useEffect(() => {
    // Función para manejar clics fuera del overlay
    const handleClickOutside = (event: MouseEvent) => {
      // No cerrar si estamos en proceso de eliminación o si el clic fue dentro del overlay
      if (
        deleteConfirmation.isOpen ||
        isClosingRef.current ||
        (overlayRef.current && overlayRef.current.contains(event.target as Node))
      ) {
        return
      }

      isClosingRef.current = true
      onClose()
      // Resetear la bandera después de un breve retraso
      setTimeout(() => {
        isClosingRef.current = false
      }, 100)
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [onClose, deleteConfirmation.isOpen])

  const confirmDelete = (id: number, name: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setDeleteConfirmation({ isOpen: true, itemId: id, itemName: name })
  }

  const handleRemoveItem = (id: number) => {
    setCartItems((prev) => prev?.filter((item) => item.CartItemId !== id) || [])
    setDeleteConfirmation({ isOpen: false, itemId: null, itemName: "" })
  }

  const cancelDelete = () => {
    setDeleteConfirmation({ isOpen: false, itemId: null, itemName: "" })
  }

  const handleQuantityChange = (id: number, newQuantity: number, e?: React.MouseEvent) => {
    // Detener la propagación del evento si existe
    if (e) {
      e.stopPropagation()
    }

    if (!cartItems || newQuantity < 1) return

    setCartItems(
      cartItems.map((item) =>
        item.CartItemId === id ? { ...item, Quantity: newQuantity, Subtotal: newQuantity * item.Price } : item,
      ),
    )
  }

  const calculateTotal = () => (cartItems?.reduce((total, item) => total + item.Subtotal, 0) || 0).toFixed(2)

  if (!isLoggedIn) {
    return (
      <div className="cart-overlay-backdrop" onClick={onClose}>
        <div ref={overlayRef} className="cart-overlay-sc" onClick={(e) => e.stopPropagation()}>
          <div className="cart-header">
            <div className="cart-title">
              <ShoppingBag size={18} />
              <h3>Tu Carrito</h3>
            </div>
            <button
              className="close-button"
              onClick={(e) => {
                e.stopPropagation()
                onClose()
              }}
              aria-label="Cerrar carrito"
            >
              <X size={18} />
            </button>
          </div>
          <div className="empty-cart">
            <h4>Tu carrito está vacío</h4>
            <p>Inicia sesión o regístrate para agregar productos a tu carrito.</p>
            <a href="/login" className="login-button">
              Iniciar Sesión
            </a>
            <a href="/register" className="register-link">
              ¿No tienes cuenta? Regístrate
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="cart-overlay-backdrop" onClick={onClose}>
      <div ref={overlayRef} className="cart-overlay-sc" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <div className="cart-title">
            <ShoppingBag size={18} />
            <h3>Tu Carrito</h3>
          </div>
          <button
            className="close-button"
            onClick={(e) => {
              e.stopPropagation()
              onClose()
            }}
            aria-label="Cerrar carrito"
          >
            <X size={18} />
          </button>
        </div>

        {loading ? (
          <div className="cart-loading">
            <Loader2 size={24} className="loading-spinner" />
            <p>Cargando tu carrito...</p>
          </div>
        ) : !cartItems || cartItems.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-cart-icon">
              <ShoppingBag size={40} />
            </div>
            <h4>Tu carrito está vacío</h4>
            <p>Añade productos para comenzar</p>
            <button className="shop-now-button" onClick={onClose}>
              Explorar productos
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items-count">
              <span>
                {cartItems.length} {cartItems.length === 1 ? "producto" : "productos"} en tu carrito
              </span>
            </div>
            <div className="cart-items">
              {cartItems.map((item) => (
                <div className="cart-item" key={item.CartItemId}>
                  <button
                    className="remove-item"
                    onClick={(e) => confirmDelete(item.CartItemId, item.Producto, e)}
                    aria-label="Eliminar producto"
                  >
                    <Trash2 size={16} />
                  </button>
                  <div className="item-image">
                    <img src={item.ImagenUrl || "/placeholder.svg"} alt={item.Producto} />
                  </div>
                  <div className="item-details">
                    <h4>{item.Producto}</h4>
                    <p className="item-price">${item.Price.toFixed(2)}</p>
                    <div className="item-actions">
                      <div className="quantity-controls">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleQuantityChange(item.CartItemId, item.Quantity - 1, e)
                          }}
                          disabled={item.Quantity <= 1}
                          aria-label="Disminuir cantidad"
                        >
                          <Minus size={14} />
                        </button>
                        <span>{item.Quantity}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleQuantityChange(item.CartItemId, item.Quantity + 1, e)
                          }}
                          aria-label="Aumentar cantidad"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="item-subtotal">
                    <span>${item.Subtotal.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-footer">
              <div className="cart-summary">
                <div className="summary-row">
                  <span>Subtotal:</span>
                  <span>${calculateTotal()}</span>
                </div>

                <div className="cart-total">
                  <span>Total:</span>
                  <span>${calculateTotal()}</span>
                </div>
              </div>
              <button className="checkout-button">Proceder al Pago</button>
              <button className="view-cart-button">Ver Carrito Completo</button>
            </div>

            {deleteConfirmation.isOpen && (
              <div className="delete-confirmation" onClick={(e) => e.stopPropagation()}>
                <div className="confirmation-content">
                  <div className="confirmation-icon">
                    <AlertCircle size={24} />
                  </div>
                  <h4>¿Eliminar producto?</h4>
                  <p>¿Estás seguro que deseas eliminar "{deleteConfirmation.itemName}" de tu carrito?</p>
                  <div className="confirmation-actions">
                    <button className="cancel-button" onClick={cancelDelete}>
                      Cancelar
                    </button>
                    <button
                      className="confirm-button"
                      onClick={() => deleteConfirmation.itemId !== null && handleRemoveItem(deleteConfirmation.itemId)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
