import { config } from "dotenv";

config();

export default {
  DB_HOST: process.env.DB_HOST,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD || "",
  DATABASE: process.env.DATABASE,
  DB_PORT: process.env.DB_PORT,
  PORT: process.env.PORT || 8080,
  SECRET_KEY: process.env.SECRET_KEY,
  EXPIRATION_TIME: process.env.EXPIRATION_TIME,
  DB_RENDER: process.env.DB_RENDER || "",
};
