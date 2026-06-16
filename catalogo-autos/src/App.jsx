
import { useState } from "react";
import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import Logos from "./components/Logos";
import Carrusel from "./components/Carrusel";
import Footer from "./components/Footer";
import "./styles/styles.css";

function App() {
  const [usuario, setUsuario] = useState(null);

  //modales registro e inicio de sesión
  const [mostrarLogin, setMostrarLogin] = useState(false);
  const [mostrarRegister, setMostrarRegister] = useState(false);

  return (
    <div className="app">
      <Header usuario={usuario} />

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