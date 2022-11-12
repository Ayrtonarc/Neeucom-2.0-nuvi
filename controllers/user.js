
//Actions prueba
const pruebaUser = (req, res) => {
        return res.status(200).send({
            message: "Mensaje enviado desde: controllers/user.js"
        })
}

const register = (req, res) => {
    return res.status(200).json({
        message: "Accion de registro de usuarios"
    })
}
//Exportar  acciones
module.exports = {
    pruebaUser,
    register
}