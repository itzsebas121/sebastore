import "./stylesComponents.css";
import { ArrowRight } from "lucide-react";
function About() {

  return (
    <div className="about-home">
      <h2 className="title-h2">Tus servicios de streaming favoritos al mejor precio</h2>
      <p className="p-description">
        Accede a Netflix, Spotify, Disney+ y más servicios premium a precios
        increíbles. Planes personalizados para todas tus necesidades.
      </p>
      <div className="buttons-about">
        <button className="button-global" onClick={()=>{window.location.href='/products'}}>Ver Productos <ArrowRight></ArrowRight></button>
        <button className="button-global-nofill">Contactanos</button>
      </div>
    </div>
  );
}
export default About;
