"use client"

import { Search, RotateCcw, Filter, X } from "lucide-react"
import type { Category } from "../../../Types/Category"
import "./Filters.css"
import PriceRangeSlider from "./PriceRangeSlider"

interface FiltersProps {
  nameFilter: string
  categories: Category[]
  selectedCategoryId: number
  priceRange: [number, number]
  onResetFilters: () => void
  loading: boolean
  onNameFilterChange: (value: string) => void
  onCategoryIdChange: (value: number) => void
  onPriceRangeChange: (value: [number, number]) => void
  onClose?: () => void
  isMobile: boolean
}

export default function Filters({
  nameFilter,
  categories,
  selectedCategoryId,
  priceRange,
  onResetFilters,
  loading,
  onNameFilterChange,
  onCategoryIdChange,
  onPriceRangeChange,
  onClose,
  isMobile,
}: FiltersProps) {
  return (
    <div className={`filters-container ${isMobile ? "filters-container-mobile" : ""}`}>
      {isMobile && (
        <div className="filters-mobile-header">
          <h3>Filtros</h3>
          <button onClick={onClose} className="filters-mobile-close">
            <X className="filters-mobile-close-icon" />
          </button>
        </div>
      )}

      <div className="filters-header">
        <div className="filters-title">
          <Filter className="filters-icon" />
          <h3>Filtros</h3>
        </div>
        <button onClick={onResetFilters} className="filters-reset-button" disabled={loading}>
          <RotateCcw className="filters-reset-icon" />
          Limpiar
        </button>
      </div>

      <div className="filters-section">
        <label className="filters-label">Buscar por nombre</label>
        <div className="filters-search-container">
          <Search className="filters-search-icon" />
          <input
            type="text"
            value={nameFilter}
            onChange={(e) => onNameFilterChange(e.target.value)}
            placeholder="Buscar productos..."
            className="filters-search-input"
            disabled={loading}
          />
        </div>
      </div>

      <div className="filters-section">
        <label className="filters-label">Categorías</label>
        <div className="filters-categories">
          {categories.slice(0, 8).map((category) => (
            <label key={category.categoryId} className="filters-category-item">
              <input
                type="checkbox"
                checked={selectedCategoryId === category.categoryId}
                onChange={(e) => onCategoryIdChange(e.target.checked ? category.categoryId : 0)}
                className="filters-category-checkbox"
                disabled={loading}
              />
              <span className="filters-category-name">{category.name}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="filters-section">
        <label className="filters-label">Rango de precio</label>
        <PriceRangeSlider min={0} max={25} value={priceRange} onChange={onPriceRangeChange} disabled={loading} />
        <div className="filters-price-display">
          <span className="filters-price-value">${priceRange[0]}</span>
          <span className="filters-price-separator">-</span>
          <span className="filters-price-value">${priceRange[1]}</span>
        </div>
      </div>

      {loading && (
        <div className="filters-loading">
          <div className="filters-loading-spinner"></div>
          <span>Aplicando filtros...</span>
        </div>
      )}
    </div>
  )
}
