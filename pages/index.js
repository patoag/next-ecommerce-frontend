import { useEffect, useState } from 'react'
import Layout from '@/components/Layout'
import ProductCard from '@/components/ProductCard'
import LoadingSpinner from '@/components/LoadingSpinner'
import { productService, categoryService } from '@/lib/api'
import Link from 'next/link'
import { FiArrowRight, FiTruck, FiShield, FiRefreshCw } from 'react-icons/fi'

export default function Home() {
	const [featuredProducts, setFeaturedProducts] = useState([])
	const [categories, setCategories] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		loadData()
	}, [])

	async function loadData() {
		try {
			setLoading(true)
			const [productsData, categoriesData] = await Promise.all([
				productService.getAll(),
				categoryService.getAll()
			])

			// Tomar los primeros 8 productos como destacados
			setFeaturedProducts(productsData.slice(0, 8))
			setCategories(categoriesData.slice(0, 6))
		} catch (error) {
			console.error('Error loading data:', error)
		} finally {
			setLoading(false)
		}
	}

	return (
		<Layout>
			{/* Hero Section */}
			<section className="relative bg-gradient-to-br from-primary-600 via-purple-600 to-pink-600 text-white overflow-hidden">
				{/* Elementos decorativos */}
				<div className="absolute inset-0 bg-black/10"></div>
				<div className="absolute top-0 left-0 w-full h-full">
					<div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
					<div className="absolute bottom-20 right-10 w-48 h-48 bg-white/5 rounded-full blur-2xl"></div>
				</div>

				<div className="container-custom py-24 relative z-10">
					<div className="max-w-4xl">
						<h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
							Descubre los
							<span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-primary-100">
								mejores productos
							</span>
						</h1>
						<p className="text-xl mb-10 text-primary-100 max-w-2xl leading-relaxed">
							Encuentra todo lo que necesitas en nuestra tienda online.
							Calidad garantizada y envío rápido a todo el país.
						</p>
						<div className="flex flex-col sm:flex-row gap-6">
							<Link href="/products" className="btn-primary bg-white text-primary-600 hover:bg-gray-100 text-lg px-8 py-4 shadow-glow">
								Ver Productos
								<FiArrowRight className="ml-2 w-5 h-5" />
							</Link>
							<Link href="/categories" className="btn-outline border-white text-white hover:bg-white hover:text-primary-600 text-lg px-8 py-4">
								Explorar Categorías
							</Link>
						</div>
					</div>
				</div>
			</section>

			{/* Características */}
			<section className="py-20 gradient-bg">
				<div className="container-custom">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						<div className="text-center group">
							<div className="bg-gradient-to-br from-primary-500 to-primary-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-glow group-hover:shadow-glow-hover transition-all duration-300 transform group-hover:-translate-y-2">
								<FiTruck className="w-10 h-10 text-white" />
							</div>
							<h3 className="text-xl font-bold mb-3 text-gray-800">Envío Gratis</h3>
							<p className="text-gray-600 leading-relaxed">En compras mayores a $100</p>
						</div>
						<div className="text-center group">
							<div className="bg-gradient-to-br from-purple-500 to-purple-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-glow group-hover:shadow-glow-hover transition-all duration-300 transform group-hover:-translate-y-2">
								<FiShield className="w-10 h-10 text-white" />
							</div>
							<h3 className="text-xl font-bold mb-3 text-gray-800">Compra Segura</h3>
							<p className="text-gray-600 leading-relaxed">Protección total en tus pagos</p>
						</div>
						<div className="text-center group">
							<div className="bg-gradient-to-br from-pink-500 to-pink-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-glow group-hover:shadow-glow-hover transition-all duration-300 transform group-hover:-translate-y-2">
								<FiRefreshCw className="w-10 h-10 text-white" />
							</div>
							<h3 className="text-xl font-bold mb-3 text-gray-800">Devoluciones</h3>
							<p className="text-gray-600 leading-relaxed">30 días para cambios</p>
						</div>
					</div>
				</div>
			</section>

			{/* Productos Destacados */}
			<section className="py-16">
				<div className="container-custom">
					<div className="flex justify-between items-center mb-8">
						<h2 className="text-3xl font-bold text-gray-900">Productos Destacados</h2>
						<Link href="/products" className="text-primary-600 hover:text-primary-700 font-medium flex items-center">
							Ver todos
							<FiArrowRight className="ml-1 w-4 h-4" />
						</Link>
					</div>

					{loading ? (
						<LoadingSpinner size="xl" className="py-20" />
					) : (
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
							{featuredProducts.map((product) => (
								<ProductCard key={product._id} product={product} />
							))}
						</div>
					)}
				</div>
			</section>

			{/* Categorías */}
			<section className="py-16 bg-gray-50">
				<div className="container-custom">
					<div className="text-center mb-12">
						<h2 className="text-3xl font-bold text-gray-900 mb-4">Explora por Categorías</h2>
						<p className="text-gray-600 max-w-2xl mx-auto">
							Encuentra exactamente lo que buscas navegando por nuestras categorías organizadas
						</p>
					</div>

					{loading ? (
						<LoadingSpinner size="xl" className="py-20" />
					) : (
						<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
							{categories.map((category) => (
								<Link
									key={category._id}
									href={`/categories/${category._id}`}
									className="card-hover text-center group"
								>
									<div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-primary-200 transition-colors">
										<svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
										</svg>
									</div>
									<h3 className="font-medium text-gray-900 group-hover:text-primary-600 transition-colors">
										{category.name}
									</h3>
								</Link>
							))}
						</div>
					)}
				</div>
			</section>
		</Layout>
	)
}
