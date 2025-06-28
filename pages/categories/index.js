import { useEffect, useState } from 'react'
import Layout from '@/components/Layout'
import LoadingSpinner from '@/components/LoadingSpinner'
import { categoryService, productService } from '@/lib/api'
import Link from 'next/link'
import { FiArrowRight, FiPackage } from 'react-icons/fi'

export default function Categories() {
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)
    const [productCounts, setProductCounts] = useState({})

    useEffect(() => {
        loadData()
    }, [])

    async function loadData() {
        try {
            setLoading(true)
            const [categoriesData, productsData] = await Promise.all([
                categoryService.getAll(),
                productService.getAll()
            ])
            
            setCategories(categoriesData)
            
            // Contar productos por categoría
            const counts = {}
            categoriesData.forEach(category => {
                counts[category._id] = productsData.filter(
                    product => product.category === category._id
                ).length
            })
            setProductCounts(counts)
        } catch (error) {
            console.error('Error loading data:', error)
        } finally {
            setLoading(false)
        }
    }

    const getCategoryIcon = (index) => {
        const icons = [
            '🛍️', '👕', '📱', '🏠', '🎮', '📚', 
            '🍔', '🚗', '💄', '🏃‍♂️', '🎵', '🌱'
        ]
        return icons[index % icons.length]
    }

    return (
        <Layout>
            <div className="container-custom py-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Nuestras Categorías
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Explora nuestra amplia selección de productos organizados por categorías. 
                        Encuentra exactamente lo que buscas de manera fácil y rápida.
                    </p>
                </div>

                {loading ? (
                    <LoadingSpinner size="xl" className="py-20" />
                ) : categories.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="text-gray-400 mb-4">
                            <FiPackage className="w-16 h-16 mx-auto" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            No hay categorías disponibles
                        </h3>
                        <p className="text-gray-600 mb-6">
                            Las categorías aparecerán aquí cuando estén disponibles
                        </p>
                        <Link href="/products" className="btn-primary">
                            Ver todos los productos
                        </Link>
                    </div>
                ) : (
                    <>
                        {/* Grid de categorías */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
                            {categories.map((category, index) => (
                                <Link
                                    key={category._id}
                                    href={`/categories/${category._id}`}
                                    className="group"
                                >
                                    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group-hover:border-primary-200">
                                        {/* Icono de categoría */}
                                        <div className="bg-gradient-to-br from-primary-50 to-purple-50 p-8 text-center group-hover:from-primary-100 group-hover:to-purple-100 transition-colors duration-300">
                                            <div className="text-6xl mb-4">
                                                {getCategoryIcon(index)}
                                            </div>
                                            <div className="bg-white rounded-full px-4 py-2 inline-flex items-center text-sm text-gray-600 shadow-sm">
                                                <FiPackage className="w-4 h-4 mr-2" />
                                                {productCounts[category._id] || 0} productos
                                            </div>
                                        </div>
                                        
                                        {/* Información de categoría */}
                                        <div className="p-6">
                                            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors duration-200">
                                                {category.name}
                                            </h3>
                                            {category.description && (
                                                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                                    {category.description}
                                                </p>
                                            )}
                                            <div className="flex items-center text-primary-600 font-medium text-sm group-hover:text-primary-700">
                                                Explorar categoría
                                                <FiArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* Sección de llamada a la acción */}
                        <div className="bg-gradient-to-r from-primary-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white text-center">
                            <h2 className="text-3xl font-bold mb-4">
                                ¿No encuentras lo que buscas?
                            </h2>
                            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
                                Explora todos nuestros productos o usa nuestro buscador para encontrar 
                                exactamente lo que necesitas.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link href="/products" className="btn-primary bg-white text-primary-600 hover:bg-gray-100">
                                    Ver todos los productos
                                </Link>
                                <Link href="/products" className="btn-outline border-white text-white hover:bg-white hover:text-primary-600">
                                    Buscar productos
                                </Link>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </Layout>
    )
}
