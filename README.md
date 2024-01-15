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

## Organización del Projecto

### Estructura

Directorios (Ejemplo):

```
├── package.json
├── package-lock.json
├── README.md
└── src
    ├── index.js
    ├── controllers
    │   ├── user.js
    │   └── blog.js
    ├── database
    │   └── connection.js
    ├── config
    │   └── index.js
    ├── models
    │   ├── user.js
    │   └── blog.js
    ├── routes
    │   ├── mainRouter.js
    │   ├── user.js
    │   └── blog.js
    └── services
        └── server.js
```

- `controllers`:

Conjunto de funciones que manejaran lo que hace el servidor al recibir una petición, haciendo uso de los modelos importados desde `models`, cada función o controlador será exportado para ser usado en `routes`.

<details>
<summary>Ejemplo:</summary>

```js
import User from "../models/user.js"; // Modelo importado

export async function getUsers() {
  const users = await User.getAll();

  if (users.isEmpty) {
    res.send("Usuarios no encontrados!").status(404);
  } else {
    res.json(users).status(200);
  }
}
```

</details>

<br>

- `database`:

Contendrá los scripts necesarios para conectar el servidor a la base de datos, lo hará a través de variables de entorno (.env) osea que el desarrollador tiene la libertad de elegir de qué manera trabajará con la base de datos (en local o en la nube), solo se cambian las variables necesarias en el `.env`.

Exportará un objeto (`database`) que será utilizado en `models` para hacer las queries o consultas.

<details>
<summary>Ejemplo:</summary>

```js
import pg from "pg"; // Driver de conexión con postgresql

const database = new pg.Pool({
  host: proccess.env.DB_HOST,
  port: proccess.env.DB_PORT,
  user: proccess.env.DB_USER,
  password: proccess.env.DB_PASSWORD,
  database: proccess.env.DB_NAME,
});

export default database;
```
