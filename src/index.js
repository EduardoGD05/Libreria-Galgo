import React from "react";
import ReactDOM from "react-dom/client";
// import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./InicioSesion/InicioSesion.js";
import Signup from "./Registro/Registro.js";
import NavScroll from "./NavBar/NavBar";
import reportWebVitals from "./reportWebVitals";
import BookPage from "./BookPage/BookPage.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SearchPage from "./SearchPage/SearchPage.js";
import BookCategory from "./BookCategory/BookCategory.js";
import { AuthProvider } from "./AuthContext";
 

const introStyle = {
  display: "flex",
  justifyContent: "center", // Centra horizontalmente
  alignItems: "center", // Centra verticalmente
  margin: "auto",
  left: "100px",
  right: "100px",
  fontWeight: "1000",
  padding: "20px",
  background: "#208454",
  maxWidth: "900px",
  minWidth: "400px",
  color: "#fff",
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
    <BrowserRouter>
      <header>
        <NavScroll />
      </header>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <h1 style={introStyle}>Bienvenido a la Librería Galgo </h1>
               <BookCategory genero="Novela" /> 
               <BookCategory genero="Tragedia" /> 
               <BookCategory genero="Ciencia Ficción" />
               <BookCategory genero="Ficción Histórica" />
               <BookCategory genero="Ficción Gótica" />
               <BookCategory genero="Terror" />
            </div>
          }
        />
        <Route path="/book/:ISBN" element={<BookPage />} />
        <Route path="/search/" element={<SearchPage />} />
        <Route path="/search/:searchValue" element={<SearchPage />} />
        <Route path="/iniciar-sesion" element={<Login />} />
        <Route path="/crear-cuenta" element={<Signup />} />
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
