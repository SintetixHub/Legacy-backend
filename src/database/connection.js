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
    logging: false, //If it is true, display on the console each query made to the database. (true by default)
  }
);

export default sequelize;
