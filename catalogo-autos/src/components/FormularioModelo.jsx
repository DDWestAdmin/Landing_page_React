
const logos_marcas_permitidas = {
    Toyota: 'public/logos/toyota.png',
    Chevrolet: 'public/logos/chevrolet.png',
    Ford: 'public/logos/ford.png',
    Honda: 'public/logos/honda.png',
};

export default function FormularioModelo({ isOpen, form, manageCambioInput, saveModelo, claseModelo}) {
    if (!isOpen) {
        return null;
    }
//interfáz del modal para agregar un nuevo modelo de auto, 
// con campos para el nombre del modelo, año y marca. 
// Se utiliza un objeto logos_marcas_permitidas para mostrar los logos de las marcas permitidas en un select. 
// Al enviar el formulario, se llama a la función saveModelo y se cierra el modal con claseModelo.
    return (
        <div style={{
            position: 'fixed',
             top: 0,
             left: 0,
             width: '100%',
             height: '100%',
             backgroundColor: 'rgba(0, 0, 0, 0.5)',
             display: 'flex',
             justifyContent: 'center',
             alignItems: 'center',
             zIndex: 2000 
        }}>

        <div style={{
            background: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            maxWidth: '500px',
            width: '90%',
            boxSizing: 'border-box',
        }}>

        <h3 style={{
            marginTop: 0,
            color: 'white',
        }}>
        {form.id ? 'Editar descripción del modelo' : 'Agregar nuevo modelo'}
        </h3>

        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '15px',
            backgroundColor: '#f0f0f0',
            borderRadius: '6px',
            marginBottom: '15px',
            border: '1px solid black',
        }}>{logos_marcas_permitidas[form.marca] ? (
            <img 
            src={'/${logos_marcas_permitidas[form.marca]}'}
            alt={'Logo ${form.marca}'}
            style={{height: '55px', objectFit: 'contain'}}
            />
        ): (
            <span style={{color: 'red'}}>Logo no disponible</span>
        )}
        </div>

        <form onSubmit={saveModelo}>
            <div style={{marginBottom: '15px'}}>
                <label style={{display: 'block',
                    fontweight: 'bold',
                    marginBottom: '5px'
                    }}>Marca </label>
                <select name='marca' value={form.marca} onChange={manageCambioInput}>
                    <option value=''>Seleccionar marca</option>
                    {Object.keys(logos_marcas_permitidas).map((marca) => (
                        <option key={marca} value={marca}>
                            {marca}
                        </option>
                    ))}
                </select>
            </div>

            <div style={{marginBottom: '15px'}}>
                <label style={{display: 'block',
                    fontweight: 'bold',
                    marginBottom: '5px'
                    }}>Año </label>
                    <input type='text' name='nombre' required value={form.nombre} onChange={manageCambioInput} style={{
                        widht: '100%',
                        padding: '8px',
                        borderRadius: '4px',
                        border: '1px solid black',
                        boxsizing: 'border-box'
                    }}/>
            </div>

            <div style={{marginBottom: '15px'}}>
                <label style={{
                    display: 'block',
                    fontweight: 'bold',
                    marginBottom: '5px'
                }}>Descripción</label>
                <textarea name='descripcion' required value={form.descripcion} onChange={manageCambioInput} style={{
                    widht: '100%',
                    padding:'8px',
                    borderRadius: '4px',
                    border: '1px solid black',
                    boxsizing: 'border-box',
                    height: '80px',
                    resize: 'none'
                }}/>
            </div>

            <div style={{display:'flex', justifyConten: 'flex-end', gap: '10px'}}>
                <button type="button" onClick={claseModelo} style={{
                    padding: '8px 16px',
                    borderRadius: '4px',
                    border: '1px solid black',
                    backgroundColor: 'gray',
                    cursor: 'pointer',
                    resizee: 'none'
                }}>Cancelar</button>

                <button type="submit" style={{
                    padding: '8px 16px',
                    borderRadius: '4px',
                    border: '1px solid black',
                    backgroundColor: 'blue',
                    cursor: 'pointer',
                    rezise: 'none'
                }}>Guardar Cambios</button>
            </div>
        </form>
        </div>
        </div>
    );
}