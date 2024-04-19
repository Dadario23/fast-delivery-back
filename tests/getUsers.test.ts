import request from "supertest";
import { app, server } from "../server";
import db from "../src/config";

interface obj {
  name: string;
  isDisabled: boolean;
  isAdmin: boolean;
}

describe("Test get users", () => {
  let authToken: string = "";
  beforeAll(async () => {
    await db.validate();
  });

  afterAll(async () => {
    await db.close();
    server.close();
  });

  test("api working", async () => {
    const res = await request(app).get("/api");
    expect(res.body).toEqual({ message: "Api funcionando!" });
  });

  test("login simple user", async () => {
    const res = await request(app)
      .post("/api/users/login")
      .send({ email: "luisrobledo@gmail.com", password: "Luis1234" });
    expect(res.body).toEqual({ message: "Usuario logeado con éxito." });
    //guardar cookie generada al logearse como admin
    authToken =
      typeof res.headers["set-cookie"] === "string"
        ? res.headers["set-cookie"]
        : res.headers["set-cookie"][0];
  });

  test("should return 403 if user is not an admin", async () => {
    const res = await request(app).get("/api/users").set("Cookie", authToken);
    expect(res.statusCode).toBe(403);
    expect(res.body).toEqual({ error: "Acceso no autorizado" });
  });

  test("login as admin", async () => {
    const res = await request(app)
      .post("/api/users/login")
      .send({ email: "admin@gmail.com", password: "Admin1234" });
    expect(res.body).toEqual({ message: "Usuario logeado con éxito." });
    //guardar cookie generada al logearse como admin
    authToken =
      typeof res.headers["set-cookie"] === "string"
        ? res.headers["set-cookie"]
        : res.headers["set-cookie"][0];
  });

  test("should return all users if request's user is an admin", async () => {
    const res = await request(app).get("/api/users").set("Cookie", authToken);
    console.log(res.body);
    res.body.forEach((obj: obj) => {
      expect(obj.isAdmin).toBe(false);
    });
  });
});
