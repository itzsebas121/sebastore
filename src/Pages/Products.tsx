"use client";
import config from "../config";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ListProductCard from "./components/ListProductCard";
import "./styles.css";


interface Product {
  ProductoId: number;
  ProductoNombre: string;
  ImagenUrl: string;
  Descripcion: string;
  Precio: number;
}

interface PaginatedData {
  data: Product[];
  currentPage: number;
  totalPages: number;
}

function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchProducts = (page: number) => {
    setLoading(true);
    fetch(`${config.apiBaseUrl}/api/productos?page=${page}&pageSize=8`)
      .then((response) => {
        if (!response.ok) throw new Error("Error al cargar los productos");
        return response.json();
      })
      .then((data: PaginatedData) => {
        setProducts(data.data);
        setTotalPages(data.totalPages);
        setCurrentPage(data.currentPage);
        setLoading(false);
      })
      .catch(() => {
        setError("Error al cargar los productos");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Función para generar los botones de paginación
  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisibleButtons = 5;

    // Siempre mostrar la primera página
    buttons.push(
      <button
        key={1}
        onClick={() => handlePageChange(1)}
        className={`pagination-button ${currentPage === 1 ? "active" : ""}`}
      >
        1
      </button>
    );

    // Lógica para mostrar puntos suspensivos y páginas intermedias
    if (totalPages > maxVisibleButtons) {
      let startPage = Math.max(2, currentPage - Math.floor(maxVisibleButtons / 2));
      const endPage = Math.min(totalPages - 1, startPage + maxVisibleButtons - 3);

      if (endPage - startPage < maxVisibleButtons - 3) {
        startPage = Math.max(2, endPage - (maxVisibleButtons - 3) + 1);
      }

      // Puntos suspensivos al inicio si es necesario
      if (startPage > 2) {
        buttons.push(
          <span key="start-ellipsis" className="ellipsis">...</span>
        );
      }

      // Páginas intermedias
      for (let i = startPage; i <= endPage; i++) {
        buttons.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`pagination-button ${currentPage === i ? "active" : ""}`}
          >
            {i}
          </button>
        );
      }

      // Puntos suspensivos al final si es necesario
      if (endPage < totalPages - 1) {
        buttons.push(
          <span key="end-ellipsis" className="ellipsis">...</span>
        );
      }
    } else {
      // Si hay pocas páginas, mostrar todas
      for (let i = 2; i < totalPages; i++) {
        buttons.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`pagination-button ${currentPage === i ? "active" : ""}`}
          >
            {i}
          </button>
        );
      }
    }

    // Siempre mostrar la última página si hay más de una
    if (totalPages > 1) {
      buttons.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className={`pagination-button ${currentPage === totalPages ? "active" : ""}`}
        >
          {totalPages}
        </button>
      );
    }

    return buttons;
  };

  if (loading)
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
      </div>
    );

  if (error)
    return <div className="error-message">Error: {error}</div>;

  return (
    <div className="container">
      <div className="product-grid">
        {products.map((product) => (
          <ListProductCard
            key={product.ProductoId}
            name={product.ProductoNombre}
            image={product.ImagenUrl}
            description={product.Descripcion}
            price={product.Precio}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`pagination-button prev-next ${currentPage === 1 ? "disabled" : ""}`}
          >
            <ChevronLeft size={20} />
          </button>

          <div className="pagination-buttons">
            {renderPaginationButtons()}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`pagination-button prev-next ${currentPage === totalPages ? "disabled" : ""}`}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
}

export default Products;
