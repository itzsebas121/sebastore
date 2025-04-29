"use client";
import config from "../config";
import { useEffect, useState, lazy, Suspense } from "react";
import "./styles.css";

interface Category {
  Id: number;
  Nombre: string;
}

interface Product {
  ProductoId: number;
  ProductoNombre: string;
  ImagenUrl: string;
  Descripcion: string;
  Precio: number;
  CategoriaNombre: string;
}

interface PaginatedData {
  data: Product[];
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

// Lazy load del grid
const ProductGrid = lazy(() => import("./components/ProductGrid"));

export default function Products() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("Todas");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");

  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);

  // Carga categorías
  useEffect(() => {
    fetch(`${config.apiBaseUrl}/api/categorias`)
      .then((res) => res.json())
      .then((data: Category[]) => {
        setCategories([{ Id: 0, Nombre: "Todas" }, ...data]);
      })
      .catch(() => setCategories([{ Id: 0, Nombre: "Todas" }]));
  }, []);

  // Debounce de búsqueda
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm.trim());
      setCurrentPage(1);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Fetch productos
  const fetchProducts = (page: number) => {
    setLoading(true);

    const params = new URLSearchParams({
      page: page.toString(),
      pageSize: "8",
    });

    if (selectedCategory !== "Todas") {
      params.append("categoria", selectedCategory);
    }
    if (debouncedSearch) {
      params.append("search", debouncedSearch);
    }

    fetch(`${config.apiBaseUrl}/api/productos?${params}`)
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data: PaginatedData) => {
        setProducts(data.data);
        setCurrentPage(data.currentPage);
        setTotalPages(data.totalPages);
      })
      .catch()
      .finally(() => setLoading(false));
  };

  // Re-fetch principal
  useEffect(() => {
    fetchProducts(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, selectedCategory, debouncedSearch]);

  // Cambio de página
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="container">
      {/* --- filtros y búsqueda --- */}
      <div className="filters">
      <input
          type="text"
          placeholder="Buscar por nombre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            setCurrentPage(1);
          }}
        >
          {categories.map((cat) => (
            <option key={cat.Id} value={cat.Nombre}>
              {cat.Nombre}
            </option>
          ))}
        </select>

        
      </div>

      {/* --- aquí sólo renderizamos/lazy‐load el grid --- */}
      <Suspense
        fallback={
          <div className="loading-spinner">
            <div className="spinner" />
          </div>
        }
      >
        <ProductGrid
          products={products}
          loading={loading}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </Suspense>
    </div>
  );
}
