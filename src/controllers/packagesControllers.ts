import { Request, Response } from "express";
import Package from "../models/Package.ts";
import validate from "../utils/validations";
import { PackageData } from "../types/packagesTypes.ts";
import User from "../models/User.ts";
import { PackageStatus } from "../models/Package.ts";
import Sequelize from "sequelize";

interface CustomRequest extends Request {
  user?: {
    id: number;
  };
}

interface CustomRequest2 extends Request {
  id?: string;
}

const packagesControllers = {
  createPackages: async (req: Request, res: Response) => {
    try {
      const { address, client, weight, date }: PackageData = req.body;
      if (!address || !client || !weight || !date)
        return res
          .status(400)
          .json({ message: "Por favor, completa todos los campos" });
      const newPackage = await Package.create({
        address,
        client,
        weight,
        date,
      });
      return res.status(201).json(newPackage);
    } catch (error) {
      console.error("Error al crear el paquete:", error);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  },
  getAllPackages: async (req: Request, res: Response) => {
    try {
      const packages = await Package.findAll({
        order: [["date", "ASC"]],
        limit: 20,
        include: [
          {
            model: User,
            attributes: ["id", "name", "email", "isDisabled", "profileImage"],
          },
        ],
      });
      return res.json(packages);
    } catch (error) {
      console.error("Error al obtener los paquetes:", error);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  },
  getPackageById: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const packageId = parseInt(id);
      if (isNaN(packageId)) {
        return res
          .status(400)
          .json({ error: "El ID del paquete no es válido" });
      }
      const packageItem = await Package.findByPk(packageId);
      if (!packageItem)
        return res.status(404).json({ message: "Paquete no encontrado" });
      return res.json(packageItem);
    } catch (error) {
      console.error("Error al obtener el paquete:", error);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  },
  getUserPackages: async (req: CustomRequest, res: Response) => {
    const userId = req.user.id;
    try {
      const userPackages = await Package.findAll({ where: { userId } });
      return res.status(200).json(userPackages);
    } catch (error) {
      console.error("Error al obtener los paquetes del usuario:", error);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  },
  getUserPackagesById: async (req: CustomRequest, res: Response) => {
    const userId = req.params.id;
    try {
      const userPackages = await Package.findAll({ where: { userId } });
      return res.status(200).json(userPackages);
    } catch (error) {
      console.error("Error al obtener los paquetes del usuario:", error);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  },
  deletePackage: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const packageId = parseInt(id);
      const packageItem = await Package.findByPk(packageId);
      if (!packageItem)
        return res.status(404).json({ message: "Paquete no encontrado" });
      await packageItem.destroy();
      return res.json({ message: "Paquete eliminado exitosamente" });
    } catch (error) {
      console.error("Error al eliminar el paquete:", error);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  },
  // assignPackage: async (req: CustomRequest, res: Response) => {
  //   const { id } = req.params;
  //   const userId = req.user.id;
  //   try {
  //     const packageItem = await Package.findByPk(id);
  //     if (!packageItem)
  //       return res.status(404).json({ message: "Paquete no encontrado" });
  //     packageItem.userId = userId;
  //     await packageItem.save();
  //     return res.status(200).json({ message: "Paquete asignado exitosamente" });
  //   } catch (error) {
  //     console.error("Error al asignar paquete:", error);
  //     return res.status(500).json({ error: "Error interno del servidor" });
  //   }
  // },
  assignPackage: async (req: CustomRequest, res: Response) => {
    const { id } = req.params;
    const userId = req.user.id;
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      if (user.isDisabled) {
        return res.status(403).json({ message: "No se permite asignar paquetes a usuarios deshabilitados" });
      }
      const packageItem = await Package.findByPk(id);
      if (!packageItem) {
        return res.status(404).json({ message: "Paquete no encontrado" });
      }
      packageItem.userId = userId;
      await packageItem.save();
      return res.status(200).json({ message: "Paquete asignado exitosamente" });
    } catch (error) {
      console.error("Error al asignar paquete:", error);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  },

  removeUserFromPackage: async (req: CustomRequest, res: Response) => {
    const { id } = req.params;
    try {
      const packageItem = await Package.findByPk(id);
      if (!packageItem) {
        return res.status(404).json({ message: "Paquete no encontrado" });
      }
      if (!packageItem.userId) {
        return res
          .status(400)
          .json({ message: "El paquete no tiene un usuario asignado" });
      }
      packageItem.userId = null;
      packageItem.status = PackageStatus.PENDING;
      await packageItem.save();
      return res
        .status(200)
        .json({ message: "Usuario removido exitosamente del paquete" });
    } catch (error) {
      console.error("Error al remover usuario del paquete:", error);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  },
  updatePackageStatusToOngoing: async (req: CustomRequest, res: Response) => {
    const { id } = req.params;
    try {
      const packageItem = await Package.findByPk(id);
      if (!packageItem)
        return res.status(404).json({ message: "Paquete no encontrado" });
      if (packageItem.status !== "PENDIENTE")
        return res
          .status(400)
          .json({ message: "El paquete no está pendiente" });
      packageItem.status = PackageStatus.ONGOING;
      await packageItem.save();
      return res
        .status(200)
        .json({ message: "Estado del paquete actualizado correctamente" });
    } catch (error) {
      console.error("Error al actualizar el estado del paquete:", error);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  },
  updatePackageStatusToDelivered: async (req: CustomRequest, res: Response) => {
    const { id } = req.params;
    try {
      const packageItem = await Package.findByPk(id);
      if (!packageItem)
        return res.status(404).json({ message: "Paquete no encontrado" });
      if (packageItem.status !== "EN CURSO")
        return res.status(400).json({ message: "El paquete no está en curso" });
      packageItem.status = PackageStatus.DELIVERED;
      await packageItem.save();
      return res
        .status(200)
        .json({ message: "Estado del paquete actualizado correctamente" });
    } catch (error) {
      console.error("Error al actualizar el estado del paquete:", error);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  },
  updatePackageStatusToCancelled: async (req: CustomRequest, res: Response) => {
    const { id } = req.params;
    try {
      const packageItem = await Package.findByPk(id);
      if (!packageItem)
        return res.status(404).json({ message: "Paquete no encontrado" });
      //if (packageItem.status !== "EN CURSO")
      //  return res.status(400).json({ message: "El paquete no está en curso" });
      packageItem.status = PackageStatus.CANCELLED;
      await packageItem.save();
      return res
        .status(200)
        .json({ message: "Estado del paquete actualizado correctamente" });
    } catch (error) {
      console.error("Error al actualizar el estado del paquete:", error);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  },
  packagesStats: async (req: CustomRequest, res: Response) => {
    const { date } = req.body;
    try {
      const formattedDate = new Date(date);
      const createdPackagesPromise = Package.findAll({
        where: {
          [Sequelize.Op.and]: [
            Sequelize.where(
              Sequelize.fn("date", Sequelize.col("createdAt")),
              "=",
              formattedDate
            ),
          ],
        },
      });

      const createdPackages = await Promise.race([createdPackagesPromise]);
      res.json(createdPackages);
    } catch (error) {
      console.error("Error en packagesStats:", error);
      res.status(500).json({
        message: "Ocurrió un error al obtener las estadísticas de paquetes.",
      });
    }
  },
};

export default packagesControllers;
