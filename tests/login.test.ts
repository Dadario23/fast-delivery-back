import db from "../src/config";
import User from "../src/models/User";
import { describe, expect, beforeEach, test } from "@jest/globals";
import request from "supertest";
import { app, server } from "../server";
import {
  LoginRequestBody,
  CreateUserRequestBody,
} from "../src/types/userTypes.ts";

describe("userController", () => {
  describe("login", () => {
    beforeAll(async () => {
      await db.validate();
    });

    afterAll(async () => {
      await db.close();
      server.close();
    });

    it("should return 400 if there is no", async () => {
      const res = await request(app)
        .post("/api/users/login")
        .send({ password: "password" });

      expect(res.status).toBe(400);
      expect(res.body).toEqual({ message: "Email no proporcionado." });
    });

    it("should return 400 if email format is invalid", async () => {
      const res = await request(app)
        .post("/api/users/login")
        .send({ email: "password" });

      expect(res.status).toBe(400);
      expect(res.body).toEqual({
        message: "El formato de correo electrónico es inválido.",
      });
    });

    it("should return 400 if no password is provided", async () => {
      const res = await request(app)
        .post("/api/users/login")
        .send({ email: "hola@gmail.com" });

      expect(res.status).toBe(400);
      expect(res.body).toEqual({ message: "Contraseña no proporcionada." });
    });

    it("should return 400 if no user was found", async () => {
      const testUser = {
        email: "garmando@gmail.com",
        password: "otroletravaladna",
      };

      const res = await request(app).post("/api/users/login").send(testUser);

      expect(res.status).toBe(400);
      expect(res.body).toEqual({ error: "Usuario no encontrado." });
    });

    it("should return a status 200 if the login was successful", async () => {
      const testUser = {
        email: "hernanduarte@gmail.com",
        password: "Hernan1234",
      };

      const res = await request(app).post("/api/users/login").send(testUser);

      expect(res.status).toBe(200);
      expect(res.body).toEqual({ message: "Usuario logeado con éxito." });
    });
  });
});
