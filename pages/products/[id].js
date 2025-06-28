import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '@/components/Layout'
import LoadingSpinner from '@/components/LoadingSpinner'
import { productService, apiUtils } from '@/lib/api'
import Image from 'next/image'
import { FiShoppingCart, FiHeart, FiMinus, FiPlus, FiArrowLeft } from 'react-icons/fi'
import Link from 'next/link'

export default function ProductDetail() {
    const router = useRouter()
    const { id } = router.query
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [selectedImage, setSelectedImage] = useState(0)
    const [quantity, setQuantity] = useState(1)

    useEffect(() => {
        if (id) {
            loadProduct()
        }
    }, [id])

    async function loadProduct() {
        try {
            setLoading(true)
            const productData = await productService.getById(id)
            setProduct(productData)
        } catch (error) {
            console.error('Error loading product:', error)
        } finally {
            setLoading(false)
        }
    }

    function handleQuantityChange(change) {
        const newQuantity = quantity + change
        if (newQuantity >= 1) {
            setQuantity(newQuantity)
        }
    }

    function handleAddToCart() {
        // TODO: Implementar lógica del carrito
        console.log('Agregar al carrito:', { product, quantity })
        alert(`${product.title} agregado al carrito (${quantity} unidades)`)
    }

    if (loading) {
        return (
            <Layout>
                <div className="container-custom py-8">
                    <LoadingSpinner size="xl" className="py-20" />
                </div>
            </Layout>
        )
    }

    if (!product) {
        return (
            <Layout>
                <div className="container-custom py-8">
                    <div className="text-center py-20">
                        <h1 className="text-2xl font-bold text-gray-900 mb-4">
                            Producto no encontrado
                        </h1>
                        <p className="text-gray-600 mb-6">
                            El producto que buscas no existe o ha sido eliminado
                        </p>
                        <Link href="/products" className="btn-primary">
                            Ver todos los productos
                        </Link>
                    </div>
                </div>
            </Layout>
        )
    }

    const images = product.images || ['/placeholder-product.jpg']

    return (
        <Layout>
            <div className="container-custom py-8">
                {/* Breadcrumb */}
                <nav className="mb-8">
                    <Link href="/products" className="flex items-center text-primary-600 hover:text-primary-700">
                        <FiArrowLeft className="w-4 h-4 mr-2" />
                        Volver a productos
                    </Link>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Galería de imágenes */}
                    <div className="space-y-4">
                        {/* Imagen principal */}
                        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                            <Image
                                src={images[selectedImage]}
                                alt={product.title}
                                width={600}
                                height={600}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Miniaturas */}
                        {images.length > 1 && (
                            <div className="flex space-x-2 overflow-x-auto">
                                {images.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                                            selectedImage === index 
                                                ? 'border-primary-600' 
                                                : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                    >
                                        <Image
                                            src={image}
                                            alt={`${product.title} ${index + 1}`}
                                            width={80}
                                            height={80}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Información del producto */}
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                {product.title}
                            </h1>
                            <p className="text-3xl font-bold text-primary-600">
                                {apiUtils.formatPrice(product.price)}
                            </p>
                        </div>

                        {product.description && (
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    Descripción
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {product.description}
                                </p>
                            </div>
                        )}

                        {/* Propiedades del producto */}
                        {product.properties && Object.keys(product.properties).length > 0 && (
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                                    Especificaciones
                                </h3>
                                <div className="space-y-2">
                                    {Object.entries(product.properties).map(([key, value]) => (
                                        <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                                            <span className="font-medium text-gray-700 capitalize">
                                                {key}:
                                            </span>
                                            <span className="text-gray-600">{value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Cantidad y agregar al carrito */}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Cantidad
                                </label>
                                <div className="flex items-center space-x-3">
                                    <button
                                        onClick={() => handleQuantityChange(-1)}
                                        className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                                        disabled={quantity <= 1}
                                    >
                                        <FiMinus className="w-4 h-4" />
                                    </button>
                                    <span className="text-lg font-medium w-12 text-center">
                                        {quantity}
                                    </span>
                                    <button
                                        onClick={() => handleQuantityChange(1)}
                                        className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                                    >
                                        <FiPlus className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            <div className="flex space-x-4">
                                <button
                                    onClick={handleAddToCart}
                                    className="btn-primary flex-1 flex items-center justify-center space-x-2"
                                >
                                    <FiShoppingCart className="w-5 h-5" />
                                    <span>Agregar al carrito</span>
                                </button>
                                <button className="btn-outline p-3">
                                    <FiHeart className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Información adicional */}
                        <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                            <div className="flex items-center text-sm text-gray-600">
                                <span className="font-medium">✓</span>
                                <span className="ml-2">Envío gratis en compras mayores a $100</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                                <span className="font-medium">✓</span>
                                <span className="ml-2">Garantía de 30 días</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                                <span className="font-medium">✓</span>
                                <span className="ml-2">Pago seguro</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
