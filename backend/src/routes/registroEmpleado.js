import { Router } from "express";
import registerEmpleadoController from "../controllers/registroEmplControlador.js";

const router = Router();

// Ruta POST para registrar empleado
router.post("/", registerEmpleadoController.register);

export default router;