#!/bin/bash

# Script para configurar el frontend en modo independiente

echo "🎨 Configurando Frontend en Modo Independiente..."

# Crear archivo .env.local para modo independiente
cat > .env.local << EOF
# Configuración para Modo Independiente
# El frontend funcionará con datos mock sin necesidad del admin

# API Configuration (vacías para modo independiente)
API_URL=
NEXT_PUBLIC_API_URL=

# Application Configuration
PORT=4000
NODE_ENV=development

# Habilitar datos mock
ENABLE_MOCK_DATA=true
EOF

echo "✅ Archivo .env.local creado para modo independiente"
echo ""
echo "🚀 Para ejecutar el frontend independiente:"
echo ""
echo "1️⃣  Con Docker:"
echo "   docker-compose up --build"
echo ""
echo "2️⃣  Con Node.js local:"
echo "   yarn install"
echo "   yarn dev"
echo ""
echo "📱 El frontend estará disponible en: http://localhost:4000"
echo ""
echo "✨ Características del modo independiente:"
echo "   - 4 productos de demostración"
echo "   - 2 categorías de ejemplo"
echo "   - Interfaz completamente funcional"
echo "   - No requiere backend"
echo ""
echo "🔗 Para conectar con el admin:"
echo "   1. Ejecutar: ./setup-connected.sh"
echo "   2. Asegurarse de que el admin esté ejecutándose"
echo ""
echo "✅ ¡Configuración completada!"
