import mongoose from "mongoose";

// 1- Se configura la URL o dirección de la base de datos
const URI = "mongodb://localhost:27017/Cinemark20230098";

// 2- Se conecta la base de datos
mongoose.connect(URI);

//Se comprueba que funcione

// 3- Creo una constante que es igual a la conexión
const connection = mongoose.connection;

// Si funciona...
connection.once("open", () => {
    console.log("DB is connected");
});

// Si se desconteca...
connection.on("disconnected", () => {
    console.log("DB is disconnected");
});

// Por si hay algun error...
connection.on("error", (error) => {
    console.log("error found" + error);
});
