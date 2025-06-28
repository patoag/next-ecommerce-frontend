import Link from 'next/link'
import Image from 'next/image'
import { FiShoppingCart, FiHeart } from 'react-icons/fi'
import { apiUtils } from '@/lib/api'

export default function ProductCard({ product }) {
    if (!product) return null

    const { _id, title, price, images, description } = product
    const imageUrl = images && images.length > 0 ? images[0] : '/placeholder-product.jpg'

    return (
        <div className="card-hover group shadow-glow-hover">
            {/* Imagen del producto */}
            <div className="relative aspect-square mb-4 overflow-hidden rounded-xl bg-gradient-to-br from-gray-100 to-gray-200">
                <Image
                    src={imageUrl}
                    alt={title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                
                {/* Botón de favoritos */}
                <button className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110 transform translate-y-2 group-hover:translate-y-0">
                    <FiHeart className="w-4 h-4 text-gray-600 hover:text-red-500 transition-colors duration-200" />
                </button>
            </div>

            {/* Información del producto */}
            <div className="space-y-2">
                <Link href={`/products/${_id}`}>
                    <h3 className="font-medium text-gray-900 hover:text-primary-600 transition-colors line-clamp-2">
                        {title}
                    </h3>
                </Link>
                
                {description && (
                    <p className="text-sm text-gray-500 line-clamp-2">
                        {description}
                    </p>
                )}
                
                <div className="flex items-center justify-between pt-3">
                    <span className="text-xl font-bold text-gradient">
                        {apiUtils.formatPrice(price)}
                    </span>

                    <button className="btn-primary flex items-center space-x-2 text-sm py-2 px-4 shadow-glow-hover">
                        <FiShoppingCart className="w-4 h-4" />
                        <span>Agregar</span>
                    </button>
                </div>
            </div>
        </div>
    )
}
