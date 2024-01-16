import { Router } from "express";
import { BlogController } from "../controllers/blog.js";
import { authenticate } from "../middlewares/authenticate.js";

const router = Router();

router.get("/", BlogController.getAll);
router.get("/:blogId", BlogController.getById);
router.post("/", authenticate, BlogController.create);

export default router;
