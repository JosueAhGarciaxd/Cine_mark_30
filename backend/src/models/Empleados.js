//La colección de Empleados
/*
    campos:
    nombre
    correo
    contrasenia
    telefono
    direccion
    puesto
    fecha_contratacion
    salario
    DUI
*/

import { Schema, model } from "mongoose";

const empleadosSchema = new Schema(
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
        puesto: {
            type: String,
            required: true,
        },
        fecha_contratacion: {
            type: Date,
            required: true,
        },
        salario: {
            type: Number,
            required: true,
        },
        DUI: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
        strict: false,
    }
);

export default model("Empleado", empleadosSchema);
