import Link from "next/link";
import { FiHeart, FiShoppingCart } from "react-icons/fi";

export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-100">
            <div className="container-custom py-12">
                {/* Sección principal */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Logo y descripción */}
                    <div className="md:col-span-2">
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="bg-gradient-to-r from-primary-600 to-purple-600 p-2 rounded-lg">
                                <FiShoppingCart className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold text-gray-800">Mi Tienda</span>
                        </div>
                        <p className="text-gray-600 max-w-md leading-relaxed">
                            Tu tienda online de confianza. Productos de calidad,
                            precios justos y la mejor experiencia de compra.
                        </p>
                    </div>

                    {/* Enlaces */}
                    <div>
                        <h3 className="font-semibold text-gray-800 mb-4">Navegación</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/" className="text-gray-600 hover:text-primary-600 transition-colors text-sm">
                                    Inicio
                                </Link>
                            </li>
                            <li>
                                <Link href="/products" className="text-gray-600 hover:text-primary-600 transition-colors text-sm">
                                    Productos
                                </Link>
                            </li>
                            <li>
                                <Link href="/categories" className="text-gray-600 hover:text-primary-600 transition-colors text-sm">
                                    Categorías
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="text-gray-600 hover:text-primary-600 transition-colors text-sm">
                                    Sobre Nosotros
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Soporte */}
                    <div>
                        <h3 className="font-semibold text-gray-800 mb-4">Soporte</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/help" className="text-gray-600 hover:text-primary-600 transition-colors text-sm">
                                    Centro de Ayuda
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-gray-600 hover:text-primary-600 transition-colors text-sm">
                                    Contacto
                                </Link>
                            </li>
                            <li>
                                <Link href="/shipping" className="text-gray-600 hover:text-primary-600 transition-colors text-sm">
                                    Envíos
                                </Link>
                            </li>
                            <li>
                                <Link href="/returns" className="text-gray-600 hover:text-primary-600 transition-colors text-sm">
                                    Devoluciones
                                </Link>
                            </li>
                        </ul>
                    </div>

                </div>

                {/* Línea divisoria */}
                <div className="border-t border-gray-100 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        {/* Copyright */}
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <span>© 2024 Mi Tienda.</span>
                            <span>Hecho con</span>
                            <FiHeart className="w-4 h-4 text-red-500" />
                            <span>para ti</span>
                        </div>

                        {/* Enlaces legales */}
                        <div className="flex space-x-6">
                            <Link href="/privacy" className="text-sm text-gray-500 hover:text-primary-600 transition-colors">
                                Privacidad
                            </Link>
                            <Link href="/terms" className="text-sm text-gray-500 hover:text-primary-600 transition-colors">
                                Términos
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
