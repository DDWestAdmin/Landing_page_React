
import { useState } from "react";

function Login({ setUsuario, cerrar }) {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const formularioInvalido = 
        correo === "" || password === "";

  const iniciarSesion = () => {
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const user = usuarios.find(
      (u) => u.correo === correo && u.contraseña === password
    );

    if (user) {
      localStorage.setItem("usuarioActivo", JSON.stringify(user));
      setUsuario(user);
      alert("Bienvenido");
      cerrar(); //cerrar el modal después de iniciar sesión
    } else {
      alert("Error en validar usuario, intenar de nuevo");
    }
  };

  return (
    <div>
      <input placeholder="Correo Electrónico" onChange={(e) => setCorreo(e.target.value)} />
      <input
        type="password"
        placeholder="Contraseña (min.8 caracteres)"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={iniciarSesion} 
              disabled={formularioInvalido}>
        Login
      </button>
      <button onClick={cerrar}>Volver</button>
    </div>
  );
}

export default Login;
