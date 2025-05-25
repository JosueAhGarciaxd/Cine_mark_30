//importar el modelo
import empleadosModel from "../models/Empleados.js";
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import { config } from "../config.js";

//creamos un array de funciones
const registerEmpleadoController = {};

registerEmpleadoController.register = async (req, res) => {
    const {
        nombre,
        correo,
        contrasenia,
        telefono,
        direccion,
        puesto,
        fecha_contratacion,
        salario,
        DUI
    } = req.body;

    try {
        //1- Verificar si el empleado ya existe
        const existEmpleado = await empleadosModel.findOne({ correo });
        if (existEmpleado) {
            return res.json({ message: "Empleado already exists" });
        }

        //2- Encriptar contraseña correctamente usando 'contrasenia'
        const passwordHash = await bcryptjs.hash(contrasenia, 10);

        //3- Guardar empleado
        const newEmpleado = new empleadosModel({
            nombre,
            correo,
            contrasenia: passwordHash,
            telefono,
            direccion,
            puesto,
            fecha_contratacion,
            salario,
            DUI,
        });

        await newEmpleado.save();

        //4- Generar token correctamente usando 'newEmpleado'
        jsonwebtoken.sign(
            { id: newEmpleado._id },
            config.JWT.secret,
            { expiresIn: config.JWT.expiresIn },
            (error, token) => {
                if (error) console.log("error: " + error);
                res.cookie("authToken", token);
                res.json({ message: "Empleado guardado" });
            }
        );

    } catch (error) {
        console.log("error: " + error);
        res.json({ message: "Error saving empleado" });
    }
};

export default registerEmpleadoController;