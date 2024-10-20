const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { ObjectId, Int32, Binary } = require("mongodb");
const cloudinary = require("cloudinary").v2;
const app = express();

app.use(express.json());
app.use(cors());

// CONFIGURACIÓN DE CLOUDINARY
cloudinary.config({
  cloud_name: "cloud_name",
  api_key: "api_key",
  api_secret: "api_secret",
});

// CONEXIÓN A MONGODB

//Cadena de conexión + BD: Libreria. NO MODIFICAR NADA AQUÍ
const MONGODB_URI = "MONGO_URI";
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB conectado");
  })
  .catch((error) => {
    console.error("MongoDB conexión fallida:", error);
  });

// DEFINICIÓN DE MODELOS: Mostrar igual que en la BD de MongoDB

const usuarioSchema = new mongoose.Schema(
  {
    NombreUsuario: { type: String, unique: true },
    CorreoUsuario: { type: String, unique: true },
    Contraseña: { type: String },
  },
  {
    collection: "Usuario", //Especificación de colección en la BD
  }
);

const libroSchema = new mongoose.Schema(
  {
    Titulo: { type: String },
    Autor: { type: String },
    Genero: { type: String },
    ISBN: { type: Number },
    Sinopsis: { type: String },
    Portada: { type: String },
    Año: { type: Number },
    Lenguaje: { type: String },
    Libro_id: { type: ObjectId },
    PDF: { type: String },
    EPUB: { type: String },
    Editorial: { type: String },
  },
  {
    collection: "Libro", //Especificación de colección en la BD
  }
);

// VARIABLES BASE PARA ENCONTRAR NUESTRO MODELO EN LA BASE DE DATOS

const book = mongoose.model("Libro", libroSchema);
const user = mongoose.model("Usuario", usuarioSchema);

// LÓGICA PARA EL REGISTRO DE USUARIOS

app.post("/crear-cuenta", async (req, res) => {
  const { NombreUsuario, Correo, Contraseña } = req.body; // Variables de registro (placeholder, no BD)

  const data = {
    NombreUsuario: NombreUsuario,
    CorreoUsuario: Correo.toLowerCase(), //Comparaciones
    Contraseña: Contraseña,
  };

  try {
    const userRegistro = await user.findOne({
      $or: [{ NombreUsuario: NombreUsuario }, { CorreoUsuario: Correo }], // Búsqueda de similitudes en la BD (Busca una colección que tenga "CorreoUsuario" en ella para poder insertar los datos. Si no la encuentra, crea una nueva)
    });
    if (userRegistro) {
      res.json("exist"); //Si existe
    } else {
      const nuevoUsuario = new user(data); //Crea un nuevo registro
      await nuevoUsuario.save(); //Guarda el registro

      res.json("notexist"); //Si no existe, un mensaje se despliega (código de las indicaciones en Registro.js)
    }
  } catch (e) {
    res.json("notexist");
  }
});

//LÓGCA PARA EL INICIO DE SESIÓN
app.post("/iniciar-sesion", async (req, res) => {
  const { NombreUsuario, Correo, Contraseña } = req.body;

  try {
    const userData = await user.findOne({
      $or: [
        { NombreUsuario: NombreUsuario },
        { CorreoUsuario: Correo.toLowerCase() },
      ],
    });

    if (!userData) {
      res.json("user_not_found");
    } else {
      if (Contraseña === userData.Contraseña) {
        res.json("login_success");
      } else {
        res.json("login_failed");
      }
    }
  } catch (e) {
    res.json("login_failed");
  }
});

app.get("/", async (req, res) => {
  try {
    const { genero } = req.query;

    if (genero) {
      // Si se proporciona un género, filtra los libros por ese género
      const genreResults = await book.find({
        Genero: { $regex: new RegExp(genero || "", "i") },
      });

      if (genreResults.length > 0) {
        // Si se encuentran libros del género especificado, devuelve los datos
        res.json(genreResults);
      } else {
        res.status(404).json({ error: "notexist" });
      }
    } else {
      // Si no se proporciona un género, puedes devolver todos los libros o manejarlo según tu lógica
      // Ejemplo: Devolver todos los libros
      const allBooks = await book.find();
      res.json(allBooks);
    }
  } catch (error) {
    console.error("Genre search error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Ruta para la búsqueda
app.get("/search/:searchValue?", async (req, res) => {
  try {
    const { searchValue } = req.params;

    // Utiliza expresiones regulares para realizar una búsqueda flexible
    const searchResults = await book.find({
      $or: [
        { Titulo: { $regex: new RegExp(searchValue || "", "i") } },
        { Autor: { $regex: new RegExp(searchValue || "", "i") } },
        { Genero: { $regex: new RegExp(searchValue || "", "i") } },
        { Editorial: { $regex: new RegExp(searchValue || "", "i") } },
      ],
    });

    if (searchResults.length > 0) {
      // Si se encuentran libros, devuelve los datos
      res.json(searchResults);
    } else {
      res.status(404).json({ error: "notexist" }); // Cambia a un código de estado 404 para indicar que no se encontraron resultados
    }
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// LÓGICA PARA LA BÚSQUEDA DE LIBROS

app.get("/book/:ISBN", async (req, res) => {
  const { ISBN } = req.params;

  try {
    const libroEncontrado = await book.findOne({ ISBN: Number(ISBN) });
    if (libroEncontrado) {
      //Si se encuentra el libro, devuelve los datos
      res.json(libroEncontrado);
    } else {
      res.status(404).json({ error: "notexist" }); // Cambia a un código de estado 404 para indicar que no se encontró el recurso
    }
  } catch (e) {
    console.error("Error al buscar el libro", e);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

// PUERTO DE ESCUCHA
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
