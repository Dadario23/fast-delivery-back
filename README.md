# Fast Delivery

## Descripción

Fast Delivery es un sistema desarrollado en Next.js con TypeScript, diseñado para una empresa de logística de última milla. La empresa gestiona cientos de repartidores, cada uno recibiendo aproximadamente 10 paquetes al inicio del día. El sistema permite monitorear la operación de los repartidores, asignar o reasignar paquetes, e intervenir en caso de ser necesario para editar un envío, modificar la dirección o reasignarle el envío a otro repartidor.

## Instalación

1. Clone el repositorio: `git clone https://github.com/tu_usuario/fast-delivery.git`
2. Acceda al directorio del proyecto: `cd fast-delivery`
3. Instale las dependencias: `npm install`

## Cómo levantar el proyecto

1. Configure las opciones de entrega en el archivo de configuración.
2. Ejecute la aplicación: `npm start`

## Estructura del Proyecto

- `/.husky`: Configuración de Husky para hooks de Git.
- `/controllers`: Controladores que manejan la lógica de negocio.
- `/middlewares`: Middlewares utilizados en la aplicación.
- `/models`: Modelos de datos de la aplicación.
- `/routes`: Definición de las rutas de la aplicación.
- `/utils`: Utilidades y funciones auxiliares.

## Dependencias Principales

- cors: Middleware que permite o bloquea solicitudes HTTP en función de la configuración.
- express: Marco de aplicación web para Node.js.
- morgan: Middleware de registro de solicitudes HTTP para Express.

## Dependencias de desarrollo

- eslint: Herramienta de linting para mantener un código consistente.
- husky: Utilizado para configurar hooks de Git.
- lint-staged: Ejecuta scripts en archivos staged durante el proceso de commit.
- nodemon: Monitor de cambios en el código para reiniciar automáticamente la aplicación.
- standard-version: Automatiza la versión y la generación de registros de cambios.
- typescript: Lenguaje de programación que añade tipado estático a JavaScript.
- docker: Herramienta para la creación y ejecución de contenedores.
- docker-compose: Herramienta para definir y ejecutar aplicaciones Docker multi-contenedor.

## Contribución

¡Contribuciones son bienvenidas!

## Licencia

Este proyecto está bajo la Licencia MIT.

## Créditos

- Autores: Dario Andrada, Hernán Duarte, Valentin Guardia y Luis Robledo.

## Estado del Proyecto

Actualmente en desarrollo activo. Versión 1.0.0 lanzada el [2024-01-12].


## Rutas API
Las rutas de la API y sus respectivos controladores se encuentran en la carpeta `routes` y `controllers`, respectivamente.


### Rutas de Users (`/users`)

#### Admin
- `GET /`: Obtener todos los usuarios de la aplicación.
- `GET /:id`: Obtener los detalles de un usuario específico.

#### Todos los usuarios
- `POST /logout`: Borrar el token almacenado en la cookie y redirigir al login.
- `GET /me`: Obtener ciertos detalles del usuario con el que se esta logeado.

#### No autenticado
- `POST /register`: Registrar un nuevo usuario.
- `POST /login`: Iniciar sesión.
- `POST /forgot-password`: Solicitar restablecimiento de contraseña.
- `POST /reset-password`: Restablecer contraseña.

### Rutas de Packages (`/packages`)

#### Admin
- `POST /`: Crear paquetes.
- `DELETE /:id`: Borrar un paquete específico.

#### Todos los usuarios
- `GET /`: Obtener todos los paquetes.
- `GET /:id`: Obtener un paquete en específico.
- `GET /userPackages/:id`: Obtener los paquetes asociados a un usuario.
- `PUT /assign/:id`: Elegir un paquete en específico que es asociado al usuario actual.
- `PUT /removeUserId/:id`: Eliminar del paquete el id del usuario al que le pertenece.
- `PUT /updateToOngoing/:id`: Cambiar el estado de un paquete de "PENDIENTE" a "EN CURSO".



