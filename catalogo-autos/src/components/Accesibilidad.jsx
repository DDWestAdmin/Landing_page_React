function Accesibilidad({
  abierto,
  onCerrar,
  tamanoPagina,
  onCambiarTamano,
  tema,
  onCambiarTema,
}) {
  const cambiarTamano = (evento) => {
    onCambiarTamano(evento.target.value);
  };

  const activarTemaClaro = () => {
    onCambiarTema("claro");
  };

  const activarTemaOscuro = () => {
    onCambiarTema("oscuro");
  };

  if (!abierto) {
    return null;
  }

  return (
    <div className="modal" onClick={onCerrar}>
      <div className="modal-contenido modal-ajustes" onClick={(e) => e.stopPropagation()}>
        <div className="modal-vertical">
          <h2>Accesibilidad</h2>

          <label className="modal-form">
            Tamaño de página
            <select value={tamanoPagina} onChange={cambiarTamano}>
              <option value="0.9">Pequeña</option>
              <option value="1">Mediana</option>
              <option value="1.1">Grande</option>
            </select>
          </label>

          <div className="modal-form">
            <span>Color de página y modales</span>
            <div className="modal-opciones">
              <button
                type="button"
                onClick={activarTemaClaro}
                className={tema === "claro" ? "activo" : ""}
              >
                Tema_Claro
              </button>
              <button
                type="button"
                onClick={activarTemaOscuro}
                className={tema === "oscuro" ? "activo" : ""}
              >
                Tema_Oscuro
              </button>
            </div>
          </div>

          <button type="button" onClick={onCerrar}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}

export default Accesibilidad;