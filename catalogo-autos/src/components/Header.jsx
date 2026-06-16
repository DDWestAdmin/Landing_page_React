
function Header({usuario}) {
    return (
        <header>
            <h1>
                Catalogo de Autos
                {usuario && (
                    <span style={{marginleft: "10px"}}>
                        {usuario.nombre}
                    </span>
                )}
            </h1>
        </header>
    );
}

export default Header;