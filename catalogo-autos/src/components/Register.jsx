
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
    <form onSubmit={registrarUsuario}>
      <input placeholder="Nombre de Usuario" onChange={(e) => setUsuario(e.target.value)} />
      <input placeholder="Correo Electrónico" onChange={(e) => setCorreo(e.target.value)} />
      <input
        type="password"
        placeholder="Contraseña (min.8 caracteres)"
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirmar contraseña"
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <div className="validaciones">
        <label>
            <input type="checkbox" checked={correoValido} readOnly />
            Correo válido
        </label>
        <label>
            <input type="checkbox" checked={passwordValido} readOnly />
            Contraseña mínimo 8 caracteres
        </label>
        <label>
            <input type="checkbox" checked={mayusculaOk} readOnly />
            Contiene mayúscula
        </label>    
        <label>
            <input type="checkbox" checked={numeroOk} readOnly />   
            Contiene número
        </label>
        <label>
            <input type="checkbox" checked={especialOk} readOnly />
            Contiene carácter especial
        </label>
        <label>
            <input type="checkbox" checked={contraseñasCoinciden} readOnly />
            Las contraseñas coinciden
        </label>
      </div>

      <button type="submit" disabled={!(formularioValido)}>
        Registrar
      </button>
      <button onClick={cerrar}>Volver</button>
    </form>
  );
}

export default Register;
