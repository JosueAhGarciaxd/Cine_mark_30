import clientesModel from "../models/Clientes.js";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import { config } from "../config.js";

const registerClienteController = {};

registerClienteController.registerCliente = async (req, res) => {
    const { nombre, correo, contrasenia, telefono, direccion, DUI } = req.body;

    try {
        // Verificar si el correo ya existe
        const existeCliente = await clientesModel.findOne({ correo });
        if (existeCliente) {
            return res.status(400).json({ message: "El correo ya está registrado" });
        }

        // Encriptar contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(contrasenia, salt);

        // Crear nuevo cliente
        const nuevoCliente = new clientesModel({
            nombre,
            correo,
            contrasenia: hashedPassword,
            telefono,
            direccion,
            DUI: DUI || null
        });

        await nuevoCliente.save();

        // Generar token JWT
        jsonwebtoken.sign(
            { id: nuevoCliente._id },
            config.JWT.secret,
            { expiresIn: config.JWT.expiresIn },
            (error, token) => {
                if (error) {
                    console.log("Error: " + error);
                    return res.status(500).json({ message: "Error interno del servidor" });
                }
                res.cookie("authToken", token);
                res.status(201).json({
                    message: "Cliente registrado exitosamente",
                    cliente: {
                        id: nuevoCliente._id,
                        nombre: nuevoCliente.nombre,
                        correo: nuevoCliente.correo
                    }
                });
            }
        );

    } catch (error) {
        console.log("Error: " + error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

export default registerClienteController;