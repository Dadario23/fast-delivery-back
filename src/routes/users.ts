import express from "express";
import userController from "../controllers/userControllers.ts";
import auth from "../middlewares/auth.ts";
import isAdminMiddleware from "../middlewares/isAdminMiddleware.ts";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: User
 *     description: Endpoints relacionados con la gestión de usuarios
 *   - name: Package
 *     description: Endpoints relacionados con la gestión de paquetes
 */

router.post("/register", userController.register); //OK
/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     description: Registra un nuevo usuario en el sistema.
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Dario
 *               surname:
 *                 type: string
 *                 example: Andrada
 *               email:
 *                 type: string
 *                 example: "dandrada23@gmail.com"
 *               password:
 *                 type: string
 *                 example : "Pass1234"
 *               isAdmin:
 *                 type: boolean
 *
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: Dario
 *                 surname:
 *                   type: string
 *                   example: Andrada
 *                 email:
 *                    type: string
 *                    example: "dandrada23@gmail.com"
 *                 isAdmin:
 *                   type: boolean
 *       400:
 *         description: Error en los datos de entrada
 *       500:
 *         description: Error interno del servidor
 */
router.post("/login", userController.login); //OK
/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Iniciar sesión
 *     description: Inicia sesión en el sistema con un correo electrónico y contraseña.
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "dandrada23@gmail.com"
 *               password:
 *                 type: string
 *                 example: "Pass1234"
 *     responses:
 *       200:
 *         description: Usuario logeado con éxito
 *       400:
 *         description: Error en los datos de entrada
 *       401:
 *         description: Credenciales de inicio de sesión inválidas
 *       500:
 *         description: Error interno del servidor
 */
router.post("/forgot-password", userController.mailForgotPassword); //OK
/**
 * @swagger
 * /api/users/forgot-password:
 *   post:
 *     summary: Olvidé mi contraseña
 *     description: Envia un correo electrónico con instrucciones para restablecer la contraseña.
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: dandrada23@gmail.com
 *     responses:
 *       200:
 *         description: Correo electrónico enviado con éxito
 *       400:
 *         description: Error en los datos de entrada
 *       404:
 *         description: Usuario no registrado
 *       500:
 *         description: Error interno del servidor
 */

router.post("/reset-password", userController.mailResetPassword);

/**
 * @swagger
 * /api/users/reset-password:
 *   post:
 *     summary: Resetear contraseña
 *     description: Restablece la contraseña utilizando un token de restablecimiento y una nueva contraseña.
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 example: "EnterTokenHere"  # Aquí puedes usar el token generado como ejemplo
 *               newPassword:
 *                 type: string
 *                 example: "Yournewpass1234"
 *     responses:
 *       200:
 *         description: Contraseña actualizada con éxito
 *       400:
 *         description: Error en los datos de entrada o token inválido
 *       500:
 *         description: Error interno del servidor
 */
router.post("/logout", auth, userController.logout); //OK
/**
 * @swagger
 * /api/users/logout:
 *   post:
 *     summary: Cerrar sesión
 *     description: Cierra la sesión actual del usuario.
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: Sesión cerrada correctamente
 *       400:
 *         description: No hay sesión iniciada
 *       500:
 *         description: Error interno del servidor
 */
router.post("/affidavit", userController.affidavit);
router.get("/me", auth, userController.me); //OK
/**
 * @swagger
 * /api/users/me:
 *   get:
 *     summary: Obtener información del usuario actual
 *     description: Obtiene la información del usuario actualmente autenticado.
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Información del usuario obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 surname:
 *                   type: string
 *                 email:
 *                   type: string
 *                 isAdmin:
 *                   type: boolean
 *       400:
 *         description: ID no encontrado en el token
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get("/", auth, isAdminMiddleware, userController.getAllUsers); //OK
/**
 * @swagger
 * /api/users/:
 *   get:
 *     summary: Obtener todos los usuarios
 *     description: Obtiene una lista de todos los usuarios no administradores.
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   isDisabled:
 *                     type: boolean
 *                   isAdmin:
 *                     type: boolean
 *       500:
 *         description: Error interno del servidor
 */
router.get("/:id", auth, isAdminMiddleware, userController.getUserById); //OK
/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Obtener usuario por ID
 *     description: Obtiene un usuario por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario a obtener.
 *         schema:
 *           type: string
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Usuario obtenido correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: "Pass1234"
 *                 isDisabled:
 *                   type: boolean
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.delete("/:id", userController.deleteUserById); //OK
/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Eliminar usuario por ID
 *     description: Elimina un usuario por su ID.
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario a eliminar.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario eliminado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "usuario eliminado exitosamente"
 *       400:
 *         description: ID de usuario inválido
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor
 */

router.get("/profile-image", auth, userController.getProfileImage);
router.post("/profile-image", auth, userController.postProfileImage);
router.put("/profile-image", auth, userController.deleteProfileImage);

router.put("/update", auth, userController.updateUser);
router.put("/state", auth, isAdminMiddleware, userController.updateState);
router.post(
  "/stats/delivery",
  auth,
  isAdminMiddleware,
  userController.deliveryStats
);

export default router;
