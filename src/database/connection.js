import Sequelize from "sequelize";
import config from "../config/index.js";

const sequelize = new Sequelize(
  config.DATABASE,
  config.DB_USERNAME,
  config.DB_PASSWORD,
  {
    host: config.DB_HOSTHOST,
    dialect: "postgres",
    port: config.DB_PORT,
    logging: false, //Si true despliega por consola las peticiones que se hagan a la db
  }
);

export default sequelize;
