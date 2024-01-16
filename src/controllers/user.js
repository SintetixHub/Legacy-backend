import { getByName, create } from "../models/user.js";
import { validateData } from "../services/joi.js";

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
    // console.log(val);
    if (val.name === "ValidationError") {
      return res.status(400).json({ success: false, message: val.message });
    }

    const newUser = await create(val);

    console.log(newUser.parent.detail);

    res
      .status(200)
      .json({ success: true, message: "user created succesfully" });
  } catch (error) {
    // if (error.name && error.name === "ValidationError") {
    //   return res.status(400).json({ success: false, message: error.error });
    // }
    res.status(500).json({ success: false, message: "server error" });
  }
};

export const AuthController = { login, signup };
