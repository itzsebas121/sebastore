"use client"

import { ArrowRight, Check } from "lucide-react"
import "./HeroSection.css"

function HeroSection() {
  return (
    <div className="hero-container">
      <div className="hero-content">
        <h1 className="hero-title">Entretenimiento Premium a tu Alcance</h1>
        <div className="hero-badge">¡OFERTAS EXCLUSIVAS!</div>
        <p className="hero-description">
          Disfruta de tus plataformas favoritas con los mejores precios del mercado. ¡Hasta un 70% de descuento!
        </p>
        <div className="hero-benefits">
          <div className="benefit-item">
            <Check size={16} className="benefit-icon" />
            <span>Garantía de satisfacción</span>
          </div>
          <div className="benefit-item">
            <Check size={16} className="benefit-icon" />
            <span>Soporte 24/7</span>
          </div>
          <div className="benefit-item">
            <Check size={16} className="benefit-icon" />
            <span>Reembolso garantizado</span>
          </div>
        </div>
      </div>
      <div className="hero-services">
        <div className="service-logo">
          <div className="service-overlay">Netflix</div>
          <img
            src="https://images.ctfassets.net/4cd45et68cgf/4nBnsuPq03diC5eHXnQYx/d48a4664cdc48b6065b0be2d0c7bc388/Netflix-Logo.jpg"
            alt="Netflix"
          />
        </div>
        <div className="service-logo">
          <div className="service-overlay">Spotify</div>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQS5hXOribY66heNB4tI1LOmEkZibejnuJx8A&s"
            alt="Spotify"
          />
        </div>
        <div className="service-logo">
          <div className="service-overlay">Disney+</div>
          <img src="https://espnpressroom.com/latinamerica/files/2024/03/Disney-1920x1080.jpg" alt="Disney+" />
        </div>
        <div className="service-logo">
          <div className="service-overlay">HBO Max</div>
          <img
            src="https://www.eluniverso.com/resizer/v2/M5SC3V4V6FH6PIGLMB5JYWU3YE.png?auth=eec7ac4556942de7071ae8638b8f283287284e501c032e9ed87b00887304d8ac&width=1228&height=670&quality=75&smart=true"
            alt="HBO Max"
          />
        </div>
      </div>
      <div className="about-buttons">

        <button
          className="button-global"
          onClick={() => {
            window.location.href = "/products"
          }}
        >
          Explorar Ahora <ArrowRight size={18} className="icon-right" />
        </button>
      </div>
      <div className="hero-info-bar">
        <div className="info-item">
          <span className="info-number">+1000</span>
          <span className="info-text">Clientes satisfechos</span>
        </div>
        <div className="info-item">
          <span className="info-number">99%</span>
          <span className="info-text">Tasa de satisfacción</span>
        </div>
        <div className="info-item">
          <span className="info-number">24/7</span>
          <span className="info-text">Soporte disponible</span>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
