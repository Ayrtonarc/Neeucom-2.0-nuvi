
const { memoryStorage } = require("multer");
const User = require("../models/user");

//Actions prueba
const pruebaUser = (req, res) => {
        return res.status(200).send({
            message: "Mensaje enviado desde: controllers/user.js"
        })
}

const register = (req, res) => {
    let params = req.body;

    if(!params.name || !params.lastname || !params.username || !params.email || !params.password ){
        return res.status(400).json({
            status: 'error',
            message: 'Faltan datos por enviar'
        });
    }
    let usersaver = new User(params);

    return res.status(200).json({
        message: "Accion de registro de usuarios",
        params,
        usersaver
    })
    
}
//Exportar  acciones
module.exports = {
    pruebaUser,
    register
}