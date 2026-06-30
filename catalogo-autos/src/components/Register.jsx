
import { useState } from "react";
import { validarCorreo,
         largoMinimo,
         contineMayuscula,
         contieneNumero,
         contieneCaracterEspecial,
         confirmarPassword } from "./Validadores";

function Register({ cerrar }) {
  const [usuario, setUsuario] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const correoValido = validarCorreo(correo);
  const passwordValido = largoMinimo(password);
  const mayusculaOk = contineMayuscula(password);
  const especialOk = contieneCaracterEspecial(password);
  const numeroOk = contieneNumero(password);
  const contraseñasCoinciden = 
        password !== "" &&
        confirmPassword !== "" &&
        confirmarPassword(password, confirmPassword);
  const formularioValido =
    usuario &&
    correoValido &&
    passwordValido &&
    mayusculaOk &&
    especialOk &&
    numeroOk &&
    contraseñasCoinciden;


  const registrarUsuario = (e) => {
    e.preventDefault();

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    if (!usuario || !correo || !password) {
      alert("Completa todos los campos");
      return;
    }

    if (!confirmarPassword(password, confirmPassword)) {
      alert("Las contraseñas no coinciden");
      return;
    }

    const nuevo = { nombre: usuario, correo, contraseña: password };

    usuarios.push(nuevo);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Bienvenido, tu cuenta ha sido creada");
    cerrar(); //cerrar el modal después de registrarse
  };

  return (
    <form onSubmit={registrarUsuario} className="modal-form modal-registro-form">
      <input
        placeholder="Nombre de Usuario"
        aria-label="Nombre de Usuario"
        value={usuario}
        onChange={(e) => setUsuario(e.target.value)}
      />
      <input
        placeholder="Correo Electrónico"
        aria-label="Correo Electrónico"
        value={correo}
        onChange={(e) => setCorreo(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña (min.8 caracteres)"
        aria-label="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirmar contraseña"
        aria-label="Confirmar contraseña"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <div className="validaciones">
        <label>
            <input type="checkbox" checked={correoValido} readOnly aria-label="Correo válido" />
            Correo válido
        </label>
        <label>
            <input type="checkbox" checked={passwordValido} readOnly aria-label="Contraseña mínimo 8 caracteres" />
            Contraseña mínimo 8 caracteres
        </label>
        <label>
            <input type="checkbox" checked={mayusculaOk} readOnly aria-label="Contiene mayúscula" />
            Contiene mayúscula
        </label>    
        <label>
            <input type="checkbox" checked={numeroOk} readOnly aria-label="Contiene número" />   
            Contiene número
        </label>
        <label>
            <input type="checkbox" checked={especialOk} readOnly aria-label="Contiene carácter especial" />
            Contiene carácter especial
        </label>
        <label>
            <input type="checkbox" checked={contraseñasCoinciden} readOnly aria-label="Las contraseñas coinciden" />
            Las contraseñas coinciden
        </label>
      </div>

      <div className="modal-acciones-registro">
        <button type="submit" className="boton-registrar-modal" disabled={!(formularioValido)}>
          Registrar
        </button>
        <button type="button" className="boton-volver-modal" onClick={cerrar}>
          Volver
        </button>
      </div>
    </form>
  );
}

export default Register;
