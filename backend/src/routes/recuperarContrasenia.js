import express from "express";
import recuperarContraseniaController from "../controllers/recuperarContraseniaController.js";

const router = express.Router();

// Ruta para solicitar la recuperación de contraseña
// POST /api/recuperar/solicitar
router.post("/solicitar", recuperarContraseniaController.solicitarRecuperacion);

// Ruta para cambiar la contraseña con el código
// POST /api/recuperar/cambiar
router.post("/cambiar", recuperarContraseniaController.cambiarContrasenia);

export default router;