import clientesModel from "../models/Clientes.js";

const clientesController = {};

// SELECT
clientesController.getClientes = async (req, res) => {
    const clientes = await clientesModel.find();
    res.json(clientes);
};

// CREATE
clientesController.createCliente = async (req, res) => {
    const { nombre, correo, contrasenia, telefono, direccion, DUI } = req.body;
    const nuevoCliente = new clientesModel({
        nombre,
        correo,
        contrasenia,
        telefono,
        direccion,
        DUI
    });
    await nuevoCliente.save();
    res.json({ message: "cliente creado" });
};

// DELETE
clientesController.deletedClientes = async (req, res) => {
    const deletedCliente = await clientesModel.findByIdAndDelete(req.params.id);
    if (!deletedCliente) {
        return res.status(404).json({ message: "cliente no encontrado" });
    }
    res.json({ message: "cliente eliminado" });
};

// UPDATE
clientesController.updateClientes = async (req, res) => {
    const { nombre, correo, contrasenia, telefono, direccion, DUI } = req.body;
    await clientesModel.findByIdAndUpdate(
        req.params.id,
        {
            nombre,
            correo,
            contrasenia,
            telefono,
            direccion,
            DUI,
        },
        { new: true }
    );
    res.json({ message: "cliente actualizado" });
};

export default clientesController;