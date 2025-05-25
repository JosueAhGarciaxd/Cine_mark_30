import peliculasModel from "../models/Pelicula.js";
import { v2 as cloudinary } from "cloudinary";
import { config } from "../config.js";

// Configurar cloudinary con nuestra cuenta 
cloudinary.config({
    cloud_name: config.cloudinary.cloudinary_name,
    api_key: config.cloudinary.cloudinary_api_key,
    api_secret: config.cloudinary.cloudinary_api_secret,
});

const peliculasController = {};

// SELECT
peliculasController.getPeliculas = async (req, res) => {
    const peliculas = await peliculasModel.find();
    res.json(peliculas);
};

// CREATE
peliculasController.createPeliculas = async (req, res) => {
    const { titulo, descripcion, director, genero, anio, duracion } = req.body;
    let imageURL = "";

    // Subir la imagen a Cloudinary
    if (req.file) {
        const result = await cloudinary.uploader.upload(
            req.file.path,
            {
                folder: "public",
                allowed_formats: ["png", "jpg", "jpeg"]
            }
        );
        imageURL = result.secure_url;
    }

    // Guardar todo en la base de datos
    const newPelicula = new peliculasModel({
        titulo,
        descripcion,
        director,
        genero,
        anio,
        duracion,
        imagen: imageURL
    });
    await newPelicula.save();
    res.json({ message: "pelicula creada" });
};

// DELETE
peliculasController.deletePeliculas = async (req, res) => {
    const deletedPelicula = await peliculasModel.findByIdAndDelete(req.params.id);
    if (!deletedPelicula) {
        return res.status(404).json({ message: "pelicula no encontrada" });
    }
    res.json({ message: "pelicula eliminada" });
};

// UPDATE
peliculasController.updatePeliculas = async (req, res) => {
    const { titulo, descripcion, director, genero, anio, duracion } = req.body;
    let newImageURL = "";

    // Subir la imagen a Cloudinary
    if (req.file) {
        const result = await cloudinary.uploader.upload(
            req.file.path,
            {
                folder: "public",
                allowed_formats: ["png", "jpg", "jpeg"]
            }
        );
        newImageURL = result.secure_url;
    }

    // Actualizar
    await peliculasModel.findByIdAndUpdate(
        req.params.id,
        {
            titulo,
            descripcion,
            director,
            genero,
            anio,
            duracion,
            imagen: newImageURL,
        },
        { new: true }
    );
    res.json({ message: "pelicula actualizada" });
};

export default peliculasController;