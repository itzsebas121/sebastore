import { useParams } from 'react-router-dom';

const Checkout = () => {
  const { id } = useParams();

  return (
    <div>
      <h2>Procesar compra para producto ID: {id}</h2>
    </div>
  );
};

export default Checkout;
