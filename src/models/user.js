import { DataTypes } from "sequelize";
import sequelize from "../database/connection.js";
import { v4 as uuidv4 } from "uuid";

const UserSchema = sequelize.define("users", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUID,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

//Methods with user
const getByName = async (username) => {
  try {
    return await UserSchema.findOne({
      where: { username: username },
    });
  } catch (err) {
    console.log(err);
    return null;
  }
};

const create = async (user) => {
  try {
    user.id = uuidv4();
    const userId = await UserSchema.create(user);
    return userId;
  } catch (error) {
    // console.log(err);
    return { error };
  }
};

export const UserModel = { getByName, create, UserSchema };
