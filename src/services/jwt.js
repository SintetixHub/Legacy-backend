import jwt from "jsonwebtoken";
import config from "../config/index.js";

const createToken = (user) => {
  try {
    return jwt.sign(user, config.SECRET_KEY, {
      expiresIn: config.EXPIRATION_TIME,
    });
  } catch (err) {
    throw Error("Must set a SECRET_KET as env");
  }
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, config.SECRET_KEY);
  } catch (err) {
    return null;
  }
};

export { createToken, verifyToken };
