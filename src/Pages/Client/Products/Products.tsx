import { useEffect, useState, lazy, Suspense } from "react"
import { Filter } from "lucide-react"
import { getProductsService } from "../../../Api/services/ProductService"
import { getCategoriesService } from "../../../Api/services/CategoryService"
import { adaptarProducto } from "../../../Adapters/ProductAdapter"
import { adaptarCategoria } from "../../../Adapters/CategoryAdapter"
import type { Product } from "../../../Types/Product"
import type { Category } from "../../../Types/Category"
import Filters from "./Filters"
import ProductOverlay from "./ProductOverlay"
import LoadingImage from "../../../components/Loading/LaodingImage"
import "./Products.css"

const ProductGrid = lazy(() => import("./ProductGrid"))

export default function Products() {
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(0)
  const [nameFilter, setNameFilter] = useState<string>("")
  const [debouncedNameFilter, setDebouncedNameFilter] = useState<string>("")
  const [minPrice, setMinPrice] = useState<number>(0)
  const [maxPrice, setMaxPrice] = useState<number>(25)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 25])
  const [products, setProducts] = useState<Product[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(1)
  const [totalCount, setTotalCount] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true)
  const [productsLoading, setProductsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [showOverlay, setShowOverlay] = useState<boolean>(false)
  const [showMobileFilters, setShowMobileFilters] = useState<boolean>(false)
  const pageSize = 12

  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true)
      try {
        const [categoriesData] = await Promise.all([getCategoriesService(), fetchProducts(1)])
        const adaptedCategories = categoriesData.map((category: any) => adaptarCategoria(category))
        setCategories(adaptedCategories)
      } catch (err) {
        console.error("Error loading initial data:", err)
        setCategories([])
      } finally {
        setLoading(false)
      }
    }
    loadInitialData()
  }, [])

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedNameFilter(nameFilter.trim())
      setCurrentPage(1)
    }, 500)
    return () => clearTimeout(handler)
  }, [nameFilter])

  useEffect(() => {
    const handler = setTimeout(() => {
      setMinPrice(priceRange[0])
      setMaxPrice(priceRange[1])
      setCurrentPage(1)
    }, 300)
    return () => clearTimeout(handler)
  }, [priceRange])

  const fetchProducts = async (page: number) => {
    setProductsLoading(true)
    setError("")
    try {
      const params = {
        NameFilter: debouncedNameFilter || undefined,
        CategoryId: selectedCategoryId || undefined,
        MinPrice: minPrice || undefined,
        MaxPrice: maxPrice !== 25 ? maxPrice : undefined,
        PageNumber: page,
        PageSize: pageSize,
      }
      const result = await getProductsService(params)
      const adaptedProducts = result.products?.map((product: any) => adaptarProducto(product)) || []
      setProducts(adaptedProducts)
      setTotalCount(result.totalCount || result.total || 0)
      setTotalPages(Math.ceil((result.totalCount || result.total || 0) / pageSize))
      setCurrentPage(page)
    } catch (err) {
      setError("Error al cargar los productos. Por favor, intenta de nuevo.")
      setProducts([])
      setTotalCount(0)
      setTotalPages(1)
    } finally {
      setProductsLoading(false)
    }
  }

  useEffect(() => {
    if (!loading) {
      fetchProducts(currentPage)
    }
  }, [currentPage, selectedCategoryId, debouncedNameFilter, minPrice, maxPrice])

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages || productsLoading) return
    setCurrentPage(page)
    const productsSection = document.querySelector(".products-main")
    if (productsSection) {
      productsSection.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const handleResetFilters = () => {
    setNameFilter("")
    setSelectedCategoryId(0)
    setPriceRange([0, 25])
    setCurrentPage(1)
  }

  const handleProductView = (product: Product) => {
    setSelectedProduct(product)
    setShowOverlay(true)
  }

  const handleCloseOverlay = () => {
    setShowOverlay(false)
    setSelectedProduct(null)
  }

  const toggleMobileFilters = () => {
    setShowMobileFilters(!showMobileFilters)
  }

  if (loading) {
    return (
      <LoadingImage
        text="Cargando productos increíbles..."
        imageSrc="/logo.png"
        size={120}
        fullScreen={true}
      />
    )
  }

  return (
    <div className="products-container">
      {/* Mobile Filter Button */}
      <button className="products-mobile-filter-button" onClick={toggleMobileFilters}>
        <Filter className="products-mobile-filter-icon" />
        Filtros
      </button>

      {/* Mobile Filter Overlay */}
      {showMobileFilters && (
        <div className="products-mobile-filter-overlay" onClick={() => setShowMobileFilters(false)}>
          <div className="products-mobile-filter-panel" onClick={(e) => e.stopPropagation()}>
            <Filters
              nameFilter={nameFilter}
              categories={categories}
              selectedCategoryId={selectedCategoryId}
              priceRange={priceRange}
              onResetFilters={handleResetFilters}
              loading={productsLoading}
              onNameFilterChange={setNameFilter}
              onCategoryIdChange={setSelectedCategoryId}
              onPriceRangeChange={setPriceRange}
              onClose={() => setShowMobileFilters(false)}
              isMobile={true}
            />
          </div>
        </div>
      )}

      <div className="products-layout">
        <aside className="products-sidebar">
          <Filters
            nameFilter={nameFilter}
            categories={categories}
            selectedCategoryId={selectedCategoryId}
            priceRange={priceRange}
            onResetFilters={handleResetFilters}
            loading={productsLoading}
            onNameFilterChange={setNameFilter}
            onCategoryIdChange={setSelectedCategoryId}
            onPriceRangeChange={setPriceRange}
            isMobile={false}
          />
        </aside>

        <main className="products-main">
          {error && (
            <div className="products-error-message">
              <p>{error}</p>
              <button onClick={() => fetchProducts(currentPage)} className="products-retry-button">
                Reintentar
              </button>
            </div>
          )}

          <Suspense fallback={<LoadingImage imageSrc="/logo.png" />}>
            <ProductGrid
              products={products}
              loading={productsLoading}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              totalCount={totalCount}
              onProductView={handleProductView}
            />
          </Suspense>
        </main>
      </div>

      {showOverlay && selectedProduct && <ProductOverlay product={selectedProduct} onClose={handleCloseOverlay} />}
    </div>
  )
}
