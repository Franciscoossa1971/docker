# Usamos la imagen base de Node.js
FROM node:18

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos de configuración
COPY package*.json ./

# Instalar las dependencias de Node.js
RUN npm install

# Copiar el código fuente del proyecto
COPY . .

# Exponer el puerto en el que Angular servirá la aplicación
EXPOSE 4200

# Iniciar el servidor de desarrollo de Angular
CMD ["npm", "start"]
