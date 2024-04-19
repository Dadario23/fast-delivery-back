import { Sequelize } from "sequelize";
require("dotenv").config();

const db = new Sequelize(
  process.env.POSTGRES_DB,
  process.env.POSTGRES_USER,
  process.env.POSTGRES_PASSWORD,
  {
    //host: "host.docker.internal",
    // host: "192.168.1.33",
    //host: "172.17.0.1",
    // host: "127.0.0.1",
    host: "postgres",
    dialect: "postgres",
    port: 5432,
    logging: false,
  }
);

db.authenticate()
  .then(() => {
    console.log("Conexión exitosa a la base de datos", db.config.database);
  })
  .catch((err: Error) => {
    console.error("No se pudo conectar a la base de datos", err);
  });

export default db;
