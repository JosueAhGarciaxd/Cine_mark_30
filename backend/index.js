// Se importa el arichivo app.js y database.js
import app from "./app.js";
import "./database.js";

//Se crea una funcion que se encarga de ejecutar el servidor
async function main() {
    const port = 4000;
    app.listen(port);
    console.log("Server on port " + port);
}

//Se ejecuta
main();
