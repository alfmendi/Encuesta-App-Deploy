const mongoose = require("mongoose");

const conectarDB = mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Conexión realizada correctamente con la base de datos...");
  })
  .catch(() => {
    console.log("No se ha podido realizar la conexión con la base de datos...");
  });

module.exports = conectarDB;
