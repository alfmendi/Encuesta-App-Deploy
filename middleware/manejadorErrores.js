const manejadorErrores = (err, req, res, next) => {
  // Creo un error personalizado para devolver a la aplicación cliente
  let errorPersonalizado = {
    // set default
    codigoEstado: err.codigoEstado || 500,
    mensaje: err.message || "Error en el servidor",
  };

  // Si existe un error de validación desde express-validator, genero un error
  if (err.errors && !err.name && Array.isArray([err.errors])) {
    errorPersonalizado.mensaje = err.errors.map((elemento) => elemento.msg);
    errorPersonalizado.codigoEstado = 400;
  }

  // Si existe un error de validación desde Mongoose, genero un error
  if (err.name === "ValidationError") {
    errorPersonalizado.mensaje = Object.values(err.errors).map(
      (elemento) => elemento.message
    );
    errorPersonalizado.codigoEstado = 400;
  }

  // Si existe un error de valor duplicado, genero un error
  if (err.code && err.code === 11000) {
    errorPersonalizado.mensaje = `Valor duplicado para el campo ${Object.keys(
      err.keyValue
    )}`;
    errorPersonalizado.codigoEstado = 400;
  }

  // Si existe un error de cast, genero un error
  if (err.name === "CastError") {
    errorPersonalizado.mensaje = `No existe la encuesta con id: ${err.value}`;
    errorPersonalizado.codigoEstado = 404;
  }

  return res
    .status(errorPersonalizado.codigoEstado)
    .json({ mensaje: errorPersonalizado.mensaje });
};

module.exports = manejadorErrores;
