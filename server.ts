import express, { Application, Request, Response, NextFunction } from "express";
//import db from "../fast-Delivery-Back/src/config/index.ts";
import db from "./src/config/index";
import { config } from "dotenv";
const { Package, User } = require("./src/models/index");
const cookieParser = require("cookie-parser");
//swagger
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerSpec = {
  definition: {
    openapi: "3.0.0",
    info: { title: "Fast Delivery API" },
    version: "1.0.0",
    servers: [{ url: "http://localhost:3001" }],
  },
  apis: ["./src/routes/*.ts"],
};

const app: Application = express();
const routes = require("./src/routes/index").default;
const morgan = require("morgan");
const cors = require("cors");
const corsOrigin = process.env.CORS_ORIGIN || "http://localhost";
const serverPort = process.env.SERVER_PORT || 3001;
const server = app.listen(serverPort, () =>
  console.log(`Servidor levantado en el puerto ${serverPort}`)
);
config();

app.use(cookieParser());
app.use(express.json());
app.use(morgan("dev"));
app.use(cors({ origin: corsOrigin, credentials: true }));
app.use("/api", routes);
app.use(
  "/v1/api/doc",
  swaggerUI.serve,
  swaggerUI.setup(swaggerJsDoc(swaggerSpec))
);
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).send(err.message);
});

// Configuración CORS
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://fast-delivery-front-opal.vercel.app/"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

db.sync({ force: false })
  .then(() => {
    server;
  })
  .catch((err: Error) => console.error(err));

export { app, server };
