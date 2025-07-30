import type React from "react"
import "./LoadingImage.css"

interface LoadingImageProps {
  text?: string
  imageSrc: string
  size?: number
  fullScreen?: boolean
}

const LoadingImage: React.FC<LoadingImageProps> = ({ text = "Cargando", imageSrc, size = 120, fullScreen = true }) => {
  return (
    <div className={`loading-screen ${fullScreen ? "fullscreen" : ""}`}>
      <div className="loading-content">
        {/* Logo centrado y estático */}
        <div className="logo-container" style={{ width: size, height: size }}>
          <img src={imageSrc || "/placeholder.svg"} alt="Logo" className="logo-image" />
        </div>

        {/* Texto con animación de carga */}
        {text && (
          <div className="loading-text-container">
            <p className="loading-text">{text}</p>
            <span className="loading-dots">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

export default LoadingImage
