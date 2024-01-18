# Sintetix-backend

## Para empezar a desarrollar ->

- clonar
- npm install
- crear archivo .env con variables detalladas en .env.example

### Comandos

- npm start
- npm run dev
- npm run test

---

## Para generar base de datos postgresql en local

- Descargar e instalar postgres -> [Aquí](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads)
- La instalación de postgreSQL trae ademas pgADMIN gestor gráfico de base de datos.
- Instalando PostgresQL se definen usuario, password, host y puerto a usarse cada vez que querramos conectarnos a postgres (pgAdmin y .env en el server)
- Una vez abierto pgAdmin crear Nueva Conexión -> Object -> Register
- Definir nombre de la database y repetir usuario, password, host y port.

---

## Organización del Proyecto

### Estructura

Directorios:

```
└── src
    ├── config
    ├── controllers
    ├── database
    ├── middlewares
    ├── models
    ├── routes
    └── services
```

- `config/`:

Importará las variables de entorno por medio del módulo `dotenv` y las exportará en un único objeto `config`.

<details>
<summary>Ejemplo:</summary>

```js
import { config } from "dotenv";

config();

export default {
  DB_HOST: process.env.DB_HOST,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD || "",
  // ...
};
```

</details>

<br>

- `controllers/`:

Conjunto de funciones que manejaran lo que hace el servidor al recibir una petición, haciendo uso de los modelos importados desde `models/`, cada función o controlador será exportado para ser usado en `routes/`.

<details>
<summary>Ejemplo:</summary>

```js
import { UserModel } from "../models/user.js";

const createUser = async (req,res) => {
    const { username, email } = req.body

    try {
        await UserModel.create(username,email)
    } catch (err) {
        console.error(err)
        return res.status(404).json({ message: "Error!" })
    }

    return res.status(200).json({ message: "Creado!" })
}
```

</details>

<br>

- `database/`:

Contendrá los scripts necesarios para conectar el servidor a la base de datos, lo hará a través de variables de entorno (.env) importadas desde `config/`, osea que el desarrollador tiene la libertad de elegir de qué manera trabajará con la base de datos (en local o en la nube), solo se cambian las variables necesarias en el `.env`.

Exportará un objeto (`sequelize`) que será utilizado en `models/` para hacer las queries o consultas.

<details>
<summary>Ejemplo:</summary>

```js
import Sequelize from "sequelize";
import config from "../config/index.js";

const sequelize = new Sequelize(
  config.DATABASE,
  config.DB_USERNAME,
  config.DB_PASSWORD,
  {
    host: config.DB_HOSTHOST,
    dialect: "postgres",
    port: config.DB_PORT,
    logging: false
  }
);

export default sequelize;
```

</details>

<br>

- `middlewares/`:

Contiene middlewares que serán usado entre los controladores de las rutas (antes o después de ejecutarse un controlador), por ejemplo: Autenticar un usuario.

Hacen uso de servicios importados desde `services/`, como validación, jsonwebtoken, etc.

<details>
<summary>Ejemplo:</summary>

```js
import { verifyToken } from "../services/jwt.js";

const authenticate = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const user = verifyToken(token);
    if (!user) {
      return res.json({ success: false, message: "Unauthorized" });
    }

    next();
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: "Unauthorized" });
  }
};

export { authenticate };
```

</details>

<br>

- `models/`:

Contiene los esquemas de las entidades de la base de datos (usuario, blog, comentario) al igual que los metodos para trabajar con ellos (`getByName`, `getAll`).

Hace uso del objeto `sequelize` importandolo desde `database/` para hacer las consultas a la base de datos.

Exporta un objeto con todos los metodos del modelo que será usado en el controlador del respectivo modelo.

<details>
<summary>Ejemplo:</summary>

```js
import sequelize from "../database/connection.js";

const UserSchema = sequelize.define("users", {
  id: {},
  username: {},
  password: {},
  email: {},
});

const create = async (user) => {
  try {
    const userId = await UserSchema.create(user);
    return userId;
  } catch (error) {
    console.log(err);
    return { error };
  }
};

export const UserModel = { create, UserSchema };
```

</details>

<br>

- `routes/`:

Contiene un conjunto de módulos que manejarán las rutas haciendo uso de los controladores importados de `controllers/`.

Cada módulo tiene las rutas definidas de una entidad o módelo (rutas de usuario, blogs, etc), las cuales exportan para ser usadas, ya sea en un enrutador principal (`mainRouter.js`) o directamente en el script que ejecuta el servidor (`server.js`).

<details>
<summary>Ejemplo:</summary>

```js
import { Router } from "express";
import { AuthController } from "../controllers/user.js";

const router = Router();

router.post("/login", AuthController.login);
router.post("/signup", AuthController.signup);

export default router;
```

</details>

<br>

- `services/`:

Conjunto de servicios de autenticación, validación, ejecución del servidor, etc. Pueden ser importados desde cualquier parte del proyecto (donde se necesite).

<details>
<summary>Ejemplo:</summary>

```js
import jwt from "jsonwebtoken";
import config from "../config/index.js";

const createToken = (user) => {
  try {
    return jwt.sign(user, config.SECRET_KEY, {
      expiresIn: config.EXPIRATION_TIME,
    });
  } catch (err) {
    throw Error("Must set a SECRET_KET as env");
  }
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, config.SECRET_KEY);
  } catch (err) {
    return null;
  }
};

export { createToken, verifyToken };
```
