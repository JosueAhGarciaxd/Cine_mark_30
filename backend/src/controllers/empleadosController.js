import empleadosModel from "../models/Empleados.js";

const empleadosController = {};

// SELECT
empleadosController.getEmpleados = async (req, res) => {
    const empleados = await empleadosModel.find();
    res.json(empleados);
};

// CREATE
empleadosController.createEmpleado = async (req, res) => {
    const { nombre, correo, contrasenia, telefono, direccion, puesto, fecha_contratacion, salario, DUI } = req.body;
    const nuevoEmpleado = new empleadosModel({
        nombre,
        correo,
        contrasenia,
        telefono,
        direccion,
        puesto,
        fecha_contratacion,
        salario,
        DUI
    });
    await nuevoEmpleado.save();
    res.json({ message: "empleado creado" });
};

// DELETE
empleadosController.deletedEmpleados = async (req, res) => {
    const deletedEmpleado = await empleadosModel.findByIdAndDelete(req.params.id);
    if (!deletedEmpleado) {
        return res.status(404).json({ message: "empleado no encontrado" });
    }
    res.json({ message: "empleado eliminado" });
};

// UPDATE
empleadosController.updateEmpleados = async (req, res) => {
    const { nombre, correo, contrasenia, telefono, direccion, puesto, fecha_contratacion, salario, DUI } = req.body;
    await empleadosModel.findByIdAndUpdate(
        req.params.id,
        {
            nombre,
            correo,
            contrasenia,
            telefono,
            direccion,
            puesto,
            fecha_contratacion,
            salario,
            DUI,
        },
        { new: true }
    );
    res.json({ message: "empleado actualizado" });
};

export default empleadosController;