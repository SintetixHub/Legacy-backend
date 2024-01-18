import { DataTypes } from "sequelize";
import sequelize from "../database/connection.js";
import { v4 as uuidv4 } from "uuid";

const BlogSchema = sequelize.define("blogs", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUID,
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
  author: {
    type: DataTypes.UUID,
  },
  urlImage: {
    type: DataTypes.STRING,
  },
  likes: {
    type: DataTypes.ARRAY(DataTypes.UUID),
    defaultValue: [],
    allowNull: false,
  },
  score: {
    type: DataTypes.INTEGER,
    defaultValue: 7,
  },
});

//Methods with blog
const getAll = async () => {
  try {
    return await BlogSchema.findAll();
  } catch (err) {
    console.log(err);
    return null;
  }
};

const getById = async (blogId) => {
  try {
    return await BlogSchema.findOne({ where: { id: blogId } });
  } catch (error) {
    return { error };
  }
};

const create = async (blog) => {
  try {
    blog.id = uuidv4();
    const blogId = await BlogSchema.create(blog);
    return blogId;
  } catch (error) {
    return { error };
  }
};

const addRemoveLike = async (blogId, userId) => {
  try {
    const blog = await BlogSchema.findOne({ where: { id: blogId } });
    console.log(blog);
    if (!blog) return null;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const BlogModel = { getAll, getById, create, addRemoveLike, BlogSchema };
