import Layout from '@/components/Layout'
import { FiHeart, FiShield, FiTruck, FiUsers, FiAward, FiGlobe } from 'react-icons/fi'

export default function About() {
    const values = [
        {
            icon: FiHeart,
            title: 'Pasión por la Calidad',
            description: 'Seleccionamos cuidadosamente cada producto para garantizar la mejor experiencia a nuestros clientes.'
        },
        {
            icon: FiShield,
            title: 'Confianza y Seguridad',
            description: 'Tu seguridad es nuestra prioridad. Ofrecemos transacciones seguras y protección total de datos.'
        },
        {
            icon: FiTruck,
            title: 'Entrega Rápida',
            description: 'Envíos rápidos y seguros a todo el país. Tu pedido llegará en el tiempo prometido.'
        },
        {
            icon: FiUsers,
            title: 'Atención Personalizada',
            description: 'Nuestro equipo está siempre disponible para brindarte la mejor atención y resolver tus dudas.'
        }
    ]

    const stats = [
        { number: '10,000+', label: 'Clientes Satisfechos' },
        { number: '5,000+', label: 'Productos Vendidos' },
        { number: '99%', label: 'Satisfacción del Cliente' },
        { number: '24/7', label: 'Soporte Disponible' }
    ]

    const team = [
        {
            name: 'Ana García',
            role: 'Fundadora & CEO',
            description: 'Visionaria con más de 10 años de experiencia en e-commerce y retail.',
            image: '/team-1.jpg'
        },
        {
            name: 'Carlos Rodríguez',
            role: 'Director de Tecnología',
            description: 'Experto en desarrollo web y sistemas, garantiza la mejor experiencia digital.',
            image: '/team-2.jpg'
        },
        {
            name: 'María López',
            role: 'Gerente de Productos',
            description: 'Especialista en selección de productos y tendencias del mercado.',
            image: '/team-3.jpg'
        }
    ]

    return (
        <Layout>
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-primary-600 to-purple-600 text-white py-20">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-5xl font-bold mb-6">
                            Sobre Nosotros
                        </h1>
                        <p className="text-xl text-primary-100 mb-8">
                            Somos una empresa comprometida con ofrecer los mejores productos 
                            y la experiencia de compra más satisfactoria para nuestros clientes.
                        </p>
                        <div className="flex items-center justify-center space-x-8 text-primary-100">
                            <div className="flex items-center">
                                <FiAward className="w-6 h-6 mr-2" />
                                <span>Calidad Garantizada</span>
                            </div>
                            <div className="flex items-center">
                                <FiGlobe className="w-6 h-6 mr-2" />
                                <span>Envíos Nacionales</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Nuestra Historia */}
            <section className="py-20 bg-white">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">
                                Nuestra Historia
                            </h2>
                            <div className="space-y-4 text-gray-600 leading-relaxed">
                                <p>
                                    Fundada en 2020, nuestra tienda nació con la visión de democratizar 
                                    el acceso a productos de calidad a través del comercio electrónico. 
                                    Comenzamos como un pequeño emprendimiento familiar y hemos crecido 
                                    hasta convertirnos en una de las tiendas online más confiables del país.
                                </p>
                                <p>
                                    Nuestro compromiso siempre ha sido simple: ofrecer productos excepcionales, 
                                    precios justos y un servicio al cliente incomparable. Cada día trabajamos 
                                    para superar las expectativas de nuestros clientes y construir relaciones 
                                    duraderas basadas en la confianza.
                                </p>
                                <p>
                                    Hoy, con más de 10,000 clientes satisfechos, seguimos innovando y 
                                    expandiendo nuestro catálogo para ofrecerte siempre lo mejor del mercado.
                                </p>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="bg-gradient-to-br from-primary-100 to-purple-100 rounded-2xl p-8 h-96 flex items-center justify-center">
                                <div className="text-center">
                                    <div className="text-6xl mb-4">🏪</div>
                                    <h3 className="text-xl font-semibold text-gray-800">
                                        Desde 2020 contigo
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Nuestros Valores */}
            <section className="py-20 bg-gray-50">
                <div className="container-custom">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            Nuestros Valores
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Los principios que guían cada decisión que tomamos y cada servicio que ofrecemos
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <div key={index} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                                <div className="bg-primary-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                                    <value.icon className="w-6 h-6 text-primary-600" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                                    {value.title}
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    {value.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Estadísticas */}
            <section className="py-20 bg-white">
                <div className="container-custom">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            Nuestros Logros
                        </h2>
                        <p className="text-xl text-gray-600">
                            Números que reflejan nuestro compromiso y crecimiento
                        </p>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-4xl font-bold text-primary-600 mb-2">
                                    {stat.number}
                                </div>
                                <div className="text-gray-600 font-medium">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Nuestro Equipo */}
            <section className="py-20 bg-gray-50">
                <div className="container-custom">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            Conoce Nuestro Equipo
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Las personas apasionadas que hacen posible tu experiencia de compra excepcional
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {team.map((member, index) => (
                            <div key={index} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                                <div className="bg-gradient-to-br from-primary-100 to-purple-100 h-48 flex items-center justify-center">
                                    <div className="text-6xl">👤</div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                                        {member.name}
                                    </h3>
                                    <p className="text-primary-600 font-medium mb-3">
                                        {member.role}
                                    </p>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        {member.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Llamada a la acción */}
            <section className="py-20 bg-gradient-to-r from-primary-600 to-purple-600 text-white">
                <div className="container-custom text-center">
                    <h2 className="text-3xl font-bold mb-4">
                        ¿Listo para comenzar tu experiencia de compra?
                    </h2>
                    <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
                        Únete a miles de clientes satisfechos y descubre por qué somos la opción preferida
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="/products" className="btn-primary bg-white text-primary-600 hover:bg-gray-100">
                            Explorar Productos
                        </a>
                        <a href="/contact" className="btn-outline border-white text-white hover:bg-white hover:text-primary-600">
                            Contáctanos
                        </a>
                    </div>
                </div>
            </section>
        </Layout>
    )
}
