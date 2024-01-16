import { UserModel } from "../models/user.js";
import { validateData } from "../services/joi.js";
import { comparePasswords, hashPassword } from "../services/bcrypt.js";
import { createToken } from "../services/jwt.js";

const login = async (req, res) => {
  try {
    const val = await validateData("login", req.body);

    if (val.error === "ValidationError") {
      return res.status(400).json({ success: false, message: val.message });
    }

    const user = await UserModel.getByName(val.username);

    if (user === null) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect data" });
    }

    const samePass = await comparePasswords(val.password, user.password);
    if (!samePass) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect data" });
    }

    const userNoPass = {
      id: user.id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
    };

    const token = createToken(userNoPass);

    res.cookie("token", token, {
      httpOnly: true,
      // secure: true,
      // maxAge: 3000000,
      // signed: true,
    });

    res.status(200).json({
      success: true,
      message: "logued successfully",
      data: userNoPass,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "server error" });
  }
};

const signup = async (req, res) => {
  try {
    const val = await validateData("signup", req.body);

    if (val.error === "ValidationError") {
      return res.status(400).json({ success: false, message: val.message });
    }
    val.password = await hashPassword(val.password);

    const resp = await UserModel.create(val);

    if (resp.error.name === "SequelizeUniqueConstraintError") {
      return res
        .status(400)
        .json({ success: false, message: resp.error.parent.detail });
    }

    res
      .status(200)
      .json({
        success: true,
        message: "user created succesfully",
        userId: resp.id,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "server error" });
  }
};

export const AuthController = { login, signup };
