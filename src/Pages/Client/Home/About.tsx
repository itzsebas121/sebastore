import "./About.css"
import { ArrowRight, Star, Clock, CreditCard, Facebook, Instagram, Twitter, Youtube } from "lucide-react"

function About() {
  return (
    <div className="about-section">
      <div className="about-content">
        <div className="about-header">
          <h2 className="hero-title">Tus servicios de streaming favoritos al mejor precio</h2>
        </div>

        <p className="about-description">
          Accede a Netflix, Spotify, Disney+ y más servicios premium a precios increíbles. Planes personalizados para
          todas tus necesidades.
        </p>

        <div className="about-features">
          <div className="feature">
            <div className="feature-icon">
              <Star size={20} />
            </div>
            <span>Calidad Premium</span>
          </div>

          <div className="feature">
            <div className="feature-icon">
              <Clock size={20} />
            </div>
            <span>Activación Inmediata</span>
          </div>

          <div className="feature">
            <div className="feature-icon">
              <CreditCard size={20} />
            </div>
            <span>Pago Seguro</span>
          </div>
        </div>

        <div className="about-buttons">
          <button
            className="button-global"
            onClick={() => {
              window.location.href = "/products"
            }}
          >
            Ver Productos <ArrowRight size={18} />
          </button>
          <button className="button-global-nofill">Contáctanos</button>
        </div>

        <div className="social-section">
          <h3 className="social-title">Síguenos en redes sociales</h3>
          <div className="social-icons">
            <a href="#" className="social-icon facebook">
              <Facebook size={24} />
            </a>
            <a href="#" className="social-icon instagram">
              <Instagram size={24} />
            </a>
            <a href="#" className="social-icon twitter">
              <Twitter size={24} />
            </a>
            <a href="#" className="social-icon youtube">
              <Youtube size={24} />
            </a>
          </div>
          <div className="social-promo">
            <span className="promo-tag">¡PROMOCIÓN ESPECIAL!</span>
            <p>10% de descuento adicional siguiéndonos en redes sociales</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
