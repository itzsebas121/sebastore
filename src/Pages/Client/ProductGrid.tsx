import { ChevronLeft, ChevronRight } from "lucide-react";
import ListProductCard from "../Client/ListProductCard";
import "./styles.css";

interface Product {
  ProductoId: number;
  ProductoNombre: string;
  ImagenUrl: string;
  Descripcion: string;
  Precio: number;
  CategoriaNombre: string;
}

interface Props {
  products: Product[];
  loading: boolean;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function ProductGrid({
  products,
  loading,
  currentPage,
  totalPages,
  onPageChange,
}: Props) {
  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner" />
      </div>
    );
  }

  if (products.length === 0) {
    return <div className="no-products">No hay productos</div>;
  }

  const renderPaginationButtons = () => {
    const buttons = [];
    const max = 5;
    buttons.push(
      <button
        key={1}
        onClick={() => onPageChange(1)}
        className={`pagination-button ${currentPage === 1 ? "active" : ""}`}
      >
        1
      </button>
    );
    if (totalPages > max) {
      let start = Math.max(2, currentPage - Math.floor(max / 2));
      let end = Math.min(totalPages - 1, start + max - 3);
      if (end - start < max - 3) start = Math.max(2, end - (max - 3) + 1);
      if (start > 2) buttons.push(<span key="s-ell" className="ellipsis">...</span>);
      for (let i = start; i <= end; i++) {
        buttons.push(
          <button
            key={i}
            onClick={() => onPageChange(i)}
            className={`pagination-button ${currentPage === i ? "active" : ""}`}
          >
            {i}
          </button>
        );
      }
      if (end < totalPages - 1) buttons.push(<span key="e-ell" className="ellipsis">...</span>);
    } else {
      for (let i = 2; i < totalPages; i++) {
        buttons.push(
          <button
            key={i}
            onClick={() => onPageChange(i)}
            className={`pagination-button ${currentPage === i ? "active" : ""}`}
          >
            {i}
          </button>
        );
      }
    }
    if (totalPages > 1) {
      buttons.push(
        <button
          key={totalPages}
          onClick={() => onPageChange(totalPages)}
          className={`pagination-button ${currentPage === totalPages ? "active" : ""}`}
        >
          {totalPages}
        </button>
      );
    }
    return buttons;
  };

  return (
    <>
      <div className="product-grid">
        {products.map((p) => (
          <ListProductCard
            key={p.ProductoId}
            name={p.ProductoNombre}
            image={p.ImagenUrl}
            description={p.Descripcion}
            price={p.Precio}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`pagination-button prev-next ${currentPage === 1 ? "disabled" : ""}`}
          >
            <ChevronLeft size={20} />
          </button>
          <div className="pagination-buttons">{renderPaginationButtons()}</div>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`pagination-button prev-next ${currentPage === totalPages ? "disabled" : ""}`}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </>
  );
}
