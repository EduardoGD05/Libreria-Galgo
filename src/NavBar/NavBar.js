import React, { useState } from "react";
import "./NavBar.css";
import { Form, Button, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import Logo from "../../src/assets/img/LogoGalgo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

function NavScroll() {
  const { isLoggedIn, logout } = useAuth();
  const [searchValue, setSearchValue] = useState("");
  const [detallesLibros, setDetallesLibros] = useState([]);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const navigate = useNavigate();

  const search = async () => {
    try {
      if (searchValue.trim() !== "") {
        const res = await axios.get(
          `http://localhost:3000/search/${searchValue || ""}`
        );

        if (res.data.length > 0) {
          setDetallesLibros(res.data);
          navigate(`/search/${searchValue}`);
        } else {
          alert("No se encontraron resultados");
        }
      } else {
        navigate("/search/");
      }
    } catch (error) {
      console.error(error);
      alert("Ocurrió un error durante la búsqueda");
    }
  };

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logout();
      // Puedes agregar lógica adicional después de cerrar sesión si es necesario
    } catch (error) {
      console.error("Error durante el cierre de sesión:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <Navbar className="Navbar" expand="lg">
      <Link to="/" id="Home">
        <Button className="NavBarTitle" variant="outline-success">
          <img src={Logo} alt="Librería Galgo Logo" className="logo-image" />
          Librería Galgo
        </Button>
      </Link>
      <div className="search-container ">
      <Form className="d-flex align-items-center flex-grow-1">
          <Form.Control
            value={searchValue}
            type="search"
            placeholder="Inserte el Autor, Libro o Género del libro que desea buscar"
            className="FormControl"
            aria-label="Search"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                search();
              }
            }}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
          />
        </Form> 
          <Button
            className="SearchButton"
            variant="outline-success"
            onClick={search}
          >
            Buscar
          </Button> 
        </div>
         <Navbar.Toggle aria-controls="responsive-navbar-nav" id="toggle" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="Nav" navbarScroll>
          <Nav.Link href="/crear-cuenta" className="navbar-item">
            Crear Cuenta
          </Nav.Link>
          <Nav.Link href="/iniciar-sesion" className="navbar-item">
            Iniciar Sesión
          </Nav.Link>
          <Nav.Link
            className="navbar-item"
            onClick={handleLogout}
            disabled={!isLoggedIn || isLoggingOut}
          >
            Cerrar Sesión
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavScroll;
