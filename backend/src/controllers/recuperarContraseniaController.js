import clientesModel from "../models/Clientes.js";
import empleadosModel from "../models/Empleados.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { enviarCorreoRecuperacion, enviarConfirmacionCambio } from "../utils/mailService.js";

const recuperarContraseniaController = {};

// Buscar usuario por correo en ambas colecciones
const buscarUsuarioPorCorreo = async (correo) => {
    // Buscar en empleados
    let userFound = await empleadosModel.findOne({ correo });
    if (userFound) {
        return { user: userFound, userType: "empleado" };
    }

    // Buscar en clientes
    userFound = await clientesModel.findOne({ correo });
    if (userFound) {
        return { user: userFound, userType: "cliente" };
    }

    return null;
};

// Generar código de recuperación de 6 dígitos
const generarCodigoRecuperacion = () => {
    return crypto.randomInt(100000, 999999).toString();
};

// Almacenar código temporalmente (base de datos)
const guardarCodigoRecuperacion = (correo, codigo, userType) => {
    global.codigosRecuperacion = global.codigosRecuperacion || {};
    global.codigosRecuperacion[correo] = {
        codigo,
        expira: Date.now() + 300000, // 5 minutos
        userType,
        intentos: 0 // Para limitar intentos fallidos
    };
};

// Solicitar recuperación de contraseña
recuperarContraseniaController.solicitarRecuperacion = async (req, res) => {
    const { correo } = req.body;

    try {
        // Validar que se envió el correo
        if (!correo) {
            return res.status(400).json({
                message: "El correo electrónico es requerido"
            });
        }

        // Buscar usuario
        const resultado = await buscarUsuarioPorCorreo(correo);

        if (!resultado) {
            return res.status(404).json({
                message: "No se encontró ninguna cuenta asociada a este correo"
            });
        }

        const { user, userType } = resultado;

        // Generar código de recuperación
        const codigoRecuperacion = generarCodigoRecuperacion();

        // Guardar código temporalmente
        guardarCodigoRecuperacion(correo, codigoRecuperacion, userType);

        // Enviar correo usando el servicio
        const resultadoCorreo = await enviarCorreoRecuperacion(
            correo,
            user.nombre,
            codigoRecuperacion
        );

        if (!resultadoCorreo.success) {
            return res.status(500).json({
                message: "Error al enviar el correo de recuperación"
            });
        }

        res.json({
            message: "Se ha enviado un código de recuperación a tu correo electrónico"
        });

    } catch (error) {
        console.error("Error en solicitarRecuperacion:", error);
        res.status(500).json({
            message: "Error interno del servidor"
        });
    }
};

// Verificar código y cambiar contraseña
recuperarContraseniaController.cambiarContrasenia = async (req, res) => {
    const { correo, codigo, nuevaContrasenia } = req.body;

    try {
        // Validar datos requeridos
        if (!correo || !codigo || !nuevaContrasenia) {
            return res.status(400).json({
                message: "Correo, código y nueva contraseña son requeridos"
            });
        }

        // Validar longitud de contraseña
        if (nuevaContrasenia.length < 6) {
            return res.status(400).json({
                message: "La contraseña debe tener al menos 6 caracteres"
            });
        }

        // Verificar código
        global.codigosRecuperacion = global.codigosRecuperacion || {};
        const codigoData = global.codigosRecuperacion[correo];

        if (!codigoData) {
            return res.status(400).json({
                message: "Código inválido o expirado"
            });
        }

        // Verificar si el código ha expirado
        if (Date.now() > codigoData.expira) {
            delete global.codigosRecuperacion[correo];
            return res.status(400).json({
                message: "El código ha expirado. Solicita uno nuevo"
            });
        }

        // Verificar código correcto
        if (codigoData.codigo !== codigo) {
            // Incrementar intentos fallidos
            codigoData.intentos = (codigoData.intentos || 0) + 1;

            // Bloquear después de 3 intentos fallidos
            if (codigoData.intentos >= 3) {
                delete global.codigosRecuperacion[correo];
                return res.status(400).json({
                    message: "Demasiados intentos fallidos. Solicita un nuevo código"
                });
            }

            return res.status(400).json({
                message: `Código incorrecto. Intentos restantes: ${3 - codigoData.intentos}`
            });
        }

        // Buscar usuario para obtener datos actuales
        const resultado = await buscarUsuarioPorCorreo(correo);
        if (!resultado) {
            return res.status(404).json({
                message: "Usuario no encontrado"
            });
        }

        // Encriptar nueva contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(nuevaContrasenia, salt);

        // Actualizar contraseña según el tipo de usuario
        if (codigoData.userType === "empleado") {
            await empleadosModel.findOneAndUpdate(
                { correo },
                { contrasenia: hashedPassword }
            );
        } else {
            await clientesModel.findOneAndUpdate(
                { correo },
                { contrasenia: hashedPassword }
            );
        }

        // Limpiar código usado
        delete global.codigosRecuperacion[correo];

        // Enviar correo de confirmación
        await enviarConfirmacionCambio(correo, resultado.user.nombre);

        res.json({
            message: "Contraseña actualizada exitosamente"
        });

    } catch (error) {
        console.error("Error en cambiarContrasenia:", error);
        res.status(500).json({
            message: "Error interno del servidor"
        });
    }
};

export default recuperarContraseniaController;