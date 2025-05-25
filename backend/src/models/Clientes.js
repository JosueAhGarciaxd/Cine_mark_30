//La colección de clientes
/*
    campos:
    nombre
    correo
    contrasenia
    telefono
    direccion
    DUI (puede ser null)
*/

import { Schema, model } from "mongoose";

const clientesSchema = new Schema(
    {
        nombre: {
            type: String,
            required: true,
        },
        correo: {
            type: String,
            required: true,
        },
        contrasenia: {
            type: String,
            required: true,
        },
        telefono: {
            type: String,
        },
        direccion: {
            type: String,
        },
        DUI: {
            type: String,
            default: null, // Puede ser nulo según la rúbrica
        },
    },
    {
        timestamps: true,
        strict: false,
    }
);

export default model("Cliente", clientesSchema);