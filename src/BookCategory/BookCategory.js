import React, { useEffect, useState } from "react";
import BookCard from "../BookCard/BookCard";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const BookCategory = ({ genero }) => {
  const [detallesLibros, setDetallesLibros] = useState([]);
  const [slidesToShow, setSlidesToShow] = useState(getSlidesToShow());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = genero
          ? `http://localhost:3000/?genero=${genero}`
          : "http://localhost:3000/";
        const res = await axios.get(url);
        setDetallesLibros(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Call the fetchData function
    fetchData();
  }, [genero]);

  useEffect(() => {
    const handleResize = () => {
      setSlidesToShow(getSlidesToShow());
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function getSlidesToShow() {
    const windowWidth = window.innerWidth;
    if (windowWidth >= 750) {
      return 4;
    } else if (windowWidth >= 580) {
      return 3;
    } else {
      return 2;
    }
  }

  const settings = {
    dots: false,
    infinite: true,
    maxWidth: 900, 
    speed: 500,
    slidesToShow: getSlidesToShow(),
    slidesToScroll: 2,
    arrows: true,
    style: {
      margin: "0px 25px",
    },
  };

  const containerStyle = {
    background: "#62ac97",
    width: "100%",
    minWidth: "400px",
    maxWidth: "900px",
    height: "350px",
    margin: "0px auto 20px auto",
  };

  if (detallesLibros.length <= 4) {
     return null;
  }

const subStyle = {
  display: "flex",
  justifyContent: "center", // Centra horizontalmente
  alignItems: "center", // Centra verticalmente
  margin: "auto",
  left: "100px",
  right: "100px",
  fontWeight: "200",
  background: "#fff",
  maxWidth: "900px",
  minWidth: "400px",
  borderTop: "2px solid #62ac97",
  borderLeft: "2px solid #62ac97",
  borderRight: "2px solid #62ac97",
  marginTop: "5px",
  color: "#62ac97", 
}
  return (
    <>
    <h1 style={subStyle}>{genero}</h1>
      <div className="CategoryContainer" style={containerStyle}>
        <Slider {...settings}>
          {detallesLibros.map((detalleLibro) => (
            <div key={detalleLibro.ISBN}>
              <BookCard
                key={detalleLibro.ISBN}
                Portada={detalleLibro.Portada}
                Titulo={detalleLibro.Titulo}
                Editorial={detalleLibro.Editorial}
                Autor={detalleLibro.Autor}
                Sinopsis={detalleLibro.Sinopsis}
                Genero={detalleLibro.Genero}
                ISBN={detalleLibro.ISBN}
              />
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
};

export default BookCategory;
