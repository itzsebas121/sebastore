"use client"

import { useState, useRef, useEffect } from "react"
import { ImageIcon } from "lucide-react"
import "./LazyImage.css"

interface LazyImageProps {
  src: string
  alt: string
  className?: string
  placeholder?: string
  onLoad?: () => void
  onError?: () => void
  rootMargin?: string
  threshold?: number
}

export default function LazyImage({
  src,
  alt,
  className = "",
  placeholder,
  onLoad,
  onError,
  rootMargin = "50px",
  threshold = 0.1,
}: LazyImageProps) {
  const [isInView, setIsInView] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { rootMargin, threshold },
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current)
      }
    }
  }, [rootMargin, threshold])

  const handleImageLoad = () => {
    setImageLoaded(true)
    onLoad?.()
  }

  const handleImageError = () => {
    setImageError(true)
    setImageLoaded(true)
    onError?.()
  }

  return (
    <div ref={containerRef} className={`lazy-image-container ${className}`}>
      {/* Placeholder */}
      <div className={`lazy-placeholder ${imageLoaded ? "loaded" : ""}`}>
        <div className="placeholder-content">
          <ImageIcon size={32} />
          <div className="loading-shimmer" />
        </div>
      </div>

      {/* Imagen real */}
      {isInView && (
        <img
          src={imageError ? placeholder || "/placeholder.svg?height=300&width=300&text=No+Image" : src}
          alt={alt}
          className={`lazy-image ${imageLoaded ? "loaded" : ""}`}
          onLoad={handleImageLoad}
          onError={handleImageError}
          loading="lazy"
        />
      )}

      {/* Indicador de carga */}
      {!imageLoaded && isInView && (
        <div className="lazy-loading-indicator">
          <div className="lazy-spinner" />
        </div>
      )}
    </div>
  )
}
