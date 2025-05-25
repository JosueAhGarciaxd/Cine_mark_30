import express from "express";
import registerClienteController from "../controllers/registerClienteController.js";

const router = express.Router();

router.post("/", registerClienteController.registerCliente);

export default router;