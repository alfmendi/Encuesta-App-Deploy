const mongoose = require("mongoose");

const encuestaSchema = new mongoose.Schema(
  {
    comentario: {
      type: String,
      required: [true, "El campo comentario está vacío"],
    },
    nota: {
      type: Number,
      required: [true, "El campo nota está vacío"],
      min: [1, "El valor de nota debe estar entre 1 y 10"],
      max: [10, "El valor de nota debe estar entre 1 y 10"],
      get: (v) => Math.round(v),
      set: (v) => Math.round(v),
    },
  },
  { timestamps: true }
);

encuestaSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Encuesta", encuestaSchema);
