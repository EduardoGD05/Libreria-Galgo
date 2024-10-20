import React, { useEffect, useState } from "react";
import BookItem from "../BookItem/BookItem"; 
import axios from "axios";
import { useLocation } from "react-router-dom";

const SearchPage = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const filtro = currentPath.replace("/search/", "");

  const [detallesLibros, setDetallesLibros] = useState([]);
  const [errorFetching, setErrorFetching] = useState(false);
  // const { filtro } = useParams(); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/search/${filtro}`);
        setDetallesLibros(res.data);
        setErrorFetching(false); // Reset error state on successful fetch
     
      } catch (error) {
        console.error("Error fetching data:", error);
        setDetallesLibros([]);
        setErrorFetching(true);
      }
    };

    // Llama a la función fetchData
    fetchData();
  }, [filtro]);
 

  return (
    <>
     {errorFetching ? (
       <div className="ErrorContent">
       <h1 className="Error" style={{fontSize:"130px"}}>Error</h1>
     <h1 className="Error">404</h1>
     <h1 className="ErrorText">No se encontró ningún</h1>
     </div>
      ) : (
        detallesLibros.map((detalleLibro) => (
          <BookItem
            key={detalleLibro.ISBN}
            Portada={detalleLibro.Portada}
            Titulo={detalleLibro.Titulo}
            Editorial={detalleLibro.Editorial}
            Autor={detalleLibro.Autor}
            Año={detalleLibro.Año}
            Lenguaje={detalleLibro.Lenguaje}
            Archivo={detalleLibro.PDF || detalleLibro.EPUB}
            Genero={detalleLibro.Genero}
            ISBN={detalleLibro.ISBN}
            PDF={detalleLibro.PDF}
            EPUB={detalleLibro.EPUB}
          />
        ))
      )}
    </>
  );
};

export default SearchPage;
