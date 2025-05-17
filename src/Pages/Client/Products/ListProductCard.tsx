import { useState } from "react";
import './Products.css'
import { useAuth } from '../../../context/AuthContext';
import config from '../../../config';

interface ProductCardProps {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
  clientId: number;
}

const ListProductCard = ({ name, image, description, price, id, clientId }: ProductCardProps) => {
  const { token } = useAuth();

  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    if (!token) {
      alert("No estás logueado");
      return;
    }
    setLoading(true);

    try {
      await addToCart(id, clientId);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId: number, clientId: number, cantidad = 1) => {
    try {
      const response = await fetch(`${config.apiBaseUrl}/api/cart/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ClienteId: clientId,
          ProductoId: productId,
          Cantidad: cantidad,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al agregar al carrito");
      }

      const result = await response.json();
      alert("✅ Producto agregado al carrito");
      return result;
    } catch (error) {
      console.error("Error en addToCart:", error);
      alert("No se pudo agregar el producto al carrito");
      throw error;
    }
  };


  return (
    <div className="product-card">
      <div className="image-container">
        <img src={image || "/placeholder.png"} alt={name} className="product-img" />
      </div>
      <div className="product-info">
        <h3 className="product-name">{name}</h3>
        <p className="product-description">{description}</p>
        <div className="product-footer">
          <span className="product-price">${price.toFixed(2)}</span>
          <button
            className="product-button"
            onClick={handleAdd}
            disabled={loading}
          >
            {loading ? "Agregando..." : "Agregar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListProductCard;
