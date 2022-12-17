
const { memoryStorage } = require("multer");
const user = require("../models/user");
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

    User.find({ $or: [
        { email: usersaver.email.toLowerCase()},
        { username: usersaver.username.toLowerCase()}
    ]}).exec((error, users) => {

        if(error) return res.status(500).json({status: "error", message: "Error en la consulta de usuarios"});

        if(users && users.lenght >= 1){
            return res.status(200).send({
                status: "success",
                message: "El usuario ya existe"
            });
        }
        return res.status(200).json({
            message: "Accion de registro de usuarios",
            params,
            usersaver
        })
    })
        

    
    
    
}
//Exportar  acciones
module.exports = {
    pruebaUser,
    register
}