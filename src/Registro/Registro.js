import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import "./Registro.css";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [NombreUsuario, setNombreUsuario] = useState("");
  const [Correo, setCorreo] = useState("");
  const [Contraseña, setContraseña] = useState("");
  const [ConfirmarContraseña, setConfirmarContraseña] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    //Condición para validar contraseñas
    if (Contraseña !== ConfirmarContraseña) {
      alert("Las contraseñas no coinciden");
      setContraseña("");
      setConfirmarContraseña("");
      return;
    }

    //Condición para que la contraseña sea minimo de 8 caracteres
    const minLength = 8;
    if (Contraseña.length < minLength) {
      alert(`La contraseña debe tener al menos ${minLength} caracteres.`);
      setContraseña("");
      setConfirmarContraseña("");
      return;
    }

    //Condición para verificar que el correo incluya @gmail.com al final
    if (!Correo.toLowerCase().includes("@gmail.com")) {
      alert("El correo electrónico debe ser de formato @gmail.com");
      setCorreo("");
      return;
    }

    //Llamada al mongo.js, para recolección de datos y validaciones
    try {
      const res = await axios.post("http://localhost:3000/crear-cuenta", {
        NombreUsuario: NombreUsuario.trim(),
        Correo: Correo.toLowerCase().trim(),
        Contraseña,
      });

      if (res.data === "exist") {
        alert("Usuario ya existe");
      } else if (res.data === "notexist") {
        alert("Usuario creado exitosamente");

        //Restablecimiento de valores
        setNombreUsuario("");
        setCorreo("");
        setContraseña("");
        setConfirmarContraseña("");

        navigate("/iniciar-sesion");
      }
    } catch (error) {
      console.error(error);
      alert("Error durante el registro.");
    }
  };

  return (
    <div>
      <h1 className="S-title"> Crear Cuenta </h1>
      <Form id="FormSignup">
        <Form.Group className="S-format">
          <Form.Group className="S-subtitle">
            <Form.Label> Ingresar nombre de usuario</Form.Label>
          </Form.Group>

          <Form.Group>
            <Form.Control
              className="S-entry"
              style={{}}
              type="text"
              onChange={(e) => {
                setNombreUsuario(e.target.value);
              }}
              placeholder="Usuario"
              value={NombreUsuario}
            />
          </Form.Group>

          <Form.Group itemID="Email" className="S-subtitle">
            <Form.Label> Ingresar correo electrónico</Form.Label>
          </Form.Group>

          <Form.Group>
            <Form.Control
              className="S-entry"
              type="email"
              onChange={(e) => {
                setCorreo(e.target.value);
              }}
              placeholder="Correo Electrónico"
              value={Correo}
            />
          </Form.Group>

          <Form.Group className="S-subtitle">
            <Form.Label>Contraseña </Form.Label>
          </Form.Group>

          <Form.Group>
            <Form.Control
              className="S-entry"
              type="password"
              onChange={(e) => {
                setContraseña(e.target.value);
              }}
              placeholder="Contraseña"
              value={Contraseña}
            />
          </Form.Group>

          <Form.Group className="S-subtitle">
            <Form.Label>Confirmar contraseña </Form.Label>
          </Form.Group>

          <Form.Group>
            <Form.Control
              className="S-entry"
              type="password"
              placeholder="Contraseña"
              onChange={(e) => {
                setConfirmarContraseña(e.target.value);
              }}
              value={ConfirmarContraseña}
            />
          </Form.Group>
          <Button
            style={{}}
            variant="primary"
            className="S-buttonSignup"
            type="submit"
            onClick={submit}
          >
            Registrarse
          </Button>
        </Form.Group>
      </Form>

      <div></div>
    </div>
  );
}
export default Signup;
