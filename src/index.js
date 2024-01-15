import config from "./config/index.js";
import sequelize from "./database/index.js";
import app from "./services/server.js";


(async ()=> {
    try{
        await sequelize.authenticate();
        app.listen(config.PORT,()=>  console.log(`Server up! -> http://localhost:${config.PORT}`))

    }
    catch(err){
        console.log(err);
    }
})()
