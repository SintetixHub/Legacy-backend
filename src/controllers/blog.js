import { BlogModel } from "../models/blog.js";
import { validateData } from "../services/joi.js";

const getAll = async (req, res) => {
  try {
    const blogs = await BlogModel.getAll();
    res.status(200).json({ success: true, data: blogs });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "server error" });
  }
};

const getById = async (req, res) => {
  try {
    const { blogId } = req.params;
    if (
      !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
        blogId
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "Not valid blogId format, must be an uuid",
      });
    }

    const blog = await BlogModel.getById(blogId);
    if (blog == null) {
      return res.status(404).json({
        success: false,
        message: "Does not exists a blog with that blogId",
      });
    }

    res.status(200).json({ success: true, data: blog });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "server error" });
  }
};

const create = async (req, res) => {
  try {
    const val = await validateData("createBlog", req.body);
    console.log(val);
    if (val.err === "ValidationError") {
      return res.status(400).json({ success: false, message: val.message });
    }

    const { user } = req;

    const newBlog = {
      title: val.title,
      content: val.content,
      author: user.id,
      urlImage: val.urlImage,
    };

    const resp = await BlogModel.create(newBlog);
    console.log(resp);
    if (resp.error?.name === "SequelizeUniqueConstraintError") {
      return res
        .status(400)
        .json({ success: false, message: resp.error.parent.detail });
    }

    res
      .status(201)
      .json({ success: true, message: "blog created", blogId: resp.id });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "server error" });
  }
};

const addRemoveLike = async (req, res) => {
  try {
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "server error" });
  }
};

export const BlogController = { getAll, getById, create, addRemoveLike };
