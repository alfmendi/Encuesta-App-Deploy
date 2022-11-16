const path = require("path");
// Necesario para importar las variables de entorno definidas en el fichero .env
require("dotenv").config();
const express = require("express");
const cors = require("cors");

// Realiza la conexión a la base de datos directamente
require("./db/conectarDB");

const encuestasRouter = require("./routes/encuestas");

const rutaNoValida = require("./middleware/rutaNoValida");
const manejadorErrores = require("./middleware/manejadorErrores");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static("build"));

// Rutas
app.use("/api/encuestas", encuestasRouter);

// POR FIN: ESTA SOLUCIÓN ES CORRECTA!!!!!!!!!!!!!
// La aplicación cada vez que se hacía un refresh (F5) llamaba al servidor
// con la dirección que figuraba en el navegador. Esto hacía que cualquier
// dirección que no fuese el raiz definido en app.use(express.static("build"))
// generase un error.
// Para solventarlo, se añade el siguiente código...
// app.get("*", function (request, response) {
//   response.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
// });
app.get("*", function (req, res) {
  res.sendFile(path.resolve(__dirname, "./build", "index.html"));
});

// Middleware
// app.use(rutaNoValida);
app.use(manejadorErrores);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutandose en el puerto ${PORT}`);
});
