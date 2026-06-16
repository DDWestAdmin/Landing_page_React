
import { useEffect, useState } from "react";
import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import Logos from "./components/Logos";
import Carrusel from "./components/Carrusel";
import Accesibilidad from "./components/Accesibilidad";
import Footer from "./components/Footer";
import "./styles/styles.css";

function App() {
  const [usuario, setUsuario] = useState(null);
  const [mostrarAccesibilidad, setMostrarAccesibilidad] = useState(false);
  const [mostrarUsuarioModal, setMostrarUsuarioModal] = useState(false);
  const [tamanoPagina, setTamanoPagina] = useState("1");
  const [tema, setTema] = useState("claro");

  //modales registro e inicio de sesión
  const [mostrarLogin, setMostrarLogin] = useState(false);
  const [mostrarRegister, setMostrarRegister] = useState(false);

  useEffect(() => {
    if (usuario) {
      setMostrarUsuarioModal(true);
    }
  }, [usuario]);

  useEffect(() => {
    const colores =
      tema === "oscuro"
        ? { pagina: "#3a3a3a", modal: "#4e4e4e", texto: "#ffffff" }
        : { pagina: "#d3d3d3", modal: "#f2f2f2", texto: "#111111" };

    document.body.style.setProperty("--page-bg", colores.pagina);
    document.body.style.setProperty("--modal-bg", colores.modal);
    document.body.style.setProperty("--modal-text", colores.texto);

    return () => {
      document.body.style.removeProperty("--page-bg");
      document.body.style.removeProperty("--modal-bg");
      document.body.style.removeProperty("--modal-text");
    };
  }, [tema]);

  return (
    <div className="app" style={{ zoom: tamanoPagina }}>
      <Header
        usuario={usuario}
        onAbrirAccesibilidad={() => setMostrarAccesibilidad(true)}
        onAbrirUsuario={() => setMostrarUsuarioModal(true)}
      />

      {!usuario && (
        <div className="formulario">
          <button
            className="boton-loin"
            onClick={() => setMostrarLogin(true)}>
              Iniciar Sesión
          </button>
          
          <button
          className="boton-register"
          onClick={() => setMostrarRegister(true)}>
            Registrarse
          </button>
        </div>
      )}

      <Carrusel />

      <Accesibilidad
        abierto={mostrarAccesibilidad}
        onCerrar={() => setMostrarAccesibilidad(false)}
        tamanoPagina={tamanoPagina}
        onCambiarTamano={setTamanoPagina}
        tema={tema}
        onCambiarTema={setTema}
      />

      {mostrarUsuarioModal && usuario && (
        <div className="modal" onClick={() => setMostrarUsuarioModal(false)}>
          <div
            className="modal-contenido modal-usuario"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-vertical">
              <h2>Sesión iniciada</h2>
              <p>Usuario: {usuario.nombre}</p>
              <button type="button" onClick={() => setMostrarUsuarioModal(false)}>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {mostrarLogin && (
        <div className="modal" onClick={() => setMostrarLogin(false)}>
          <div
            className="modal-contenido"
            onClick={(e) => e.stopPropagation()}>
              <Login
                setUsuario={setUsuario}
                cerrar={() => setMostrarLogin(false)}
              />
          </div>
            </div>
      )}
      
      {mostrarRegister && (
        <div className="modal" onClick={() => setMostrarRegister(false)}>
          <div
            className="modal-contenido"
            onClick={(e) => e.stopPropagation()}>
              <Register
                cerrar={() => setMostrarRegister(false)}
              />
          </div>
            </div>
      )}

      <Logos />

      <Footer />
    </div>
  );
} 

export default App;