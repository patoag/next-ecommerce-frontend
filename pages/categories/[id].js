import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '@/components/Layout'
import ProductCard from '@/components/ProductCard'
import LoadingSpinner from '@/components/LoadingSpinner'
import { categoryService, productService } from '@/lib/api'
import Link from 'next/link'
import { FiArrowLeft, FiGrid, FiList, FiFilter } from 'react-icons/fi'

export default function CategoryDetail() {
    const router = useRouter()
    const { id } = router.query
    const [category, setCategory] = useState(null)
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [viewMode, setViewMode] = useState('grid')
    const [sortBy, setSortBy] = useState('name')

    useEffect(() => {
        if (id) {
            loadData()
        }
    }, [id])

    async function loadData() {
        try {
            setLoading(true)
            const [categoryData, productsData] = await Promise.all([
                categoryService.getById(id),
                productService.getByCategory(id)
            ])
            setCategory(categoryData)
            setProducts(productsData)
        } catch (error) {
            console.error('Error loading data:', error)
        } finally {
            setLoading(false)
        }
    }

    function sortProducts(products, sortBy) {
        const sorted = [...products]
        switch (sortBy) {
            case 'name':
                return sorted.sort((a, b) => a.title.localeCompare(b.title))
            case 'price-low':
                return sorted.sort((a, b) => a.price - b.price)
            case 'price-high':
                return sorted.sort((a, b) => b.price - a.price)
            default:
                return sorted
        }
    }

    const sortedProducts = sortProducts(products, sortBy)

    if (loading) {
        return (
            <Layout>
                <div className="container-custom py-8">
                    <LoadingSpinner size="xl" className="py-20" />
                </div>
            </Layout>
        )
    }

    if (!category) {
        return (
            <Layout>
                <div className="container-custom py-8">
                    <div className="text-center py-20">
                        <h1 className="text-2xl font-bold text-gray-900 mb-4">
                            Categoría no encontrada
                        </h1>
                        <p className="text-gray-600 mb-6">
                            La categoría que buscas no existe o ha sido eliminada
                        </p>
                        <Link href="/categories" className="btn-primary">
                            Ver todas las categorías
                        </Link>
                    </div>
                </div>
            </Layout>
        )
    }

    return (
        <Layout>
            <div className="container-custom py-8">
                {/* Breadcrumb */}
                <nav className="mb-8">
                    <Link href="/categories" className="flex items-center text-primary-600 hover:text-primary-700 mb-4">
                        <FiArrowLeft className="w-4 h-4 mr-2" />
                        Volver a categorías
                    </Link>
                </nav>

                {/* Header de categoría */}
                <div className="bg-gradient-to-r from-primary-50 to-purple-50 rounded-2xl p-8 mb-8">
                    <div className="max-w-3xl">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            {category.name}
                        </h1>
                        {category.description && (
                            <p className="text-xl text-gray-600 mb-6">
                                {category.description}
                            </p>
                        )}
                        <div className="flex items-center text-sm text-gray-500">
                            <span className="bg-white px-3 py-1 rounded-full shadow-sm">
                                {products.length} productos disponibles
                            </span>
                        </div>
                    </div>
                </div>

                {/* Controles de vista y ordenamiento */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                        <div className="flex items-center gap-4">
                            <FiFilter className="w-5 h-5 text-gray-400" />
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="input-field min-w-[200px]"
                            >
                                <option value="name">Ordenar por nombre</option>
                                <option value="price-low">Precio: menor a mayor</option>
                                <option value="price-high">Precio: mayor a menor</option>
                            </select>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600 mr-2">Vista:</span>
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

                {/* Lista de productos */}
                {products.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="text-gray-400 mb-4">
                            <FiGrid className="w-16 h-16 mx-auto" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            No hay productos en esta categoría
                        </h3>
                        <p className="text-gray-600 mb-6">
                            Los productos aparecerán aquí cuando estén disponibles
                        </p>
                        <Link href="/categories" className="btn-primary">
                            Explorar otras categorías
                        </Link>
                    </div>
                ) : (
                    <div className={
                        viewMode === 'grid' 
                            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                            : 'space-y-4'
                    }>
                        {sortedProducts.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                )}

                {/* Llamada a la acción */}
                {products.length > 0 && (
                    <div className="mt-16 text-center">
                        <div className="bg-gray-50 rounded-2xl p-8">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                ¿Te gustó esta categoría?
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Explora más productos en otras categorías o descubre nuestras ofertas especiales
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link href="/categories" className="btn-primary">
                                    Ver más categorías
                                </Link>
                                <Link href="/products" className="btn-outline">
                                    Todos los productos
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    )
}
