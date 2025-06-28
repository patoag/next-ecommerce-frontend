#!/bin/bash

# Script para configurar el frontend en modo conectado con admin

echo "🔗 Configurando Frontend en Modo Conectado..."

# Crear archivo .env.local para modo conectado
cat > .env.local << EOF
# Configuración para Modo Conectado
# El frontend se conectará al panel de administración

# API Configuration
# Para desarrollo local (admin ejecutándose localmente):
# API_URL=http://localhost:3000/api
# NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Para Docker (conectándose al admin en Docker):
API_URL=http://ecommerce-admin:3000/api
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Application Configuration
PORT=4000
NODE_ENV=development

# Deshabilitar datos mock
ENABLE_MOCK_DATA=false
EOF

echo "✅ Archivo .env.local creado para modo conectado"
echo ""
echo "🔧 Configuración de red Docker..."

# Crear la red externa si no existe
if ! docker network ls | grep -q "ecommerce-network"; then
    echo "📡 Creando red externa 'ecommerce-network'..."
    docker network create ecommerce-network
    echo "✅ Red 'ecommerce-network' creada exitosamente"
else
    echo "✅ La red 'ecommerce-network' ya existe"
fi

echo ""
echo "🚀 Para ejecutar el sistema conectado:"
echo ""
echo "1️⃣  Ejecutar admin (en otro terminal):"
echo "   cd ../next-ecommerce-admin"
echo "   docker-compose up -d"
echo ""
echo "2️⃣  Ejecutar frontend:"
echo "   docker-compose up --build"
echo ""
echo "📱 Acceso:"
echo "   - Admin: http://localhost:3000"
echo "   - Frontend: http://localhost:4000"
echo ""
echo "✨ Características del modo conectado:"
echo "   - Datos reales desde MongoDB"
echo "   - Sincronización con panel admin"
echo "   - Productos y categorías gestionables"
echo ""
echo "🔄 Para volver al modo independiente:"
echo "   ./setup-independent.sh"
echo ""
echo "✅ ¡Configuración completada!"
