import './styleCard.css'
import { ShoppingCart} from 'lucide-react'
function ProductCard(props: any) {


  return (
    <div className="product-card">
      <img src={props.image} alt={props.name} />

      <div className="price-tag">
        <span>$ {props.price}</span>
      </div>

      <div className="overlay">
        <p className="name">{props.name}</p>
        <p className="description">{props.description}</p>
      </div>
      <button className='button-global-nofill' onClick={()=>{alert(props.name)}}>Agregar<ShoppingCart></ShoppingCart></button>
    </div>


  )
}
export default ProductCard  