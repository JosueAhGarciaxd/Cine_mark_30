import express from "express";
import empleadosController from "../controllers/empleadosController.js";

// Router() nos ayuda a colocar los metodos
// que tendra mi ruta
const router = express.Router();

router
    .route("/")
    .get(empleadosController.getEmpleados)
    .post(empleadosController.createEmpleado);

router
    .route("/:id")
    .put(empleadosController.updateEmpleados)
    .delete(empleadosController.deletedEmpleados);

export default router;