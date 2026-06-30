function Header({
    usuario,
    onAbrirAccesibilidad,
    onAbrirUsuario,
    onAbrirLogin,
    onAbrirRegister,
    onAbrirAdmin
}) {
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
                {!usuario && (
                    <div className="header-acciones">
                        <button
                            className="header-boton header-boton-login"
                            onClick={onAbrirLogin}
                            type="button"
                        >
                            Iniciar Sesión
                        </button>
                        <button
                            className="header-boton header-boton-registro"
                            onClick={onAbrirRegister}
                            type="button"
                        >
                            Registrarse
                        </button>
                        <button
                            className="header-boton header-boton-admin"
                            onClick={onAbrirAdmin}
                            type="button"
                        >
                            Administrador
                        </button>
                    </div>
                )}
        </header>
    );
}

export default Header;