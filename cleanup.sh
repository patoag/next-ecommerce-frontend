#!/bin/bash

# Script para limpiar contenedores del frontend

echo "🧹 Limpiando contenedores del Frontend..."

# Detener contenedores si están ejecutándose
echo "⏹️  Deteniendo contenedores..."
docker-compose down 2>/dev/null || true

# Remover contenedores específicos si existen
echo "🗑️  Removiendo contenedores existentes..."
docker container rm -f ecommerce-frontend 2>/dev/null || true

# Limpiar imágenes no utilizadas (opcional)
if [ "$1" = "--all" ] || [ "$1" = "-a" ]; then
    echo "🖼️  Limpiando imágenes no utilizadas..."
    docker image prune -f
fi

echo ""
echo "✅ Limpieza completada"
echo ""
echo "🚀 Para ejecutar el frontend nuevamente:"
echo "   docker-compose up --build"
echo ""
echo "📋 Opciones de limpieza:"
echo "   ./cleanup.sh       # Limpiar solo contenedores"
echo "   ./cleanup.sh --all # Limpieza completa + imágenes"
echo ""
