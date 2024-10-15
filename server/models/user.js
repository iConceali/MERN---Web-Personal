import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  firstname: String,
  lastname: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  role: String,
  active: Boolean,
  avatar: String,
});

export default mongoose.model("User", UserSchema);

// import mongoose from "mongoose";

// const UserSchema = new mongoose.Schema({
//   firstname: {
//     type: String,
//     required: true, // Requerido
//     trim: true,     // Elimina espacios en blanco al principio y al final
//   },
//   lastname: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   email: {
//     type: String,
//     unique: true,   // Email único
//     required: true, // Requerido
//     trim: true,     // Elimina espacios en blanco
//     match: [/.+@.+\..+/, "El formato del email no es válido"], // Validación básica del email
//   },
//   password: {
//     type: String,
//     required: true, // Requerido
//     minlength: 6,   // Longitud mínima
//   },
//   role: {
//     type: String,
//     enum: ["admin", "user"], // Solo puede ser "admin" o "user"
//     default: "user",         // Valor por defecto "user"
//   },
//   active: {
//     type: Boolean,
//     default: false,  // Valor por defecto, usuario inactivo hasta que se confirme
//   },
//   avatar: {
//     type: String,    // Guardará el path al archivo avatar si es que lo tiene
//     default: null,   // Si no tiene avatar, será null
//   }
// }, {
//   timestamps: true  // Agrega createdAt y updatedAt automáticamente
// });

// export default mongoose.model("User", UserSchema);
