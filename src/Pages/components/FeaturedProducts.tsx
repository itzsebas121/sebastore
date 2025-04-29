import './stylesComponents.css'
import ProductCard from '../../components/Cards/ProductCard';
function FeaturedProducts() {
  const Products = [
    {
      id: 1,
      name: "Netflix 1 Pantalla",
      price: 19.99,
      image: "https://images.ctfassets.net/4cd45et68cgf/4nBnsuPq03diC5eHXnQYx/d48a4664cdc48b6065b0be2d0c7bc388/Netflix-Logo.jpg",
      description: "This is a product description."
    },
    {
      id: 2,
      name: "Spotify 3 Meses ",
      price: 19.99,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQS5hXOribY66heNB4tI1LOmEkZibejnuJx8A&s",
      description: "This is a product description."
    },
    {
      id: 3,
      name: "Disney",
      price: 19.99,
      image: "https://espnpressroom.com/latinamerica/files/2024/03/Disney-1920x1080.jpg",
      description: "This is a product description."
    },
    {
      id: 4,
      name: "Product Name",
      price: 19.99,
      image: "https://www.eluniverso.com/resizer/v2/M5SC3V4V6FH6PIGLMB5JYWU3YE.png?auth=eec7ac4556942de7071ae8638b8f283287284e501c032e9ed87b00887304d8ac&width=1228&height=670&quality=75&smart=true",
      description: "This is a product description."
    }
  ]
  const ProductCardList = Products.map((product) => {
    return (
      <ProductCard name={product.name} image={product.image} price={product.price} description={product.description} />
    )
  })
  return (
    <div className='featuredProducts-conainer'>
      <h2 className='title-h2'>Productos destacados</h2>
      <div className="featuredProducts">
        { ProductCardList}
      </div>
    </div>
  );
}
export default FeaturedProducts;