# Usa una imagen oficial de Node.js 20 como base
FROM node:20

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos del proyecto al contenedor
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código al contenedor
COPY . .

# Expone el puerto definido en el .env (asegúrate de que está definido)
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["node", "src/index.js"]
