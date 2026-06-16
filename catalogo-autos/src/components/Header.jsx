
function Header({ usuario, onAbrirAccesibilidad, onAbrirUsuario }) {
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
                    <button
                        className="header-usuario"
                        onClick={onAbrirUsuario}
                        type="button"
                        aria-label={`Ver usuario ${usuario.nombre}`}
                    >
                        {usuario.nombre}
                    </button>
                )}
            </h1>
        </header>
    );
}

export default Header;