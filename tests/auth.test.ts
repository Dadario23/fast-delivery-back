import request from "supertest";
import { app, server } from "../server";
import { describe, expect, it } from "@jest/globals";
import auth from "../src/middlewares/auth";
import jwt from "jsonwebtoken";
import db from "../src/config";

describe("auth", () => {
  beforeAll(async () => {
    await db.validate();
  });

  afterAll(async () => {
    await db.close();
    server.close();
  });

  describe("me", () => {
    it("should return 401 if user id is not found in token", async () => {
      const response = await request(app).get("/api/users/me").send();

      expect(response.status).toBe(401);
      expect(response.body).toEqual({
        message: "No token, authorization denied",
      });
    });

    it("should return 400 if token is not valid", async () => {
      const nonExistentUserId = "nonExistentUserId";
      const response = await request(app)
        .get("/api/users/me")
        .set("Cookie", `token=${nonExistentUserId}`);

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ message: "Token is not valid" });
    });

    it("should authenticate user with valid token", async () => {
      const validUserId = 1;
      const payload = {
        user: {
          email: "luisrobledo@gmail.com",
          password: "Luis1234",
          id: validUserId,
          isAdmin: false,
        },
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET || "");

      const response = await request(app)
        .get("/api/users/me")
        .set("Cookie", `token=${token}`);

      expect(response.status).toBe(200);

      expect(response.body).toEqual({
        email: "luisrobledo@gmail.com",
        id: validUserId,
        isAdmin: false,
        name: "Luis",
        surname: "Robledo",
      });
    });
  });
});
