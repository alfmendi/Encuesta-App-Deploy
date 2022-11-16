const router = require("express").Router();

const validador = require("../validators/encuestas");

const {
  conseguirTodas,
  conseguirEncuesta,
  crearEncuesta,
  modificarEncuesta,
  eliminarEncuesta,
} = require("../controllers/encuestas");

router.get("/", conseguirTodas);
router.get("/:encuestaId", conseguirEncuesta);
router.post("/", validador, crearEncuesta);
router.patch("/:encuestaId", validador, modificarEncuesta);
router.delete("/:encuestaId", eliminarEncuesta);

module.exports = router;
