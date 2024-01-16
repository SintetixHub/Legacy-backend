import { verifyToken } from "../services/jwt.js";

const authenticate = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const user = verifyToken(token);
    if (!user) {
      return res
        .clearCookie("token")
        .status(401)
        .json({ success: false, message: "Unauthorized" });
    }

    req.user = user;

    next();
  } catch (err) {
    console.log(err);
    res
      .clearCookie("token")
      .status(401)
      .json({ success: false, message: "Unauthorized" });
  }
};

export { authenticate };
