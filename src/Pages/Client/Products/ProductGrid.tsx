"use client"

import { Package } from "lucide-react"
import type { Product } from "../../../Types/Product"
import ProductCard from "./ProductCard"
import "./ProductGrid.css"
import Pagination from "./Pagination"
import LoadingImage from "../../../components/Loading/LaodingImage"

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
  if (loading) {
    return (
      <LoadingImage
        text="Cargando..."
        imageSrc="/logo.png"
        size={80}
        fullScreen={false}
      />
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

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} disabled={loading} />
    </div>
  )
}
