const { body, validationResult } = require("express-validator");

// Función que comprueba si existen errores de validación en el servidor empleando express-validator.
// En caso afirmativo, devuelve un objeto con los diferentes errores
const comprobadorErrores = (req, res, next) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next({ errors: errors.array({ onlyFirstError: true }) });
  }
  next();
};
// Validador para comprobar que los campos enviados son válidos
const validador = [
  body("comentario", "El campo comentario está vacío")
    .exists()
    .not()
    .isEmpty()
    .trim()
    .escape(),
  body("nota", "El valor de nota debe estar entre 1 y 10").isInt({
    min: 1,
    max: 10,
  }),
  comprobadorErrores,
];

module.exports = validador;
