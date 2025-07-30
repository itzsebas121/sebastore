"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import "./PriceRangeSlider.css"

interface PriceRangeSliderProps {
  min: number
  max: number
  value: [number, number]
  onChange: (value: [number, number]) => void
  disabled?: boolean
}

export default function PriceRangeSlider({ min, max, value, onChange, disabled = false }: PriceRangeSliderProps) {
  const [isDragging, setIsDragging] = useState<number | null>(null)
  const [showTooltips, setShowTooltips] = useState<boolean>(false)
  const sliderRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = (index: number) => (e: React.MouseEvent) => {
    if (disabled) return
    e.preventDefault()
    setIsDragging(index)
    setShowTooltips(true)
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging === null || !sliderRef.current || disabled) return

    const rect = sliderRef.current.getBoundingClientRect()
    const percentage = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    const newValue = Math.round(min + percentage * (max - min))

    const newRange: [number, number] = [...value]

    if (isDragging === 0) {
      newRange[0] = Math.min(newValue, value[1])
    } else {
      newRange[1] = Math.max(newValue, value[0])
    }

    onChange(newRange)
  }

  const handleMouseUp = () => {
    setIsDragging(null)
    setShowTooltips(false)
  }

  useEffect(() => {
    if (isDragging !== null) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
      return () => {
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
      }
    }
  }, [isDragging, value])

  const getPercentage = (val: number) => ((val - min) / (max - min)) * 100

  return (
    <div className="price-range-slider">
      <div ref={sliderRef} className={`price-slider-track ${disabled ? "disabled" : ""}`}>
        {/* Background track */}
        <div className="price-slider-background" />

        {/* Active range */}
        <div
          className="price-slider-range"
          style={{
            left: `${getPercentage(value[0])}%`,
            width: `${getPercentage(value[1]) - getPercentage(value[0])}%`,
          }}
        />

        {/* Min thumb */}
        <div
          className={`price-slider-thumb ${isDragging === 0 ? "dragging" : ""}`}
          style={{ left: `${getPercentage(value[0])}%` }}
          onMouseDown={handleMouseDown(0)}
        >
          <div className={`price-tooltip ${showTooltips || isDragging === 0 ? "visible" : ""}`}>${value[0]}</div>
        </div>

        {/* Max thumb */}
        <div
          className={`price-slider-thumb ${isDragging === 1 ? "dragging" : ""}`}
          style={{ left: `${getPercentage(value[1])}%` }}
          onMouseDown={handleMouseDown(1)}
        >
          <div className={`price-tooltip ${showTooltips || isDragging === 1 ? "visible" : ""}`}>${value[1]}</div>
        </div>
      </div>
    </div>
  )
}
