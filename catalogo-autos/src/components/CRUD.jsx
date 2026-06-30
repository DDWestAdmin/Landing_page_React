// Línea 1: Importamos el Hook de estado para dotar de reactividad y control al CRUD.
import { useState } from 'react';
import FormularioModelo from './FormularioModelo';

// Línea 2: Importamos las funciones lógicas y credenciales exactas desde tu capa de Validadores.
import { 
    validarAccesoAdmin, 
    consultaAPIAutos,
    validarCorreo,
    largoMinimo,
    contineMayuscula,
    contieneNumero,
    contieneCaracterEspecial
} from './Validadores';

export default function Administrador() {
    // Línea 3: Estados encargados de la captura y control del login del Administrador.
    const [credenciales, setCredenciales] = useState({ correo: '', clave: '' });
    const [usuarioAutenticado, setUsuarioAutenticado] = useState(null);

    // Línea 4: Estado base del catálogo local de vehículos (Función READ del CRUD).
    const [modelos, setModelos] = useState([
        { id: 1, marca: 'Toyota', nombre: '2024', descripcion: 'Sedán ecológico Corolla con motorización híbrida de alta eficiencia.' },
        { id: 2, marca: 'Chevrolet', nombre: '2023', descripcion: 'Deportivo Camaro SS con motor de gran potencia y transmisión manual.' }
    ]);

    // Línea 5: Estados para regir el objeto de formulario unificado, apertura del modal y filtros.
    const [form, setForm] = useState({ id: null, marca: '', nombre: '', descripcion: '' });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [busqueda, setBusqueda] = useState('');

    // Línea 6: Estados dedicados a la llamada asíncrona hacia el servicio API global (NHTSA).
    const [resultadosAPI, setResultadosAPI] = useState([]);
    const [cargandoAPI, setCargandoAPI] = useState(false);
    const [marcaSeleccionadaAPI, setMarcaSeleccionadaAPI] = useState('Toyota');

    // Línea 7: Contadores para la auditoría en tiempo real de los límites asignados a la sesión.
    const [modelosAnadidosSesion, setModelosAnadidosSesion] = useState(0);
    const [modelosEliminadosSesion, setModelosEliminadosSesion] = useState(0);

    // Línea 8: Captura la escritura en los inputs de acceso.
    const manageCambioLogin = (e) => {
        setCredenciales({ ...credenciales, [e.target.name]: e.target.value });
    };

    // Línea 9: Disparador del flujo de login que evalúa el formato estricto de tu contraseña antes de autenticar.
    const manejarLogin = (e) => {
        e.preventDefault();

        // Aplicamos tus validadores de formato de contraseña complejos
        if (!validarCorreo(credenciales.correo)) {
            alert('El correo electrónico ingresado no tiene un formato válido.');
            return;
        }
        if (!largoMinimo(credenciales.clave) || !contineMayuscula(credenciales.clave) || !contieneNumero(credenciales.clave) || !contieneCaracterEspecial(credenciales.clave)) {
            alert('La contraseña no cumple con la política de seguridad requerida (Mínimo 8 caracteres, mayúscula, número y carácter especial).');
            return;
        }

        const control = validarAccesoAdmin(credenciales.correo, credenciales.clave);
        if (control.valido) {
            setUsuarioAutenticado(control.usuario);
            alert(`Acceso verificado con éxito. Rol actual: ${control.usuario.rol}`);
        } else {
            alert(control.mensaje);
        }
    };

    // Línea 10: Desconecta al usuario del sistema restableciendo los parámetros de seguridad.
    const manejarLogout = () => {
        setUsuarioAutenticado(null);
        setCredenciales({ correo: '', clave: '' });
        setModelosAnadidosSesion(0);
        setModelosEliminadosSesion(0);
    };

    // Línea 11: Sincronizador de los campos de texto del vehículo (Requerido por el modal).
    const manageCambioInput = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const abrirModalParaCrear = () => {
        setForm({ id: null, marca: '', nombre: '', descripcion: '' });
        setIsModalOpen(true);
    };

    // Línea 12: Invocación asíncrona que consume la API global de tu archivo Validadores (NHTSA).
    const consultarModelosAPI = async () => {
        setCargandoAPI(true);
        try {
            const dataModelos = await consultaAPIAutos(marcaSeleccionadaAPI);
            setResultadosAPI(dataModelos);
            if (dataModelos.length === 0) {
                alert("No se encontraron registros en la API global para esta marca.");
            }
        } catch {
            alert("No se pudo establecer comunicación con el catálogo global.");
        } finally {
            setCargandoAPI(false);
        }
    };

    // Línea 13: Carga automática de modelos obtenidos desde internet al estado del formulario.
    const importarSugerenciaAPI = (nombreSugerido) => {
        setForm({
            id: null,
            marca: marcaSeleccionadaAPI,
            nombre: '2026', // Asigna por defecto un año simulado para cumplir con el campo
            descripcion: `Modelo real "${nombreSugerido}" verificado e importado desde la API pública de vehículos.`
        });
        setIsModalOpen(true);
    };

    // Línea 14: Lógica CRUD - Funciones de CREATE (Crear) y UPDATE (Actualizar) con límite de inserción.
    const saveModelo = (e) => {
        e.preventDefault();
        
        if (!form.marca) {
            alert('Por favor, seleccione una marca válida.');
            return;
        }

        if (form.id) {
            // Operación: UPDATE (Actualizar)
            const modelosEditados = modelos.map((m) => (m.id === form.id ? form : m));
            setModelos(modelosEditados);
            alert('¡Descripción del modelo modificada exitosamente!');
        } else {
            // Operación: CREATE (Crear) con restricción estricta de 3 inserciones por sesión
            if (modelosAnadidosSesion >= 3) {
                alert('Límite de sesión alcanzado: No puedes registrar más de 3 modelos de autos por sesión.');
                return;
            }
            const nuevoModelo = { ...form, id: Date.now() };
            setModelos([...modelos, nuevoModelo]);
            setModelosAnadidosSesion(modelosAnadidosSesion + 1);
            alert('¡Vehículo registrado en el catálogo local!');
        }
        setIsModalOpen(false);
    };

    const prepararEdicion = (modelo) => {
        setForm(modelo);
        setIsModalOpen(true);
    };

    // Línea 15: Lógica CRUD - Función DELETE (Eliminar) con límite de bajas por sesión.
    const eliminarModelo = (id) => {
        // Restricción: Máximo 2 eliminados por sesión
        if (modelosEliminadosSesion >= 2) {
            alert('Límite de sesión alcanzado: Solo tienes permitido eliminar un máximo de 2 modelos por sesión.');
            return;
        }
        setModelos(modelos.filter((m) => m.id !== id));
        setModelosEliminadosSesion(modelosEliminadosSesion + 1);
        alert('Modelo quitado del inventario.');
    };

    // Línea 16: Filtrado polivalente por tres criterios en paralelo (Marca, Año/Modelo o Descripción).
    const modelosFiltrados = modelos.filter((m) => {
        const query = busqueda.toLowerCase();
        return m.marca.toLowerCase().includes(query) || m.nombre.toLowerCase().includes(query) || m.descripcion.toLowerCase().includes(query);
    });

    // Línea 17: Renderizado Condicional: Pantalla de Login si no está verificado como Administrador.
    if (!usuarioAutenticado) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh', fontFamily: 'Arial, sans-serif' }}>
                <form onSubmit={manejarLogin} style={{ border: '1px solid #ccc', padding: '30px', borderRadius: '8px', width: '320px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', background: '#fff' }}>
                    <h3 style={{ textAlign: 'center', marginTop: 0, color: '#333' }}>Autenticación de Catálogo</h3>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Correo Electrónico:</label>
                        <input type="email" name="correo" required value={credenciales.correo} onChange={manageCambioLogin} placeholder="correo eléctronico" aria-label="Correo Electrónico" style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Contraseña:</label>
                        <input type="password" name="clave" required value={credenciales.clave} onChange={manageCambioLogin} placeholder="contraseña" aria-label="Contraseña" style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
                    </div>
                    <button type="submit" style={{ width: '100%', padding: '10px', background: 'blue', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Ingresar como Administrador</button>
                </form>
            </div>
        );
    }

    // Línea 18: Renderizado del Panel de Control CRUD del Administrador.
    return (
        <div style={{ padding: '30px', fontFamily: 'Segoe UI, Arial, sans-serif', maxWidth: '1000px', margin: '0 auto', color: '#333' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2>Panel de Control - Modo: {usuarioAutenticado.rol}</h2>
                <div>
                    <span style={{ marginRight: '15px', background: '#28a745', color: 'white', padding: '6px 12px', borderRadius: '20px', fontSize: '13px', fontWeight: 'bold' }}>Sesión: {usuarioAutenticado.correo}</span>
                    <button onClick={manejarLogout} style={{ background: 'gray', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}>Cerrar Sesión</button>
                </div>
            </div>

            {/* Monitor Auditor de límites de sesión */}
            <div style={{ padding: '12px', background: '#e9ecef', borderRadius: '6px', marginBottom: '25px', borderLeft: '5px solid blue' }}>
                <strong>Restricciones por Sesión de Administrador: </strong> 
                <span style={{ marginLeft: '15px' }}>Vehículos Creados: <b>{modelosAnadidosSesion} / 3</b></span>
                <span style={{ marginLeft: '25px' }}>Vehículos Eliminados: <b>{modelosEliminadosSesion} / 2</b></span>
            </div>

            {/* Conexión asíncrona externa hacia la API de tu archivo de Validadores */}
            <div style={{ padding: '20px', border: '1px solid #b8daff', borderRadius: '8px', marginBottom: '30px', backgroundColor: '#e2f0fe' }}>
                <h4 style={{ margin: '0 0 12px 0', color: '#004085' }}>Catálogo Mundial en Vivo (API de Vehículos NHTSA)</h4>
                <select value={marcaSeleccionadaAPI} onChange={(e) => setMarcaSeleccionadaAPI(e.target.value)} style={{ padding: '8px', marginRight: '12px', borderRadius: '4px', border: '1px solid #ced4da' }}>
                    {['Toyota', 'Chevrolet', 'Ford', 'Honda'].map(m => <option key={m} value={m}>{m}</option>)}
                </select>
                <button onClick={consultarModelosAPI} style={{ padding: '8px 16px', background: '#0056b3', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                    {cargandoAPI ? 'Consultando API...' : 'Buscar Modelos Reales'}
                </button>
                {resultadosAPI.length > 0 && (
                    <div style={{ marginTop: '15px', padding: '12px', background: '#fff', borderRadius: '6px', border: '1px solid #dee2e6' }}>
                        <p style={{ margin: '0 0 10px 0', fontSize: '13px', fontWeight: 'bold', color: '#495057' }}>Sugerencias encontradas (Haz clic en un modelo para cargarlo e iniciar su registro manual):</p>
                        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                            {resultadosAPI.map((auto, i) => (
                                <button key={i} onClick={() => importarSugerenciaAPI(auto.Model_Name)} style={{ background: '#f1f3f5', border: '1px solid #ced4da', padding: '6px 12px', borderRadius: '20px', cursor: 'pointer', fontSize: '13px' }}>{auto.Model_Name}</button>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Filtros locales y botón disparador del Modal */}
            <div style={{ display: 'flex', gap: '15px', marginBottom: '20px', justifyContent: 'space-between' }}>
                <input aria-label="Filtrar catálogo" type="text" placeholder="Filtrar catálogo local por marca, año o descripción..." value={busqueda} onChange={(e) => setBusqueda(e.target.value)} style={{ padding: '10px', width: '420px', borderRadius: '4px', border: '1px solid #ced4da' }} />
                <button onClick={abrirModalParaCrear} style={{ padding: '10px 20px', background: 'green', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>➕ Agregar nuevo modelo</button>
            </div>

            {/* Inyección modular de tu modal FormularioModelo utilizando exactamente la prop 'claseModelo' */}
            <FormularioModelo 
                isOpen={isModalOpen} 
                form={form} 
                manageCambioInput={manageCambioInput} 
                saveModelo={saveModelo} 
                claseModelo={() => setIsModalOpen(false)} 
            />

            {/* Tabla de Lectura (READ) interactiva del CRUD */}
            <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', marginTop: '15px', border: '1px solid #ccc' }}>
                <thead>
                    <tr style={{ background: '#f8f9fa' }}>
                        <th>Marca</th><th>Año / Modelo</th><th>Descripción Corta</th><th>Acciones Administrativas</th>
                    </tr>
                </thead>
                <tbody>
                    {modelosFiltrados.length === 0 ? (
                        <tr><td colSpan="4" style={{ textAlign: 'center', color: '#6c757d' }}>No existen coincidencias registradas.</td></tr>
                    ) : (
                        modelosFiltrados.map((m) => (
                            <tr key={m.id}>
                                <td style={{ fontWeight: 'bold' }}>{m.marca}</td><td>{m.nombre}</td><td>{m.descripcion}</td>
                                <td>
                                    <button onClick={() => prepararEdicion(m)} style={{ marginRight: '8px', background: '#ffc107', border: 'none', padding: '6px 12px', cursor: 'pointer', borderRadius: '4px', fontWeight: 'bold' }}>Editar</button>
                                    <button onClick={() => eliminarModelo(m.id)} style={{ background: '#dc3545', color: '#fff', border: 'none', padding: '6px 12px', cursor: 'pointer', borderRadius: '4px', fontWeight: 'bold' }}>Eliminar</button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}