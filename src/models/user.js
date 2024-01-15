import { DataTypes } from "sequelize";
import sequelize from "../database/connection.js";

const UserSchema = sequelize.define("users", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUID,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

//Methods with user
const getByName = async (username) => {
  try {
    const user = await UserSchema.findOne({ where: { name: username } });
    return user;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const create = async (user) => {
  try {
    const userId = await UserSchema.create(user);
    return userId;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export default { getByName, create, UserSchema };
