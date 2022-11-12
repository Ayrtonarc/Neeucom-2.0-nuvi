//importar dependencias
const connection = require("./database/connection");
const express = require("express");
const cors = require("cors");

//
console.log("API node Neeucom");
//Conexion a la base de datos
connection();
//Crear servidor de node
const app = express();
const puerto = 3900;
//Configurar cors
app.use(cors());
//Convertir los datos  del body a objetos
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Cargar configuracion de rutas
const UserRoutes = require("./routes/user");
const PublicationRoutes = require("./routes/publication");
const FollowRoutes = require("./routes/follow");

app.use("/api/user", UserRoutes);
app.use("/api/publication", PublicationRoutes);
app.use("/api/follow", FollowRoutes);

//ruta de prueba
app.get("/ruta-prueba", (req, res) => {
    return res.status(200).json(
    {
        "id": 1, 
        "nombre": "Ayrton",
        "web" : "neeucom.com"

    })
});

//Poner servidor a escuchar peticiones http
app.listen(puerto, () => {
    console.log("servidor ejecutandose en el puerto: ", 3900)
});