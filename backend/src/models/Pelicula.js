//La Colección de Peliculas
/*
    campos:
    titulo
    descripcion
    director
    genero
    anio
    duracion
    imagen
*/

import { Schema, model } from "mongoose";

const peliculasSchema = new Schema(
    {
        titulo: {
            type: String,
            required: true,
        },
        descripcion: {
            type: String,
        },
        director: {
            type: String,
            required: true,
        },
        genero: {
            type: String,
            required: true,
        },
        anio: {
            type: Number,
            required: true,
        },
        duracion: {
            type: Number,
            required: true,
        },
        imagen: {
            type: String,
        },
    },
    {
        timestamps: true,
        strict: false,
    }
);

export default model("Pelicula", peliculasSchema);
