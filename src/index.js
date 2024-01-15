import config from "./config/index.js";
import sequelize from "./database/connection.js";
import app from "./services/server.js";
import "./models/user.js";
import "./models/blog.js";

(async () => {
  try {
    await sequelize.sync();
    console.log("\x1b[34m", "\n", "Connected to db!");
    app.listen(config.PORT, () =>
      console.log(
        " Server up!",
        "\x1b[1m",
        "\x1b[37m",
        "\x1b[33m",
        "\x1b[4m",
        `http://localhost:${config.PORT}`,
        "\x1b[0m",
        "\n"
      )
    );
  } catch (err) {
    console.log(err);
  }
})();
