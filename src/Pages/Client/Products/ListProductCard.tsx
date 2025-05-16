import './Products.css'
import { useAuth } from '../../../context/AuthContext';
interface ProductCardProps {
  name: string;
  image: string;
  description: string;
  price: number;
}

const ListProductCard = ({ name, image, description, price }: ProductCardProps) => {
  const { token } = useAuth();
  const handleAdd = () => {
    if (!token) {
      alert("No estas logueado");
    }
    else{
      alert("Agregado al carrito");
    }
  }
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
          <button className="product-button" onClick={handleAdd}>Agregar</button>
        </div>
      </div>
    </div>
  );
};

export default ListProductCard;
