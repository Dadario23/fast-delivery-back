import express, { Application, Request, Response, NextFunction } from "express";
import { config } from "dotenv";
import db from "./src/config/index";
const { Package, User } = require("./src/models/index");
const cookieParser = require("cookie-parser");
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

config();

// Configuración de CORS
const corsOrigin = process.env.CORS_ORIGIN;
const serverPort = process.env.SERVER_PORT || 3001;

app.use(cookieParser());
app.use(express.json());
app.use(morgan("dev"));
app.use(
  cors({
    origin: corsOrigin,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
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

db.sync({ force: false })
  .then(() => {
    app.listen(serverPort, () =>
      console.log(`Servidor levantado en el puerto ${serverPort}`)
    );
  })
  .catch((err: Error) => console.error(err));

export { app };
