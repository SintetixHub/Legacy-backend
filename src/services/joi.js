import Joi from "joi";

const signupSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string()
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*d).{8,30}$"))
    .required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
});

const loginSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string()
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*d).{8,30}$"))
    .required(),
});

const createBlogSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
});

const schemaByName = {
  signup: signupSchema,
  login: loginSchema,
  createBlog: createBlogSchema,
};

export const validateData = async (schemaName, data) => {
  try {
    const value = await schemaByName[schemaName].validateAsync(data);
    return value;
  } catch (err) {
    return { err: err.name };
  }
};
