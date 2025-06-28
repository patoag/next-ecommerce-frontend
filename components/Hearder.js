import Link from "next/link";
import { useState } from "react";
import { FiShoppingCart, FiMenu, FiX, FiSearch } from "react-icons/fi";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [cartCount] = useState(0); // TODO: Conectar con estado del carrito

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="container-custom">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="bg-gradient-to-r from-primary-600 to-purple-600 p-2 rounded-lg">
                            <FiShoppingCart className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-xl font-bold text-gradient">
                            Mi Tienda
                        </span>
                    </Link>

                    {/* Navegación Desktop */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <Link href="/" className="text-gray-700 hover:text-primary-600 transition-colors">
                            Inicio
                        </Link>
                        <Link href="/products" className="text-gray-700 hover:text-primary-600 transition-colors">
                            Productos
                        </Link>
                        <Link href="/categories" className="text-gray-700 hover:text-primary-600 transition-colors">
                            Categorías
                        </Link>
                        <Link href="/about" className="text-gray-700 hover:text-primary-600 transition-colors">
                            Nosotros
                        </Link>
                    </nav>

                    {/* Acciones */}
                    <div className="flex items-center space-x-4">
                        {/* Búsqueda */}
                        <button
                            className="hidden md:flex items-center text-gray-700 hover:text-primary-600 transition-colors"
                            title="Buscar productos"
                        >
                            <FiSearch className="w-5 h-5" />
                        </button>

                        {/* Carrito */}
                        <Link
                            href="/cart"
                            className="relative flex items-center text-gray-700 hover:text-primary-600 transition-colors"
                            title="Ver carrito de compras"
                        >
                            <FiShoppingCart className="w-6 h-6" />
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        {/* Menú móvil */}
                        <button
                            className="md:hidden text-gray-700"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Menú móvil */}
                {isMenuOpen && (
                    <div className="md:hidden border-t border-gray-200 py-4">
                        <nav className="flex flex-col space-y-4">
                            <Link href="/" className="text-gray-700 hover:text-primary-600 transition-colors">
                                Inicio
                            </Link>
                            <Link href="/products" className="text-gray-700 hover:text-primary-600 transition-colors">
                                Productos
                            </Link>
                            <Link href="/categories" className="text-gray-700 hover:text-primary-600 transition-colors">
                                Categorías
                            </Link>
                            <Link href="/about" className="text-gray-700 hover:text-primary-600 transition-colors">
                                Nosotros
                            </Link>
                            <div className="pt-4 border-t border-gray-200">
                                <button className="flex items-center text-gray-700 hover:text-primary-600 transition-colors">
                                    <FiSearch className="w-5 h-5 mr-2" />
                                    Buscar
                                </button>
                            </div>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    )
}