// Importo todo lo de la libreria de Express
import express from "express";
import peliculasRoutes from "./src/routes/pelicula.js";
import empleadosRoutes from "./src/routes/empledos.js";
import clientesRoutes from "./src/routes/Cliente.js";

// Creo una constante que es igual a la libreria que importé
const app = express();

// Que acepte datos en json
app.use(express.json());

// Definir las rutas de las funciones que tendrá la página web
app.use("/api/peliculas", peliculasRoutes);
app.use("/api/empleados", empleadosRoutes);
app.use("/api/clientes", clientesRoutes);

// Exporto la constante para poder usar express en otros archivos
export default app;