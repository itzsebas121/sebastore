"use client"

import { useState, useEffect, useRef } from "react"
import { X, Calendar, Clock, CreditCard, Package, CheckCircle, AlertTriangle, Loader2 } from "lucide-react"
import config from "../../../config"
import { useAuth } from "../../../context/AuthContext"
import "./SaleDetailsOverlay.css"

interface SaleDetails {
  VentaId: number
  NombreProducto: string
  PrecioUnitario: number
  ValorTotal: number
  FechaVenta: string
  Estado: "Pendiente" | "Completada" | "Cancelada"
  DescripcionEntrega: string
}

interface SaleDetailsOverlayProps {
  saleId: number
  onClose: () => void
}

export default function SaleDetailsOverlay({ saleId, onClose }: SaleDetailsOverlayProps) {
  const { token } = useAuth()
  const [saleDetails, setSaleDetails] = useState<SaleDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchSaleDetails = async () => {
      if (!token) return

      try {
        setLoading(true)
        const response = await fetch(`${config.apiBaseUrl}/api/ventas/ventaid/${saleId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          throw new Error("Error al obtener los detalles de la compra")
        }

        const data = await response.json()
        setSaleDetails(data)
      } catch (err) {
        console.error("Error fetching sale details:", err)
        setError("No pudimos cargar los detalles de esta compra. Por favor, intenta de nuevo más tarde.")
      } finally {
        setLoading(false)
      }
    }

    fetchSaleDetails()
  }, [saleId, token])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (overlayRef.current && !overlayRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [onClose])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date)
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  const getStatusClass = (status: string) => {
    switch (status) {
      case "Completada":
        return "status-completed"
      case "Pendiente":
        return "status-pending"
      case "Cancelada":
        return "status-cancelled"
      default:
        return ""
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completada":
        return <CheckCircle size={20} />
      case "Pendiente":
        return <Clock size={20} />
      case "Cancelada":
        return <AlertTriangle size={20} />
      default:
        return <Package size={20} />
    }
  }

  return (
    <div className="sale-details-backdrop" onClick={onClose}>
      <div ref={overlayRef} className="sale-details-overlay" onClick={(e) => e.stopPropagation()}>
        <div className="sale-details-header">
          <h3 className="sale-details-title">Detalles de la Compra</h3>
          <button className="close-details-button" onClick={onClose} aria-label="Cerrar detalles">
            <X size={20} />
          </button>
        </div>

        {loading ? (
          <div className="sale-details-loading">
            <Loader2 size={30} className="loading-spinner" />
            <p>Cargando detalles...</p>
          </div>
        ) : error ? (
          <div className="sale-details-error">
            <AlertTriangle size={30} />
            <h4>¡Ups! Algo salió mal</h4>
            <p>{error}</p>
            <button className="retry-button" onClick={() => window.location.reload()}>
              Intentar de nuevo
            </button>
          </div>
        ) : (
          saleDetails && (
            <div className="sale-details-content">
              <div className="sale-details-section">
                <div className="sale-details-id">
                  <span className="sale-details-id-label">ID de Compra:</span>
                  <span className="sale-details-id-value">{saleDetails.VentaId}</span>
                </div>
                <div className={`sale-details-status ${getStatusClass(saleDetails.Estado)}`}>
                  {getStatusIcon(saleDetails.Estado)}
                  <span>{saleDetails.Estado}</span>
                </div>
              </div>

              <div className="sale-details-product">
                <h4 className="sale-details-product-title">Producto</h4>
                <div className="sale-details-product-name">{saleDetails.NombreProducto}</div>
              </div>

              <div className="sale-details-info-grid">
                <div className="sale-details-info-item">
                  <div className="sale-details-info-icon">
                    <Calendar size={18} />
                  </div>
                  <div className="sale-details-info-content">
                    <h5>Fecha de Compra</h5>
                    <p>{formatDate(saleDetails.FechaVenta)}</p>
                  </div>
                </div>

                <div className="sale-details-info-item">
                  <div className="sale-details-info-icon">
                    <Clock size={18} />
                  </div>
                  <div className="sale-details-info-content">
                    <h5>Hora de Compra</h5>
                    <p>{formatTime(saleDetails.FechaVenta)}</p>
                  </div>
                </div>

                <div className="sale-details-info-item">
                  <div className="sale-details-info-icon">
                    <CreditCard size={18} />
                  </div>
                  <div className="sale-details-info-content">
                    <h5>Precio Unitario</h5>
                    <p>${saleDetails.PrecioUnitario.toFixed(2)}</p>
                  </div>
                </div>

                <div className="sale-details-info-item">
                  <div className="sale-details-info-icon">
                    <Package size={18} />
                  </div>
                  <div className="sale-details-info-content">
                    <h5>Método de Entrega</h5>
                    <p>{saleDetails.DescripcionEntrega}</p>
                  </div>
                </div>
              </div>

              <div className="sale-details-divider"></div>

              <div className="sale-details-summary">
                <div className="sale-details-summary-row">
                  <span>Subtotal:</span>
                  <span>${saleDetails.PrecioUnitario.toFixed(2)}</span>
                </div>
                <div className="sale-details-summary-row">
                  <span>Impuestos:</span>
                  <span>$0.00</span>
                </div>
                <div className="sale-details-total">
                  <span>Total:</span>
                  <span>${saleDetails.ValorTotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="sale-details-actions">
                <button className="sale-details-action-button primary">Descargar Factura</button>
                <button className="sale-details-action-button secondary">Contactar Soporte</button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  )
}
