import request from "supertest";
import { app, server } from "../server";
import db from "../src/config";
import Package from "../src/models/Package";

describe("Test create packages", () => {
  let authToken: string = "";
  beforeAll(async () => {
    await db.validate();
    await Package.destroy({
      where: {
        address: "Los Alamos 407, Callao",
        client: "Pepe",
        weight: 5,
      },
    });
  });

  afterAll(async () => {
    await db.close();
    server.close();
  });

  test("api working", async () => {
    const res = await request(app).get("/api");
    expect(res.body).toEqual({ message: "Api funcionando!" });
  });

  test("login admin", async () => {
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

  test("should return 400 if there's no address", async () => {
    const props: object = {
      //address: "Los Alamos 407, Callao",
      client: "Pepe",
      weight: 5,
      date: Date.now(),
    };

    const res = await request(app)
      .post("/api/packages")
      .send(props)
      .set("Cookie", authToken); //usar cookie generada para auteniticar la creacion de un package
    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({
      message: "Por favor, completa todos los campos",
    });
  });

  test("should return 400 if there's no weight", async () => {
    const props: object = {
      address: "Los Alamos 407, Callao",
      client: "Pepe",
      // weight: 5,
      date: Date.now(),
    };

    const res = await request(app)
      .post("/api/packages")
      .send(props)
      .set("Cookie", authToken); //usar cookie generada para auteniticar la creacion de un package
    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({
      message: "Por favor, completa todos los campos",
    });
  });

  test("should return 400 if there's no client", async () => {
    const props: object = {
      address: "Los Alamos 407, Callao",
      // client: "Pepe",
      weight: 5,
      date: Date.now(),
    };

    const res = await request(app)
      .post("/api/packages")
      .send(props)
      .set("Cookie", authToken);
    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({
      message: "Por favor, completa todos los campos",
    });
  });

  test("should return 400 if there's no date", async () => {
    const props: object = {
      address: "Los Alamos 407, Callao",
      client: "Pepe",
      weight: 5,
      // date: Date.now(),
    };

    const res = await request(app)
      .post("/api/packages")
      .send(props)
      .set("Cookie", authToken); //usar cookie generada para auteniticar la creacion de un package
    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({
      message: "Por favor, completa todos los campos",
    });
  });

  test("should return 201 if the package was created", async () => {
    const props: Record<string, any> = {
      address: "Los Alamos 407, Callao",
      client: "Pepe",
      weight: 5,
      date: Date.now(),
    };

    const res = await request(app)
      .post("/api/packages")
      .send(props)
      .set("Cookie", authToken); //usar cookie generada para auteniticar la creacion de un package
    expect(res.statusCode).toBe(201);
    expect(res.body.address).toBe(props.address);
    expect(res.body.client).toBe(props.client);
    expect(res.body.weight).toBe(props.weight);
    expect(res.body.date).toBe(new Date(props.date).toISOString());
  });
});
