import config from "./config/index.js";
import sequelize from "./database/connection.js";
import app from "./services/server.js";
import "./models/user.js";
import "./models/blog.js";

(async () => {
  try {
    await sequelize.sync();
    console.log();
    app.listen(config.PORT, () =>
      console.log(
        "\n",
        "Connected to db and",
        "server up!",
        "\x1b[1m",
        `http://localhost:${config.PORT}`,
        "\x1b[0m",
        "\n"
      )
    );
  } catch (err) {
    console.log(err);
  }
})();
