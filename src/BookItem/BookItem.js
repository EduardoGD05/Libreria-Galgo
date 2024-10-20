import React from "react";
import "./BookItem.css";
import bookPlaceholder from "../../src/assets/img/book-placeholder.png";
import { Placeholder } from "react-bootstrap";
import { Link } from "react-router-dom";

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

function BookItem({
  Titulo,
  Portada,
  Editorial,
  Autor,
  Año,
  Lenguaje,
  Archivo,
  Genero,
  ISBN,
  PDF,
  EPUB,
  IsLoggedIn
}) {
  return (
    <table style={{ width: "100%", height: "100%" }} className="resItemTable">
      <tbody>
        <tr className="bookRow">
          <td className="itemCover">
            <div>
              <div style={{ display: "block" }} className="portada">
                <Link to={ISBN !== undefined ? `/book/${ISBN}` : "/"}>
                  <img
                    alt=""
                    src={Portada !== undefined ? Portada : bookPlaceholder}
                    style={{ borderWidth: "1px", display: "inline" }}
                  />
                </Link>
              </div>
            </div>
          </td>
          <td className="td">
            <table style={{ width: "100%", height: "100%" }}>
              <tbody>
                <tr>
                  <td>
                    <h3 className="TextLabel">
                      <Link
                        to={ISBN !== undefined ? `/book/${ISBN}` : "/"}
                        className="TextLink"
                        id="BookItemTitle"
                      >
                        {Titulo ? (
                          Titulo
                        ) : (
                          <Placeholder animation="glow">
                            <Placeholder bg="dark" xs={11} size="lg" />
                          </Placeholder>
                        )}
                      </Link>
                    </h3>
                    <div style={{ color: "#333" }}>
                      <em className="TextLabel">Editorial: </em>
                      <Link
                        to={modificarString(Editorial)}
                        title="Encuentra todos los libros de la editorial"
                        className="TextLink"
                      >
                        {Editorial ? (
                          Editorial
                        ) : (
                          <Placeholder animation="glow">
                            <Placeholder bg="dark" xs={5} size="lg" />
                          </Placeholder>
                        )}
                      </Link>{" "}
                    </div>
                    <div className="authors">
                      <em className="TextLabel">Autor: </em>
                      <Link
                        to={modificarString(Autor)}
                        itemProp="author"
                        title="Encuentra todos los libros del autor"
                        className="TextLink"
                      >
                        {Autor ? (
                          Autor
                        ) : (
                          <Placeholder animation="glow">
                            <Placeholder bg="dark" xs={5} size="lg" />
                          </Placeholder>
                        )}
                      </Link>{" "}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td colSpan="99">
                    <div className="tags-container"></div>
                    <div className="bookDetailsBox">
                      <div className="bookProperty property_year">
                        <div className="property_label">Año:</div>
                        <div className="property_value ">
                          {Año ? (
                            Año
                          ) : (
                            <Placeholder animation="glow">
                              <Placeholder bg="dark" xs={9} size="lg" />
                            </Placeholder>
                          )}
                        </div>
                      </div>
                      <div className="bookProperty property_language">
                        <div className="property_label">Lenguaje:</div>
                        <div className="property_value text-capitalize">
                          {Lenguaje ? (
                            Lenguaje
                          ) : (
                            <Placeholder animation="glow">
                              <Placeholder bg="dark" xs={9} size="lg" />
                            </Placeholder>
                          )}
                        </div>
                      </div>
                      <div className="bookProperty property__file">
                        <div className="property_label">Archivo:</div>
                        <div className="property_value ">
                          {PDF && EPUB
                            ? "PDF/EPUB"
                            : PDF
                            ? "PDF"
                            : EPUB
                            ? "EPUB"
                            : "N/A"}
                        </div>
                      </div>
                      <div className="bookProperty property__genre">
                        <div className="property_label">Género:</div>
                        <div className="property_value ">
                          {Genero ? (
                            Genero
                          ) : (
                            <Placeholder animation="glow">
                              <Placeholder bg="dark" xs={9} size="lg" />
                            </Placeholder>
                          )}
                        </div>
                      </div>
                      <div className="bookProperty property__isbn">
                        <div className="property_label">ISBN:</div>
                        <div className="property_value ">
                          {ISBN ? (
                            ISBN
                          ) : (
                            <Placeholder animation="glow">
                              <Placeholder bg="dark" xs={9} size="lg" />
                            </Placeholder>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default BookItem;
