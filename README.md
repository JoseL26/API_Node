# 🚀 Node.js API con Express, Docker y AWS

## 📌 Descripción

Esta es una API desarrollada en Node.js v20 con Express, contenerizada con Docker y desplegada en AWS Lambda con API Gateway mediante Serverless Framework.

El propósito de esta API es proporcionar un endpoint para calcular estadísticas a partir de los datos enviados en la solicitud.

## 🛠️ Tecnologías Utilizadas

- [Node.js]
- [Express.js]
- [Serverless Framework](https://www.serverless.com/framework/docs/getting-started) (Core: 3.40.0, Plugin: 7.2.3, SDK: 4.5.1)
- [AWS Lambda & API Gateway](https://aws.amazon.com/cli/)


### 📦 Instalación y Configuración

Clonar el repositorio

```sh
git clone https://github.com/tu-usuario/tu-repo.git
cd tu-repo
```

Configurar las variables de entorno

```sh
PORT=3000
AWS_ACCESS_KEY_ID=tu-access-key
AWS_SECRET_ACCESS_KEY=tu-secret-key
```

Instalar dependencias

```sh
npm install
```

Ejecutar el servidor localmente

```sh
npm start
```

### 🐳 Uso con Docker

Construir la imagen Docker

```sh
docker build -t mi-api .
```

Ejecutar el contenedor

```sh
docker run -p 3000:3000 mi-api
```

### 🚀 Despliegue en AWS con Serverless

Configurar credenciales de AWS

```sh
serverless config credentials --provider aws --key TU_AWS_ACCESS_KEY --secret TU_AWS_SECRET_KEY
```

Desplegar la API

```sh
serverless deploy
```

# 📡 Endpoint Disponible

| Método | Ruta             | Descripción  |
| :---:  | :---:            | :---:           |
| POST   | /calcular-estadisticas | Calcula estadísticas a partir de los datos enviados en el body de la solicitud.   |
