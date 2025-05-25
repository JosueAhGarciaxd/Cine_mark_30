import express from "express";
import clientesController from "../controllers/clienteController.js";

// Router() nos ayuda a colocar los metodos
// que tendra mi ruta
const router = express.Router();

router
    .route("/")
    .get(clientesController.getClientes)
    .post(clientesController.createCliente);

router
    .route("/:id")
    .put(clientesController.updateClientes)
    .delete(clientesController.deletedClientes);

export default router;