"use client"

import { ChevronLeft, ChevronRight, Package } from "lucide-react"
import type { Product } from "../../../Types/Product"
import ProductCard from "./ProductCard"
import "./ProductGrid.css"

interface ProductGridProps {
  products: Product[]
  loading: boolean
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  totalCount: number
  onProductView: (product: Product) => void
}

export default function ProductGrid({
  products,
  loading,
  currentPage,
  totalPages,
  onPageChange,
  totalCount,
  onProductView,
}: ProductGridProps) {
  const renderPagination = () => {
    if (totalPages <= 1) return null

    const pages = []
    const maxVisiblePages = 5
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }

    return (
      <div className="product-grid-pagination">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1 || loading}
          className="product-grid-pagination-button product-grid-pagination-prev"
        >
          <ChevronLeft className="product-grid-pagination-icon" />
          Anterior
        </button>

        <div className="product-grid-pagination-numbers">
          {startPage > 1 && (
            <>
              <button onClick={() => onPageChange(1)} className="product-grid-pagination-number" disabled={loading}>
                1
              </button>
              {startPage > 2 && <span className="product-grid-pagination-ellipsis">...</span>}
            </>
          )}

          {pages.map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`product-grid-pagination-number ${
                page === currentPage ? "product-grid-pagination-number-active" : ""
              }`}
              disabled={loading}
            >
              {page}
            </button>
          ))}

          {endPage < totalPages && (
            <>
              {endPage < totalPages - 1 && <span className="product-grid-pagination-ellipsis">...</span>}
              <button
                onClick={() => onPageChange(totalPages)}
                className="product-grid-pagination-number"
                disabled={loading}
              >
                {totalPages}
              </button>
            </>
          )}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages || loading}
          className="product-grid-pagination-button product-grid-pagination-next"
        >
          Siguiente
          <ChevronRight className="product-grid-pagination-icon" />
        </button>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="product-grid-loading">
        <div className="product-grid-loading-spinner"></div>
        <p>Cargando productos increíbles...</p>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="product-grid-empty">
        <Package className="product-grid-empty-icon" />
        <h3>No se encontraron productos</h3>
        <p>Intenta ajustar los filtros para descubrir productos increíbles</p>
      </div>
    )
  }

  return (
    <div className="product-grid-container">
      <div className="product-grid-header">
        <h2>Productos Destacados ({totalCount})</h2>
        <p>
          Página {currentPage} de {totalPages}
        </p>
      </div>

      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.productId} product={product} onView={() => onProductView(product)} />
        ))}
      </div>

      {renderPagination()}
    </div>
  )
}
