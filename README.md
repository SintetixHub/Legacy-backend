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

## Organización del Projecto

### Estructura

Directorios (Ejemplo):

```
├── package.json
├── package-lock.json
├── README.md
└── src
    ├── controllers
    │   └── userControllers.js
    ├── database
    │   └── connection.js
    ├── index.js
    ├── models
    │   └── user.js
    └── routes
        └── userRoutes.js
```

* `controllers`:
    
Conjunto de funciones que manejaran lo que hace el servidor al recibir una petición, haciendo uso de los modelos importados   
desde `models`, cada función o controlador será exportado para ser usado en `routes`.

<details>
    <summary>Ejemplo:</summary>

```js
export async function getUsers() {
    const users = await User.getAll()
    res.json(users)
}
```
</details>
