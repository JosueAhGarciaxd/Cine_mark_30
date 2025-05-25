import clientesModel from "../models/Clientes.js";
import empleadosModel from "../models/Empleados.js";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";

const loginController = {};

loginController.login = async (req, res) => {
    const { correo, contrasenia } = req.body;

    try {
        let userFound;
        let userType;

        // Admin (usando variables de entorno)
        if (correo === process.env.ADMIN_EMAIL && contrasenia === process.env.ADMIN_PASSWORD) {
            userType = "admin";
            userFound = { _id: "admin", correo: process.env.ADMIN_EMAIL };
        } else {
            // Buscar empleado
            userFound = await empleadosModel.findOne({ correo });
            if (userFound) {
                userType = "empleado";
            } else {
                // Buscar cliente
                userFound = await clientesModel.findOne({ correo });
                if (userFound) {
                    userType = "cliente";
                }
            }
        }

        if (!userFound) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // Verificar contraseña (excepto admin)
        if (userType !== "admin") {
            const isMatch = await bcrypt.compare(contrasenia, userFound.contrasenia);
            if (!isMatch) {
                return res.status(401).json({ message: "Contraseña incorrecta" });
            }
        }

        // Generar token
        jsonwebtoken.sign(
            { id: userFound._id, userType, correo: userFound.correo },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES },
            (error, token) => {
                if (error) {
                    console.log("Error generando token: " + error);
                    return res.status(500).json({ message: "Error generando token" });
                }

                res.cookie("authToken", token);
                res.json({
                    message: "Login exitoso",
                    token,
                    userType,
                    user: {
                        id: userFound._id,
                        nombre: userFound.nombre,
                        correo: userFound.correo
                    }
                });
            }
        );

    } catch (error) {
        console.log("Error: " + error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

export default loginController;