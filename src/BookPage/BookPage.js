import "./BookPage.css";
import Button from "react-bootstrap/Button";
import bookPlaceholder from "../../src/assets/img/book-placeholder.png";
import { useState, useParams, useEffect } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Placeholder from "react-bootstrap/Placeholder";
import { useAuth } from "../AuthContext";

function modificarString(inputString) {
  // Check if inputString is defined
  if (inputString === undefined || inputString === null) {
    return ""; // Return an empty string or handle it as appropriate for your case
  }

  // Quitar espacios, llenar con "-", y convertir a minúsculas
  const modifiedString = inputString.replace(/\s+/g, " ").toLowerCase();

  // Agregar una diagonal al principio del string
  const stringWithDiagonal = "/search/" + modifiedString;

  return stringWithDiagonal;
} 

const BookPage = () => {
  const [detallesLibro, setDetallesLibro] = useState({});
  const [errorFetching, setErrorFetching] = useState(false);
  const{isLoggedIn} = useAuth();
  const location = useLocation();
  const currentPath = location.pathname;
  const varPath = currentPath.replace("/book/", "");

  const navigate = useNavigate();
 
  const handleDescargarLibroPDF = () => {
    try {
      if (isLoggedIn) {
        window.open(detallesLibro.PDF, "_blank");
      } else {
        // Redirigir a la página de inicio de sesión si no está iniciado en sesión
        navigate("/iniciar-sesion", { state: { fromBook: "/book/yourBookISBN" } });
      }
    } catch (error) {
      console.error("Error al abrir la página de Google Drive:", error);
    }
  };

  const handleDescargarLibroEPUB = () => {
    try {
      if (isLoggedIn) {
        window.open(detallesLibro.EPUB, "_blank");
      } else {
        // Redirigir a la página de inicio de sesión si no está iniciado en sesión
        navigate("/iniciar-sesion", { state: { fromBook: "/book/yourBookISBN" } });
      }
    } catch (error) {
      console.error("Error al abrir la página de Google Drive:", error);
    }
  };

  useEffect(() => {
    const buscarLibro = async (ISBN) => {
      try {
        const res = await axios.get(`http://localhost:3000/book/${ISBN}`);
        setDetallesLibro(res.data);
      } catch (error) {
        console.error("Error fetching book details:", error);
        setErrorFetching(true); // Establecer el estado de error
      }
    };
    buscarLibro(varPath);
  }, [varPath, isLoggedIn]);

  return (
    <table style={{ width: "100%", height: "100%" }} className="resItemTable">
      <tbody> 
        {errorFetching ? (
          <tr className="bookRow">
            <td className="td" colSpan="99" style={{ textAlign: "center" }}>
              <div className="ErrorContent">
                <h1 className="Error" style={{fontSize:"130px"}}>Error</h1>
              <h1 className="Error">404</h1>
              <h1 className="ErrorText">Libro no encontrado</h1>
              </div>
            </td>
          </tr>
        ) : (
          <>
            <tr className="bookRow">
              <td className="td" colSpan="99" style={{ textAlign: "center" }}>
                <h1
                  className="PageTitle"
                  style={{ maxWidth: "800px", margin: "0 auto" }}
                >
                  {detallesLibro.Titulo ? (
                    detallesLibro.Titulo
                  ) : (
                    <Placeholder animation="glow">
                      <Placeholder bg="dark" xs={9} size="lg" />
                    </Placeholder>
                  )}
                </h1>
              </td>
            </tr>
        <tr className="bookRow">
          <td
            className="itemCover"
            colSpan="99"
            style={{ textAlign: "center" }}
          >
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div>
                <img
                  src={
                    detallesLibro.Portada !== undefined
                      ? detallesLibro.Portada
                      : bookPlaceholder
                  }
                  style={{ borderWidth: "1px", display: "inline" }}
                  className="portada"
                />
              </div>
            </div>
          </td>
        </tr>
        <tr className="bookRow">
          <td className="td" colSpan="99" style={{ textAlign: "center" }}>
            <div className="PageDesc">
              <div style={{ color: "#333" }}>
                <a>Editorial: </a>

                <Link
                  className="TextLink"
                  to={modificarString(detallesLibro.Editorial)}
                  title="Encuentra todos los libros de la editorial"
                >
                  {detallesLibro.Editorial ? (
                    detallesLibro.Editorial
                  ) : (
                    <Placeholder animation="glow">
                      <Placeholder bg="dark" xs={5} size="lg" />
                    </Placeholder>
                  )}
                </Link>
              </div>
              <div>
                <a>Autor: </a>

                <Link
                  className="TextLink"
                  to={modificarString(detallesLibro.Autor)}
                  itemprop="author"
                  title="Encuentra todos los libros del autor"
                >
                  {detallesLibro.Autor ? (
                    detallesLibro.Autor
                  ) : (
                    <Placeholder animation="glow">
                      <Placeholder bg="dark" xs={6} size="lg" />
                    </Placeholder>
                  )}
                </Link>
              </div>
              <div className="tags-container"></div>
              <div className="bookDetailsBox">
                <div className="bookProperty property_year">
                  <div className="prop_label">Año:</div>

                  <div className="property_value">
                    {detallesLibro.Año ? (
                      detallesLibro.Año
                    ) : (
                      <Placeholder as="p" animation="glow">
                        <Placeholder bg="dark" xs={10} />
                      </Placeholder>
                    )}
                  </div>
                </div>
                <div className="bookProperty property_language">
                  <div className="prop_label">Lenguaje:</div>

                  <div className="property_value text-capitalize">
                    {detallesLibro.Lenguaje ? (
                      detallesLibro.Lenguaje
                    ) : (
                      <Placeholder as="p" animation="glow">
                        <Placeholder bg="dark" xs={10} />
                      </Placeholder>
                    )}
                  </div>
                </div>
                <div className="bookProperty property__file">
                  <div className="prop_label">Archivo:</div>
                  <div className="property_value">
                    {detallesLibro.PDF && detallesLibro.EPUB
                      ? "PDF/EPUB"
                      : detallesLibro.PDF
                      ? "PDF"
                      : detallesLibro.EPUB
                      ? "EPUB"
                      : "N/A"}
                  </div>
                </div>
              </div>
            </div>
          </td>
        </tr>
        <tr className="bookRow">
          <td>
            <div className="TextBox">
              <h4 className="PageSubtitle">Sinópsis</h4>

              <p className="PageSynop">
                {detallesLibro.Sinopsis ? (
                  detallesLibro.Sinopsis
                ) : (
                  <Placeholder as="p" animation="glow">
                    <Placeholder bg="dark" xs={11} className="PageSynopPH" />
                    <Placeholder bg="dark" xs={11} className="PageSynopPH" />
                    <Placeholder bg="dark" xs={11} className="PageSynopPH" />
                    <Placeholder bg="dark" xs={11} className="PageSynopPH" />
                  </Placeholder>
                )}
              </p>
            </div>
          </td>
        </tr>
        <tr className="bookRow">
          <td>
            <h4 className="PageSubtitle">Descargar el libro</h4>
            <div className="DownloadButtons">
              <Button
                className="PDF"
                onClick={() => handleDescargarLibroPDF(detallesLibro.PDF)}
              >
                PDF
              </Button>
              <Button
                className="EPUB"
                onClick={() => handleDescargarLibroEPUB(detallesLibro.EPUB)}
              >
                EPUB
              </Button>
            </div>
          </td> 
        </tr> 
        </>
        )} 
      </tbody> 
    </table> 
  );
  
};


export default BookPage;
