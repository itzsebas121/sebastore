import './Client/styles.css'
import About from './Client/About';
import FeaturedProducts from './Client/FeaturedProducts';

function Home() {
  return (
    <div className="home">
      <About/>
      <FeaturedProducts/>
    </div>
  );
}
export default Home;