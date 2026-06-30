
export default function TablaModelos({modelos, prepararEdicionModelo, eliminarModelo}) {
    return (
        <table border="1" cellPadding="10" style={{
            width: '100%',
            borderCollapse: 'collapse',
            textAlign: 'left',
            marginTop: '15px',
        }}>
            <thead>
                <tr style={{
                    backgroundColor: 'white',
                    borderBottom: '2px solid black',
                }}>
                    <th>Marca de vehículo</th>
                    <th>Nombre del modelo</th>
                    <th>Descripción</th>
                    <th>Acciones de Administrador</th>
                </tr>
            </thead>

            <body>
                {modelos.length === 0? (
                <tr>
                   <td colSpan="4" style={{
                    borderBottom: '1px solid black'
                   }}>No se encontraron modelos</td> 
                </tr>
                ): (
                    modelos.map((modelo) => (
                        <tr key={modelo.id}>
                            <td style={{
                            borderBottom: '1px solid black'
                           }}>{modelo.marca}</td>
                           <td style={{
                            color: 'gray'
                           }}>{modelo.descripcion}</td>
                           <td>
                            <button onClick={() => prepararEdicionModelo(modelo)} style={{
                                marginRight: '5px',
                                backgroundColor: 'blue',
                                color: 'white',
                                border: 'none',
                                padding: '6px 12px',
                                cursor: 'pointer',
                                borderRadius: '4px',
                                fontWeight: 'bold'
                            }}>Editar</button>

                            <button onClick={() => eliminarModelo(modelo.id)} style={{
                                backgroundColor: 'red',
                                color: 'white',
                                border: 'none',
                                padding: '6px 12px',
                                cursor: 'pointer',
                                borderRadius: '4px',
                                fontWeight: 'bold'
                            }}>Eliminar</button>
                           </td>
                        </tr>
                    ))
                )}
            </body>
        </table>
    );
}