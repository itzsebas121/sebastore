import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../../context/AuthContext"
import {
  Calendar,
  Clock,
  Filter,
  ChevronLeft,
  ChevronRight,
  Search,
  Eye,
  X,
  Package,
  CheckCircle,
  AlertTriangle,
} from "lucide-react"
import config from "../../../config"
import "./History.css"
import SaleDetailsOverlay from "./SaleDetailsOverlay"

interface Sale {
  VentaId: number
  NombreProducto: string
  FechaVenta: string
  ValorTotal: number
  Estado: "Pendiente" | "Completada" | "Cancelada"
}

export default function History() {
  const { token } = useAuth()
  const navigate = useNavigate()

  const [sales, setSales] = useState<Sale[]>([])
  const [filteredSales, setFilteredSales] = useState<Sale[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedSaleId, setSelectedSaleId] = useState<number | null>(null)
  const [showDetailsOverlay, setShowDetailsOverlay] = useState(false)
  const [activeFilter, setActiveFilter] = useState<string>("Todos")
  const [searchTerm, setSearchTerm] = useState("")

  const salesPerPage = 5

  useEffect(() => {
    if (!token) {
      const redirectTimer = setTimeout(() => {
        navigate("/login", { replace: true })
      }, 50500)
      return () => clearTimeout(redirectTimer)
    }
  }, [token, navigate])

  useEffect(() => {
    const fetchSalesHistory = async () => {
      if (!token) return

      try {
        setLoading(true)
        const response = await fetch(`${config.apiBaseUrl}/api/ventas/clienteid/1`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          throw new Error("Error al obtener el historial de compras")
        }

        const data = await response.json()
        setSales(data)
        setFilteredSales(data)
      } catch (err) {
        console.error("Error fetching sales history:", err)
        setError("No pudimos cargar tu historial de compras. Por favor, intenta de nuevo más tarde.")
      } finally {
        setLoading(false)
      }
    }

    fetchSalesHistory()
  }, [token])

  useEffect(() => {
    let result = [...sales]
    if (activeFilter !== "Todos") {
      result = result.filter((sale) => sale.Estado === activeFilter)
    }
    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase()
      result = result.filter(
        (sale) =>
          sale.NombreProducto.toLowerCase().includes(term) ||
          sale.VentaId.toString().includes(term) ||
          formatDate(sale.FechaVenta).toLowerCase().includes(term),
      )
    }
    setFilteredSales(result)
    setCurrentPage(1)
  }, [activeFilter, searchTerm, sales])

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
        return <CheckCircle size={16} />
      case "Pendiente":
        return <Clock size={16} />
      case "Cancelada":
        return <AlertTriangle size={16} />
      default:
        return <Package size={16} />
    }
  }

  const handleViewDetails = (saleId: number) => {
    setSelectedSaleId(saleId)
    setShowDetailsOverlay(true)
  }

  const handleCloseOverlay = () => {
    setShowDetailsOverlay(false)
    setSelectedSaleId(null)
  }

  const indexOfLastSale = currentPage * salesPerPage
  const indexOfFirstSale = indexOfLastSale - salesPerPage
  const currentSales = filteredSales.slice(indexOfFirstSale, indexOfLastSale)
  const totalPages = Math.ceil(filteredSales.length / salesPerPage)

  const paginate = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber)
    }
  }

  const renderPageNumbers = () => {
    const pageNumbers = []
    const maxVisiblePages = 3
    let startPage = Math.max(1, currentPage - 1)
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          className={`pagination-number ${currentPage === i ? "active" : ""}`}
          onClick={() => paginate(i)}
        >
          {i}
        </button>,
      )
    }
    return pageNumbers
  }

  // Mostrar mensaje si no hay token (antes del redirect)
  if (!token) {
    return (
      <div className="history-container">
        <div className="history-error">
          <AlertTriangle size={40} />
          <h3>No estás autenticado</h3>
          <p>Para ver tu historial de compras necesitas iniciar sesión.</p>
          <div className="history-buttons">
            <a href="/login" className="shop-now-button">
              Iniciar sesión
            </a> 
            <a href="/register" className="shop-now-button">
              Registrarme
            </a>
          </div>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="history-container">
        <div className="history-loading">
          <div className="loading-spinner"></div>
          <p>Cargando tu historial de compras...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="history-container">
        <div className="history-error">
          <AlertTriangle size={40} />
          <h3>¡Ups! Algo salió mal</h3>
          <p>{error}</p>
          <button className="retry-button" onClick={() => window.location.reload()}>
            Intentar de nuevo
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="history-container">
      <div className="history-header">
        <h2 className="history-title">Historial de Compras</h2>
        <p className="history-subtitle">Revisa el estado y los detalles de tus compras anteriores</p>
      </div>

      <div className="history-filters">
        <div className="search-container">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Buscar por nombre o ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          {searchTerm && (
            <button className="clear-search" onClick={() => setSearchTerm("")}>
              <X size={16} />
            </button>
          )}
        </div>

        <div className="filter-container">
          <div className="filter-label">
            <Filter size={16} />
            <span>Filtrar por:</span>
          </div>
          <div className="filter-buttons">
            {["Todos", "Pendiente", "Completada", "Cancelada"].map((estado) => (
              <button
                key={estado}
                className={`filter-button ${activeFilter === estado ? "active" : ""}`}
                onClick={() => setActiveFilter(estado)}
              >
                {estado}
              </button>
            ))}
          </div>
        </div>
      </div>

      {filteredSales.length === 0 ? (
        <div className="empty-history">
          <div className="empty-icon">
            <Package size={50} />
          </div>
          <h3>No hay compras que mostrar</h3>
          <p>
            {activeFilter !== "Todos" || searchTerm
              ? "No se encontraron compras con los filtros aplicados."
              : "Aún no has realizado ninguna compra."}
          </p>
          {(activeFilter !== "Todos" || searchTerm) && (
            <button
              className="clear-filters-button"
              onClick={() => {
                setActiveFilter("Todos")
                setSearchTerm("")
              }}
            >
              Limpiar filtros
            </button>
          )}
          <a href="/products" className="shop-now-button">
            Explorar productos
          </a>
        </div>
      ) : (
        <>
          <div className="sales-list">
            {currentSales.map((sale) => (
              <div className="sale-card" key={sale.VentaId}>
                <div className="sale-header">
                  <div className="sale-id">
                    <span className="sale-id-label">ID de Compra:</span>
                    <span className="sale-id-value">{sale.VentaId}</span>
                  </div>
                  <div className={`sale-status ${getStatusClass(sale.Estado)}`}>
                    {getStatusIcon(sale.Estado)}
                    <span>{sale.Estado}</span>
                  </div>
                </div>

                <div className="sale-content">
                  <h3 className="sale-product-name">{sale.NombreProducto}</h3>

                  <div className="sale-details">
                    <div className="sale-detail">
                      <Calendar size={16} className="sale-detail-icon" />
                      <span>{formatDate(sale.FechaVenta)}</span>
                    </div>
                    <div className="sale-detail">
                      <Clock size={16} className="sale-detail-icon" />
                      <span>{formatTime(sale.FechaVenta)}</span>
                    </div>
                  </div>

                  <div className="sale-footer">
                    <div className="sale-price">${sale.ValorTotal.toFixed(2)}</div>
                    <button className="view-details-button" onClick={() => handleViewDetails(sale.VentaId)}>
                      <Eye size={16} />
                      <span>Ver detalles</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              <button
                className="pagination-arrow"
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft size={18} />
              </button>
              {renderPageNumbers()}
              <button
                className="pagination-arrow"
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </>
      )}

      {showDetailsOverlay && selectedSaleId && (
        <SaleDetailsOverlay saleId={selectedSaleId} onClose={handleCloseOverlay} />
      )}
    </div>
  )
}
