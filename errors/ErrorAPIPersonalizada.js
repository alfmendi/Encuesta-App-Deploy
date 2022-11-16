// Esta clase se emplea para la generación de errores

class ErrorAPIPersonalizada extends Error {
  constructor(mensaje, codigoEstado) {
    super(mensaje);
    this.codigoEstado = codigoEstado;
  }
}

module.exports = ErrorAPIPersonalizada;
