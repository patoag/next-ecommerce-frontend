FROM node:18-alpine AS base

# Directorio de trabajo
WORKDIR /app

# Configurar variables de entorno
ENV NODE_ENV=production
ENV API_URL=http://ecommerce-admin:3000/api
ENV NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Instalar dependencias
COPY package.json ./
# Si existe yarn.lock, copiarlo, si no, se generará automáticamente
COPY yarn.loc[k] ./
RUN yarn install

# Copiar el resto de archivos
COPY . .

# Construir la aplicación
RUN yarn build

# Iniciar la aplicación
CMD ["yarn", "start"]

# Exponer el puerto 4000
EXPOSE 4000
