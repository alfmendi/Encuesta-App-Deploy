const rutaNoValida = (req, res) => {
  return res.status(404).json({ mensaje: "Ruta no valida" });
};

module.exports = rutaNoValida;
