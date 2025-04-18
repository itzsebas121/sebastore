import './styles.css'
import About from './components/About';
import FeaturedProducts from './components/FeaturedProducts';

function Home() {
  return (
    <div className="home">
      <About/>
      <FeaturedProducts/>
    </div>
  );
}
export default Home;