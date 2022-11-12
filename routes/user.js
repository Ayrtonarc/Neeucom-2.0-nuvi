const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user");

//Definir rutas
router.get("/prueba-usuario", UserController.pruebaUser);
router.get("/register",UserController.register);

//Exportar el router
module.exports = router;