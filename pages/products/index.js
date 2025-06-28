import { useEffect, useState } from 'react'
import Layout from '@/components/Layout'
import ProductCard from '@/components/ProductCard'
import LoadingSpinner from '@/components/LoadingSpinner'
import { productService, categoryService } from '@/lib/api'
import { FiFilter, FiSearch, FiGrid, FiList } from 'react-icons/fi'

export default function Products() {
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('')
    const [viewMode, setViewMode] = useState('grid')
    const [showFilters, setShowFilters] = useState(false)

    useEffect(() => {
        loadData()
    }, [])

    useEffect(() => {
        filterProducts()
    }, [searchTerm, selectedCategory])

    async function loadData() {
        try {
            setLoading(true)
            const [productsData, categoriesData] = await Promise.all([
                productService.getAll(),
                categoryService.getAll()
            ])
            setProducts(productsData)
            setCategories(categoriesData)
        } catch (error) {
            console.error('Error loading data:', error)
        } finally {
            setLoading(false)
        }
    }

    async function filterProducts() {
        try {
            setLoading(true)
            let filteredProducts = []

            if (selectedCategory) {
                filteredProducts = await productService.getByCategory(selectedCategory)
            } else {
                filteredProducts = await productService.getAll()
            }

            // Filtrar por término de búsqueda
            if (searchTerm) {
                filteredProducts = filteredProducts.filter(product =>
                    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    product.description?.toLowerCase().includes(searchTerm.toLowerCase())
                )
            }

            setProducts(filteredProducts)
        } catch (error) {
            console.error('Error filtering products:', error)
        } finally {
            setLoading(false)
        }
    }

    function clearFilters() {
        setSearchTerm('')
        setSelectedCategory('')
    }

    return (
        <Layout>
            <div className="container-custom py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Productos</h1>
                    <p className="text-gray-600">
                        Descubre nuestra amplia selección de productos de alta calidad
                    </p>
                </div>

                {/* Filtros y búsqueda */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                        {/* Búsqueda */}
                        <div className="relative flex-1 max-w-md">
                            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Buscar productos..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="input-field pl-10"
                            />
                        </div>

                        {/* Filtros */}
                        <div className="flex items-center gap-4">
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="input-field min-w-[200px]"
                            >
                                <option value="">Todas las categorías</option>
                                {categories.map((category) => (
                                    <option key={category._id} value={category._id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>

                            <button
                                onClick={clearFilters}
                                className="btn-secondary"
                            >
                                Limpiar
                            </button>

                            {/* Vista */}
                            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`p-2 ${viewMode === 'grid' ? 'bg-primary-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                                >
                                    <FiGrid className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`p-2 ${viewMode === 'list' ? 'bg-primary-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                                >
                                    <FiList className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Resultados */}
                <div className="mb-4 flex justify-between items-center">
                    <p className="text-gray-600">
                        {loading ? 'Cargando...' : `${products.length} productos encontrados`}
                    </p>
                </div>

                {/* Lista de productos */}
                {loading ? (
                    <LoadingSpinner size="xl" className="py-20" />
                ) : products.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="text-gray-400 mb-4">
                            <FiSearch className="w-16 h-16 mx-auto" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            No se encontraron productos
                        </h3>
                        <p className="text-gray-600 mb-6">
                            Intenta ajustar tus filtros o términos de búsqueda
                        </p>
                        <button onClick={clearFilters} className="btn-primary">
                            Limpiar filtros
                        </button>
                    </div>
                ) : (
                    <div className={
                        viewMode === 'grid' 
                            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                            : 'space-y-4'
                    }>
                        {products.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </Layout>
    )
}
