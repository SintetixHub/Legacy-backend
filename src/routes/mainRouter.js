import { Router } from "express";
import userRouter from "./user.js";
import blogRouter from "./blog.js";
import commentRouter from "./comment.js";

const router = Router();

router.use("/auth", userRouter);
router.use("/blog", blogRouter);
router.use("/comment", commentRouter);

export default router;
