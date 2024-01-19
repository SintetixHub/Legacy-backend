import Sequelize from "sequelize";
import config from "../config/index.js";

let sequelize;

if (process.argv.includes("--renderdb")) {
  sequelize = new Sequelize(config.DB_RENDER, { logging: false });
} else {
  sequelize = new Sequelize(
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
}

export default sequelize;
