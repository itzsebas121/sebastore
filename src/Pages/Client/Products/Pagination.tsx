"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import "./Pagination.css"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  disabled?: boolean
}

export default function Pagination({ currentPage, totalPages, onPageChange, disabled = false }: PaginationProps) {
  if (totalPages <= 1) return null

  const generatePageNumbers = () => {
    const pages: (number | string)[] = []
    const maxVisiblePages = 5

    if (totalPages <= maxVisiblePages + 2) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Always show first page
      pages.push(1)

      if (currentPage <= 3) {
        // Show pages 2, 3, 4, ..., last
        for (let i = 2; i <= Math.min(4, totalPages - 1); i++) {
          pages.push(i)
        }
        if (totalPages > 4) {
          pages.push("...")
        }
      } else if (currentPage >= totalPages - 2) {
        // Show 1, ..., last-3, last-2, last-1, last
        pages.push("...")
        for (let i = Math.max(2, totalPages - 3); i <= totalPages - 1; i++) {
          pages.push(i)
        }
      } else {
        // Show 1, ..., current-1, current, current+1, ..., last
        pages.push("...")
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i)
        }
        pages.push("...")
      }

      // Always show last page (if not already included)
      if (totalPages > 1 && pages[pages.length - 1] !== totalPages) {
        pages.push(totalPages)
      }
    }

    return pages
  }

  const pageNumbers = generatePageNumbers()

  return (
    <div className="pagination-container">
      {/* Previous button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1 || disabled}
        className="pagination-arrow pagination-prev"
        aria-label="Página anterior"
      >
        <ChevronLeft className="pagination-arrow-icon" />
      </button>

      {/* Page numbers */}
      <div className="pagination-numbers">
        {pageNumbers.map((page, index) => (
          <div key={index}>
            {typeof page === "number" ? (
              <button
                onClick={() => onPageChange(page)}
                className={`pagination-number ${page === currentPage ? "active" : ""}`}
                disabled={disabled}
              >
                {page}
              </button>
            ) : (
              <span className="pagination-ellipsis">{page}</span>
            )}
          </div>
        ))}
      </div>

      {/* Next button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages || disabled}
        className="pagination-arrow pagination-next"
        aria-label="Página siguiente"
      >
        <ChevronRight className="pagination-arrow-icon" />
      </button>
    </div>
  )
}
