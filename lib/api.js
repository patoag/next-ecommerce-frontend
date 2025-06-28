import axios from 'axios'

// Verificar si estamos en modo independiente (sin admin)
const isIndependentMode = !process.env.NEXT_PUBLIC_API_URL || process.env.ENABLE_MOCK_DATA === 'true'

// Configuración base de axios
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor para manejar errores
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message)
    // En modo independiente, devolver datos mock en caso de error
    if (isIndependentMode) {
      console.warn('Modo independiente: usando datos mock debido a error de API')
      return Promise.resolve({ data: [] })
    }
    return Promise.reject(error)
  }
)

// Datos mock para modo independiente
const mockData = {
  products: [
    {
      _id: 'mock-1',
      title: 'Producto Demo 1',
      description: 'Este es un producto de demostración para el modo independiente',
      price: 29.99,
      images: ['/placeholder-product.jpg'],
      category: 'mock-category-1'
    },
    {
      _id: 'mock-2',
      title: 'Producto Demo 2',
      description: 'Otro producto de ejemplo con características destacadas',
      price: 49.99,
      images: ['/placeholder-product.jpg'],
      category: 'mock-category-1'
    },
    {
      _id: 'mock-3',
      title: 'Producto Demo 3',
      description: 'Producto premium con excelente calidad y diseño',
      price: 79.99,
      images: ['/placeholder-product.jpg'],
      category: 'mock-category-2'
    },
    {
      _id: 'mock-4',
      title: 'Producto Demo 4',
      description: 'Solución innovadora para tus necesidades diarias',
      price: 19.99,
      images: ['/placeholder-product.jpg'],
      category: 'mock-category-2'
    }
  ],
  categories: [
    {
      _id: 'mock-category-1',
      name: 'Categoría Demo 1',
      description: 'Primera categoría de demostración'
    },
    {
      _id: 'mock-category-2',
      name: 'Categoría Demo 2',
      description: 'Segunda categoría de demostración'
    }
  ]
}

// Servicios de productos
export const productService = {
  // Obtener todos los productos
  getAll: async () => {
    if (isIndependentMode) {
      console.log('Modo independiente: usando productos mock')
      return mockData.products
    }

    try {
      const response = await api.get('/products')
      return response.data
    } catch (error) {
      console.error('Error fetching products:', error)
      return mockData.products
    }
  },

  // Obtener un producto por ID
  getById: async (id) => {
    if (isIndependentMode) {
      console.log('Modo independiente: buscando producto mock por ID:', id)
      return mockData.products.find(p => p._id === id) || null
    }

    try {
      const response = await api.get(`/products?id=${id}`)
      return response.data
    } catch (error) {
      console.error('Error fetching product:', error)
      return mockData.products.find(p => p._id === id) || null
    }
  },

  // Obtener productos por categoría
  getByCategory: async (categoryId) => {
    if (isIndependentMode) {
      console.log('Modo independiente: filtrando productos mock por categoría:', categoryId)
      return mockData.products.filter(p => p.category === categoryId)
    }

    try {
      const response = await api.get(`/products?category=${categoryId}`)
      return response.data
    } catch (error) {
      console.error('Error fetching products by category:', error)
      return mockData.products.filter(p => p.category === categoryId)
    }
  },
}

// Servicios de categorías
export const categoryService = {
  // Obtener todas las categorías
  getAll: async () => {
    if (isIndependentMode) {
      console.log('Modo independiente: usando categorías mock')
      return mockData.categories
    }

    try {
      const response = await api.get('/categories')
      return response.data
    } catch (error) {
      console.error('Error fetching categories:', error)
      return mockData.categories
    }
  },

  // Obtener una categoría por ID
  getById: async (id) => {
    if (isIndependentMode) {
      console.log('Modo independiente: buscando categoría mock por ID:', id)
      return mockData.categories.find(c => c._id === id) || null
    }

    try {
      const response = await api.get(`/categories?id=${id}`)
      return response.data
    } catch (error) {
      console.error('Error fetching category:', error)
      return mockData.categories.find(c => c._id === id) || null
    }
  },
}

// Utilidades
export const apiUtils = {
  // Construir URL de imagen
  getImageUrl: (imagePath) => {
    if (!imagePath) return '/placeholder-image.jpg'
    if (imagePath.startsWith('http')) return imagePath
    return `${process.env.NEXT_PUBLIC_API_URL}${imagePath}`
  },

  // Formatear precio
  formatPrice: (price) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'USD',
    }).format(price)
  },

  // Manejar errores de API
  handleApiError: (error) => {
    if (error.response) {
      // Error de respuesta del servidor
      return error.response.data?.message || 'Error del servidor'
    } else if (error.request) {
      // Error de red
      return 'Error de conexión. Verifica tu conexión a internet.'
    } else {
      // Error de configuración
      return 'Error inesperado. Inténtalo de nuevo.'
    }
  },
}

export default api
