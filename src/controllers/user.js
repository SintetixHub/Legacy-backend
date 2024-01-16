import { getByName, create } from "../models/user.js";
import { validateData } from "../services/joi.js";
import { hashPassword } from "../services/bcrypt.js";

const login = async (req, res) => {
  try {
    const { error, value } = userSchema.validate(req.body);

    if (error) {
      return res.status(404).json({ success: false, message: error.message });
    }

    res.status(200).json({ success: true });
    console.log("\n", error, "\n");
    console.log("\n", value, "\n");
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "server error" });
  }
};

const signup = async (req, res) => {
  try {
    const val = await validateData("user", req.body);

    if (val.name === "ValidationError") {
      return res.status(400).json({ success: false, message: val.message });
    }

    // const newData = {
    //     username:val.username,
    //     email: val.email,
    //     password:
    // }
    val.password = await hashPassword(val.password);

    const newUser = await create(val);

    if (newUser.name === "SequelizeUniqueConstraintError") {
      return res
        .status(400)
        .json({ success: false, message: newUser.parent.detail });
    }

    res
      .status(200)
      .json({ success: true, message: "user created succesfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "server error" });
  }
};

export const AuthController = { login, signup };
