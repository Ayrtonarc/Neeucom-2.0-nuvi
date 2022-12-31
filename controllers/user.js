
const { memoryStorage } = require("multer");
const user = require("../models/user");
const User = require("../models/user");
const bcrypt =require("bcrypt");

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
    
    //Control de usuarios duplicados
    User.find({ $or: [
        { email: params.email.toLowerCase()},
        { username: params.username.toLowerCase()}
        
    ]}).exec(async(error, users) => {

        if(error) return res.status(500).json({status: "error", message: "Error en la consulta de usuarios"});

        if(users && users.lenght >= 1){
            return res.status(200).send({
                status: "success",
                message: "El usuario ya existe"
            });
        }
        //cifrar contrasena
        let pwd = await bcrypt.hash(params.password,10);
            params.password = pwd;
        //crear objeto de usuario
        let usersaver = new User(params);

        //guardar usuario en la BDD
       usersaver.save((error, userStored) =>{
        if(error || !userStored) return res.status(500).send({status: "error","message" : "Error al guardar el usuario"});

        return res.status(200).json({
            status: "success",
            message: "Usuario registrado",
            user: userStored
        });
       });
    });    

}
//Exportar  acciones
module.exports = {
    pruebaUser,
    register
}



