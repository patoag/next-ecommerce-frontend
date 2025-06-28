# 🛒 E-commerce Frontend

Frontend moderno para tienda online construido con Next.js, Tailwind CSS. **Funciona independiente con datos mock o conectado al panel de administración.**

## 🚀 Características

- **Diseño Responsive**: Optimizado para móviles, tablets y desktop
- **Interfaz Moderna**: Diseño elegante con Tailwind CSS
- **Modo Dual**: Funciona independiente (datos mock) o conectado al admin
- **Búsqueda y Filtros**: Sistema completo de búsqueda y filtrado de productos
- **Carrito de Compras**: Funcionalidad de carrito (en desarrollo)
- **Optimización SEO**: Meta tags y estructura optimizada
- **Docker Ready**: Configuración completa para contenedores

## 🛠️ Tecnologías

- **Next.js 13.4** - Framework de React
- **Tailwind CSS 3.3** - Framework de CSS
- **React Icons** - Iconografía
- **Axios** - Cliente HTTP para APIs
- **Docker** - Contenedorización

## 📁 Estructura del Proyecto

```
next-ecommerce-frontend/
├── components/           # Componentes reutilizables
│   ├── Layout.js        # Layout principal
│   ├── Hearder.js       # Header con navegación
│   ├── Footer.js        # Footer con información
│   ├── ProductCard.js   # Tarjeta de producto
│   └── LoadingSpinner.js # Spinner de carga
├── lib/                 # Utilidades y servicios
│   └── api.js          # Servicios de API
├── pages/              # Páginas de la aplicación
│   ├── index.js        # Página de inicio
│   ├── products/       # Páginas de productos
│   │   ├── index.js    # Lista de productos
│   │   └── [id].js     # Detalle de producto
│   ├── _app.js         # Configuración de la app
│   └── _document.js    # Configuración del documento
├── styles/             # Estilos globales
│   └── globals.css     # Estilos con Tailwind
├── public/             # Archivos estáticos
├── Dockerfile          # Configuración de Docker
├── docker-compose.yml  # Orquestación de contenedores
└── README.md          # Este archivo
```

## 🔧 Instalación y Configuración

### Prerrequisitos

- Node.js 18+
- Yarn o npm
- Docker (opcional)
- Panel de administración ejecutándose

### Instalación Local

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd next-ecommerce-frontend
```

2. **Instalar dependencias**
```bash
yarn install
# o
npm install
```

3. **Configurar variables de entorno**
```bash
cp .env.example .env.local
```

Editar `.env.local`:
```env
API_URL=http://localhost:3000/api
NEXT_PUBLIC_API_URL=http://localhost:3000/api
PORT=4000
```

4. **Ejecutar en desarrollo**
```bash
yarn dev
# o
npm run dev
```

La aplicación estará disponible en `http://localhost:4000`

### Instalación con Docker

#### Modo Independiente (sin admin)
```bash
# Clonar solo este repositorio
git clone <frontend-repo-url>
cd next-ecommerce-frontend

# Configurar para modo independiente
cp .env.example .env.local
# Editar .env.local y comentar las URLs de API o establecer ENABLE_MOCK_DATA=true

# Ejecutar con Docker
docker-compose up --build

# Acceder en http://localhost:4000 (usará datos mock)
```

#### Modo Conectado (con admin)
```bash
# 1. Crear red externa (solo una vez)
docker network create ecommerce-network

# 2. Ejecutar admin primero
cd ../next-ecommerce-admin
docker-compose up -d

# 3. Ejecutar frontend
cd ../next-ecommerce-frontend
docker-compose up --build

# Acceder en http://localhost:4000 (conectado al admin)
```

## 🔗 Conexión con el Panel Admin

### Configuración de Red

El frontend se conecta al panel admin a través de una red Docker compartida:

```yaml
networks:
  ecommerce-network:
    name: ecommerce-network
    external: true
```

### Modos de Funcionamiento

#### Modo Independiente
- ✅ Datos mock integrados
- ✅ Funciona sin backend
- ✅ Perfecto para demos y desarrollo frontend
- ✅ 4 productos y 2 categorías de ejemplo

#### Modo Conectado
- ✅ Consume APIs del panel admin
- ✅ Datos reales desde MongoDB
- ✅ Sincronización completa

### APIs Consumidas (Modo Conectado)

- **GET /api/products** - Lista de productos
- **GET /api/products?id={id}** - Detalle de producto
- **GET /api/categories** - Lista de categorías
- **GET /api/categories?id={id}** - Detalle de categoría

### Servicios Implementados

```javascript
// Obtener todos los productos
const products = await productService.getAll()

// Obtener producto por ID
const product = await productService.getById(productId)

// Obtener productos por categoría
const products = await productService.getByCategory(categoryId)

// Obtener todas las categorías
const categories = await categoryService.getAll()
```

## 🎨 Diseño y Componentes

### Sistema de Colores

```css
primary: {
  50: '#eff6ff',
  600: '#2563eb',
  700: '#1d4ed8',
}
```

### Componentes Principales

- **Layout**: Estructura base con header y footer
- **ProductCard**: Tarjeta de producto con imagen, título, precio
- **LoadingSpinner**: Indicador de carga
- **Header**: Navegación principal con búsqueda y carrito
- **Footer**: Información de contacto y enlaces

### Clases Utilitarias

```css
.btn-primary     # Botón principal
.btn-secondary   # Botón secundario
.btn-outline     # Botón con borde
.card           # Tarjeta básica
.card-hover     # Tarjeta con efecto hover
.input-field    # Campo de entrada
.container-custom # Contenedor responsivo
```

## 📱 Páginas Implementadas

### Página de Inicio (`/`)
- Hero section con llamada a la acción
- Productos destacados
- Categorías principales
- Características del servicio

### Lista de Productos (`/products`)
- Grid/lista de productos
- Búsqueda por texto
- Filtro por categoría
- Paginación (pendiente)

### Detalle de Producto (`/products/[id]`)
- Galería de imágenes
- Información detallada
- Selector de cantidad
- Botón agregar al carrito

## 🚀 Despliegue

### Desarrollo
```bash
yarn dev
```

### Producción
```bash
yarn build
yarn start
```

### Docker
```bash
docker-compose up --build
```

## 🔄 Flujo de Desarrollo

1. **Iniciar el panel admin**
```bash
cd ../next-ecommerce-admin
docker-compose up -d
```

2. **Iniciar el frontend**
```bash
cd next-ecommerce-frontend
yarn dev
```

3. **Verificar conexión**
- Admin: `http://localhost:3000`
- Frontend: `http://localhost:4000`

## 📋 Próximas Funcionalidades

- [ ] Sistema de carrito de compras
- [ ] Proceso de checkout
- [ ] Autenticación de usuarios
- [ ] Historial de pedidos
- [ ] Sistema de reseñas
- [ ] Wishlist/Favoritos
- [ ] Búsqueda avanzada
- [ ] Filtros por precio
- [ ] Paginación

## 🤝 Contribución

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 📞 Soporte

Para soporte y preguntas:
- Email: support@mitienda.com
- Issues: [GitHub Issues](https://github.com/tu-usuario/ecommerce-frontend/issues)

---

**Desarrollado con ❤️ para crear la mejor experiencia de compra online**
