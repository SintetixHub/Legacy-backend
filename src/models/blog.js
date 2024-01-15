import { DataTypes } from "sequelize";
import sequelize from "../database/connection.js";

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
  owner: {
    type: DataTypes.UUID,
  },
});

//Methods with blog
const getAll = async () => {
  try {
    const blogs = await BlogSchema.findAll();
    return blogs;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const getById = async (blogId) => {
  try {
    const blog = await BlogSchema.findOne({ where: { id: blogId } });
    return blog;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const create = async (blog) => {
  try {
    const blogId = await BlogSchema.create(blog);
    return blogId;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export default { getAll, getById, create, BlogSchema };
