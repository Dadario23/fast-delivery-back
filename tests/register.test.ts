import User from "../src/models/User";
import request from "supertest";
import { app, server } from "../server";
import db from "../src/config";

describe("User Controller - Register", () => {
  beforeAll(async () => {
    await db.validate();
    await User.destroy({
      where: {
        email: "john@example.com",
      },
    });
  });

  afterAll(async () => {
    await db.close();
    server.close();
  });

  test("should register a new user", async () => {
    const newUser = {
      name: "John",
      surname: "Doe",
      email: "john@example.com",
      password: "Password123",
      isAdmin: false,
    };

    const response = await request(app)
      .post("/api/users/register")
      .send(newUser);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(
      expect.objectContaining({ name: "John", email: "john@example.com" })
    );
  });

  test("should return 400 if email format is incorrect", async () => {
    const newUser = {
      name: "John",
      surname: "Doe",
      email: "invalid-email",
      password: "password123",
      isAdmin: false,
    };

    const response = await request(app)
      .post("/api/users/register")
      .send(newUser);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: "El email tiene un formato incorrecto.",
    });
  });
});
