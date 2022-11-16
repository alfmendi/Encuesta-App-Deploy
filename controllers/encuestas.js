const Encuesta = require("../models/encuesta");

const ErrorAPIPersonalizada = require("../errors/ErrorAPIPersonalizada");

// Función para devolver todas las encuestas
const conseguirTodas = async (req, res, next) => {
  try {
    const encuestas = await Encuesta.find({}).sort({ updatedAt: -1 });
    return res.status(200).send(encuestas);
  } catch (error) {
    next(error);
  }
};

// Función para devolver una encuesta con cierto id
const conseguirEncuesta = async (req, res, next) => {
  try {
    const { encuestaId } = req.params;
    const encuesta = await Encuesta.findById(encuestaId);
    if (!encuesta) {
      throw new ErrorAPIPersonalizada(
        "Ese identificador de encuesta no existe",
        400
      );
    }
    return res.status(200).json(encuesta);
  } catch (error) {
    next(error);
  }
};

// Función para crear una encuesta
const crearEncuesta = async (req, res, next) => {
  try {
    const { comentario, nota } = req.body;
    const encuesta = await Encuesta.create({ comentario, nota });
    return res.status(201).json(encuesta);
  } catch (error) {
    next(error);
  }
};

// Función para modificar una encuesta con cierto id
const modificarEncuesta = async (req, res, next) => {
  try {
    const { encuestaId } = req.params;
    const encuesta = await Encuesta.findById(encuestaId);
    if (!encuesta) {
      throw new ErrorAPIPersonalizada(
        "Ese identificador de encuesta no existe",
        400
      );
    }
    const encuestaModificada = await Encuesta.findByIdAndUpdate(
      encuestaId,
      req.body,
      { new: true, runValidators: true }
    );
    return res.status(200).send(encuestaModificada);
  } catch (error) {
    next(error);
  }
};

// Función para eliminar una encuesta con cierto id
const eliminarEncuesta = async (req, res, next) => {
  try {
    const { encuestaId } = req.params;
    const encuestaEliminada = await Encuesta.findByIdAndRemove(encuestaId);
    if (!encuestaEliminada) {
      throw new ErrorAPIPersonalizada(
        "Ese identificador de encuesta no existe",
        400
      );
    }
    return res.status(200).json(encuestaEliminada);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  conseguirTodas,
  conseguirEncuesta,
  crearEncuesta,
  modificarEncuesta,
  eliminarEncuesta,
};
