import './styleCard.css'
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
    </div>


  )
}
export default ProductCard  