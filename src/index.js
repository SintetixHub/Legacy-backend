import config from "./config/index.js";
import sequelize from "./database/connection.js";
import app from "./services/server.js";
import "./models/user.js";
import "./models/blog.js";

(async () => {
  try {
    await sequelize.sync();
    app.listen(config.PORT, () =>
      console.log(`Server up! -> http://localhost:${config.PORT} 👻 `)
    );
  } catch (err) {
    console.log(err);
  }
})();
