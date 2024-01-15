import Sequelize from "sequelize";
import config from "../config/index.js";

import "../models/user.js";
import "../models/blog.js";

const sequelize = new Sequelize(
  config.DATABASE,
  config.DB_USERNAME,
  config.DB_PASSWORD,
  {
    host: config.DB_HOSTHOST,
    dialect: "postgres",
    port: config.DB_PORT,
  }
);

export default sequelize;
