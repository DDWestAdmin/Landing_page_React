
function Header({ usuario, onAbrirAccesibilidad }) {
    return (
        <header>
            <button
                className="header-ajustes"
                onClick={onAbrirAccesibilidad}
                aria-label="Abrir ajustes de accesibilidad"
                type="button"
            >
                ⚙
            </button>
            <h1>
                Catalogo de Autos
                {usuario && (
                    <span style={{ marginLeft: "10px" }}>
                        {usuario.nombre}
                    </span>
                )}
            </h1>
        </header>
    );
}

export default Header;