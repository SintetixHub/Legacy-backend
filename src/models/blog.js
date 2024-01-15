import { DataTypes } from "sequelize";
import sequelize from "../database";

export const BlogSchema = sequelize.define("blogs", {
  id: {
    type: DataTypes.UUIDV4,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  owner: {
    type: DataTypes.UUIDV4,
  },
});
