import "./BookCard.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import bookPlaceholder from "../../src/assets/img/book-placeholder.png";
import "./BookCard.css";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function BookCard({ Titulo, Portada, Sinopsis, ISBN }) {
  const navigate = useNavigate();

  const popover = (
    <Popover>
      <Popover.Header as="h3" className="Title">
        {Titulo}
      </Popover.Header>
      <Popover.Body>
        <p className="LibroSinopsis">{Sinopsis}</p>
      </Popover.Body>
    </Popover>
  );

  const open = async (e) => {
    e.preventDefault();
    // Llamada a la API con el ISBN del libro
    try {
      const res = await axios.get(`http://localhost:3000/book/${ISBN}`);
      navigate(`/book/${res.data.ISBN}`); // Asumiendo que res.data.ISBN es el valor correcto
    } catch (error) {
      console.error(error);
      alert("Error");
    }
  };
  return (
    <Card className="LibroDesc">
      <OverlayTrigger
        trigger={["focus", "hover"]}
        placement="bottom"
        overlay={popover}
      >
        <Card.Img
          variant="top"
          src={Portada !== undefined ? Portada : bookPlaceholder}
          className="Portada"
          style={{ width: "150px", height: "225px" }}
        />
      </OverlayTrigger>
      <Button
        variant="primary"
        className="Button"
        style={{ width: "150px" }}
        onClick={open}
      >
        Ver más
      </Button>
    </Card>
  );
}
export default BookCard;
