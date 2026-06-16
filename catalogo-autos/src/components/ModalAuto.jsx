

function ModalAuto({ auto, cerrar }) {
  return (
    <div className="modal" onClick={cerrar}>
      
      <div
        className="modal-contenido"
        onClick={(e) => e.stopPropagation()}
      >

        <img src={auto.img} alt="Auto" className="modal-img" />

        <div className="modal-text">
          <p>{auto.desc}</p>

          <button onClick={cerrar}>Volver</button>
        </div>

      </div>
    </div>
  );
}

export default ModalAuto;
