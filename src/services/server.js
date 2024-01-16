import express from "express";
import cors from "cors";
import helmet from "helmet";

import mainRouter from "../routes/mainRouter.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

app.get("/", async (req, res) => {
  res.status(200).json({
    status: "Server up",
    definedEndpoints: [
      { method: "POST", route: "/api/auth/login" },
      { method: "POST", route: "/api/auth/signup" },
    ],
  });
});

app.use("/api", mainRouter);

app.use((req, res) => {
  res.redirect("/");
});

export default app;
