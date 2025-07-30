"use client"

import { useState } from "react"
import { Mail, Phone, MapPin, Clock, Send, Facebook, Instagram, Twitter, Youtube } from 'lucide-react'
import "./Contact.css"

function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    })

    const [formStatus, setFormStatus] = useState({
        submitted: false,
        error: false,
        message: "",
    })

    const handleChange = (e: any) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()
        setFormStatus({
            submitted: true,
            error: false,
            message: "¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.",
        })
    }

    return (
        <div className="contact-container">
            <div className="contact-header">
                <div className="contact-badge">CONTÁCTANOS</div>
                <h1 className="contact-title">¿Tienes alguna pregunta?</h1>
                <p className="contact-subtitle">
                    Estamos aquí para ayudarte. Completa el formulario y te responderemos a la brevedad.
                </p>
            </div>

            <div className="contact-content">
                <div className="contact-form-container">
                    <h2 className="form-title">Envíanos un mensaje</h2>

                    {formStatus.submitted ? (
                        <div className="form-success">
                            <div className="success-icon">✓</div>
                            <h3>¡Gracias por contactarnos!</h3>
                            <p>{formStatus.message}</p>
                            <button
                                className="button-global"
                                onClick={() => setFormStatus({ submitted: false, error: false, message: "" })}
                            >
                                Enviar otro mensaje
                            </button>
                        </div>
                    ) : (
                        <form className="contact-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Nombre completo</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Tu nombre"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Correo electrónico</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="ejemplo@correo.com"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="subject">Asunto</label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    placeholder="¿Sobre qué quieres hablar?"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="message">Mensaje</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Escribe tu mensaje aquí..."
                                    rows={5}
                                    required
                                ></textarea>
                            </div>

                            <button type="submit" className="button-global submit-button">
                                Enviar mensaje <Send size={18} />
                            </button>
                        </form>
                    )}
                </div>

                <div className="contact-info-container">
                    <div className="info-card">
                        <h2 className="info-title">Información de contacto</h2>
                        <p className="info-subtitle">Puedes contactarnos de varias formas:</p>

                        <div className="contact-details">
                            <div className="contact-item">
                                <div className="contact-icon">
                                    <Phone size={20} />
                                </div>
                                <div className="contact-text">
                                    <h3>Teléfono</h3>
                                    <p>+593 962 199 182</p>
                                </div>
                            </div>

                            <div className="contact-item">
                                <div className="contact-icon">
                                    <Mail size={20} />
                                </div>
                                <div className="contact-text">
                                    <h3>Email</h3>
                                    <p>sebastipan109@gmail.com</p>
                                </div>
                            </div>

                            <div className="contact-item">
                                <div className="contact-icon">
                                    <MapPin size={20} />
                                </div>
                                <div className="contact-text">
                                    <h3>Ubicación</h3>
                                    <p>Quero - Ambato - Tungurahua</p>
                                </div>
                            </div>

                            <div className="contact-item">
                                <div className="contact-icon">
                                    <Clock size={20} />
                                </div>
                                <div className="contact-text">
                                    <h3>Horario de atención</h3>
                                    <p>Lun - Dom: 8:00 - 19:00</p>
                                </div>
                            </div>
                        </div>

                        <div className="contact-social">
                            <h3 className="social-title">Síguenos en redes</h3>
                            <div className="social-icons">
                                <a href="#" className="social-icon facebook">
                                    <Facebook size={20} />
                                </a>
                                <a href="#" className="social-icon instagram">
                                    <Instagram size={20} />
                                </a>
                                <a href="#" className="social-icon twitter">
                                    <Twitter size={20} />
                                </a>
                                <a href="#" className="social-icon youtube">
                                    <Youtube size={20} />
                                </a>
                            </div>
                        </div>

                        <div className="contact-promo">
                            <span className="promo-tag">SOPORTE PREMIUM</span>
                            <p>Atención personalizada para todos nuestros clientes</p>
                        </div>
                    </div>

                    <div className="map-container">
                        <iframe
                            title="Mapa de Quero Ambato Tungurahua"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15949.48444507186!2d-78.6186833!3d-1.5099681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91d38599964013ff%3A0x8ad6e380cd7cbec2!2sQuero%2C%20Tungurahua!5e0!3m2!1ses-419!2sec!4v1715863572524!5m2!1ses-419!2sec"
                            width="100%"
                            height="300"
                            style={{ border: 0 }}
                            allowFullScreen= {false}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>

                </div>
            </div>

            <div className="faq-teaser">
                <h2>¿Tienes más preguntas?</h2>
                <p>Visita nuestra sección de preguntas frecuentes para resolver tus dudas.</p>
                <button className="button-global-nofill">Ver FAQ</button>
            </div>
        </div>
    )
}
export default Contact
