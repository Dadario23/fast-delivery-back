import express from "express";
import packagesController from "../controllers/packagesControllers.ts";
import auth from "../middlewares/auth.ts";
import isAdminMiddleware from "../middlewares/isAdminMiddleware.ts";

const router = express.Router();

router.post("/", auth, isAdminMiddleware, packagesController.createPackages); //OK //YA APLICADA EN FRONT
/**
 * @swagger
 * /api/packages:
 *   post:
 *     summary: Crear un nuevo paquete
 *     description: Crea un nuevo paquete en el sistema.
 *     tags: [Package]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               address:
 *                 type: string
 *                 example: "123 Main St, City, Country"
 *               client:
 *                 type: string
 *                 example: "John Doe"
 *               weight:
 *                 type: number
 *                 example: 20
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2024-02-26T03:00:00.000Z"
 *     responses:
 *       201:
 *         description: Paquete creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 address:
 *                   type: string
 *                   example: "123 Main St, City, Country"
 *                 client:
 *                   type: string
 *                   example: "John Doe"
 *                 weight:
 *                   type: number
 *                   example: 5.2
 *                 date:
 *                   type: string
 *                   format: date
 *                   example: "2024-02-26T03:00:00.000Z"
 *       400:
 *         description: Error en los datos de entrada
 *       500:
 *         description: Error interno del servidor
 */

router.get("/", auth, packagesController.getAllPackages); //OK //SE MUESTRAN EN VISTA OBTENER PAQUETES Y PAQUETES DEL ADMIN.
/**
 * @swagger
 * /api/packages:
 *   get:
 *     summary: Obtener todos los paquetes
 *     description: Obtiene una lista de todos los paquetes en el sistema.
 *     tags: [Package]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de paquetes obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   address:
 *                     type: string
 *                   client:
 *                     type: string
 *                   weight:
 *                     type: number
 *                   date:
 *                     type: string
 *                     format: date
 *       500:
 *         description: Error interno del servidor
 */

router.get("/userPackages", auth, packagesController.getUserPackages); //OK// YA APLICADA EN FRONT

/**
 * @swagger
 * /api/packages/{id}:
 *   get:
 *     summary: Obtener paquete por ID
 *     description: Obtiene un paquete por su ID.
 *     tags: [Package]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del paquete a obtener.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Paquete obtenido correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 address:
 *                   type: string
 *                 client:
 *                   type: string
 *                 weight:
 *                   type: number
 *                 date:
 *                   type: string
 *                   format: date
 *       404:
 *         description: Paquete no encontrado
 *       500:
 *         description: Error interno del servidor
 */

router.get("/:id", auth, packagesController.getPackageById); //OK
/**
 * @swagger
 * /api/packages/userPackages/{id}:
 *   get:
 *     summary: Obtener paquetes de usuario por ID
 *     description: Obtiene los paquetes asociados a un usuario por su ID.
 *     tags: [Package]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario cuyos paquetes se desean obtener.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Paquetes del usuario obtenidos correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   address:
 *                     type: string
 *                   client:
 *                     type: string
 *                   weight:
 *                     type: number
 *                   date:
 *                     type: string
 *                     format: date
 *       500:
 *         description: Error interno del servidor
 */

router.put("/assign/:id", auth, packagesController.assignPackage); //OK // YA APLICADO EN FRONT// SE ASIGNA EL ID DEL USUARIO LOGEADO
/**
 * @swagger
 * /api/packages/assign/{id}:
 *   put:
 *     summary: Asignar paquete a usuario por ID
 *     description: Asigna un paquete a un usuario por su ID.
 *     tags: [Package]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del paquete a asignar.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Paquete asignado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Paquete asignado exitosamente"
 *       404:
 *         description: Paquete no encontrado
 *       500:
 *         description: Error interno del servidor
 */

//AL CAMPO USERID DE CADA PAQUETE QUE SELECCIONES
router.put("/removeUserId/:id", auth, packagesController.removeUserFromPackage); //OK // LE REMUEVE AL PAQUETE EL ID DEL USUARIO AL QUE LE PERTENECE
//PEDIDO HECHO EN SERVICES DEL FRONT, FALTA APLICAR EN EL COMPONENTE
/**
 * @swagger
 * /api/packages/removeUserId/{id}:
 *   put:
 *     summary: Eliminar usuario de paquete por ID
 *     description: Elimina el usuario asignado a un paquete por su ID.
 *     tags: [Package]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del paquete del cual eliminar el usuario.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario removido exitosamente del paquete
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Usuario removido exitosamente del paquete"
 *       400:
 *         description: El paquete no tiene un usuario asignado
 *       404:
 *         description: Paquete no encontrado
 *       500:
 *         description: Error interno del servidor
 */

router.put(
  "/updateToOngoing/:id",
  auth,
  packagesController.updatePackageStatusToOngoing
); //OK// YA APLICADA EN FRONT
router.put(
  "/updateToDelivered/:id",
  auth,
  packagesController.updatePackageStatusToDelivered
); //OK// YA APLICADA EN FRONT
router.put(
  "/updateToCancelled/:id",
  auth,
  packagesController.updatePackageStatusToCancelled
); //OK// YA APLICADA EN FRONT

router.delete(
  "/:id",
  auth,
  isAdminMiddleware,
  packagesController.deletePackage
); //OK
/**
 * @swagger
 * /api/packages/{id}:
 *   delete:
 *     summary: Eliminar paquete por ID
 *     description: Elimina un paquete por su ID.
 *     tags: [Package]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del paquete a eliminar.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Paquete eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Paquete eliminado exitosamente"
 *       404:
 *         description: Paquete no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get(
  "/userPackagesById/:id",
  auth,
  packagesController.getUserPackagesById
);
//pendiente ruta para actualizar estado del paquete desde el admin

router.post(
  "/stats",
  /* auth,
  isAdminMiddleware, */
  packagesController.packagesStats
);
export default router;
