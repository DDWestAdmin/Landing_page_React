// Validadores.jsx
//conexión con servicio de API global de vehículos (NHTSA BvPIC)

export const consultaAPIAutos = async (marca) => {
    try {
        // Realizar la solicitud a la API
        const response = await fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformake/${marca}?format=json`);
        // Verificar si la respuesta es exitosa
        if (!response.ok) {
            throw new Error('Error en la solicitud a la API');
        }
        // Obtener los datos en formato JSON
        const data = await response.json();
        //Validar si la API devolvió resultados estructurados correctamente
        if (data && data.Results) {
            return data.Results.slice(0,5); // Retornar solo los primeros 5 resultados
        }

        return []; // Retornar un arreglo vacío si no hay resultados
    } catch (error) {
        console.error('Fallo de conexión con API', error);
        throw error; // Propagar el error para que pueda ser manejado por el llamador
    }
};

// Validador de correo electrónico
export const validarCorreo = (correo) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(correo);
};

// Validador largo mínimo de nombre de usuario
export const validarLargoNombre = (usuario) => {
    return usuario.length >= 5;
};

// Validador de largo mínimo de contraseña
export const largoMinimo = (password) => {
    return password.length >= 8;
};

// Validador de carácter en mayúscula
export const contineMayuscula = (password) => {
    return /[A-Z]/.test(password);
};

// Validador de carácter numérico
export const  contieneNumero = (password) => {
    return /[0-9]/.test(password);
};

// Validador de carácter especial
export const contieneCaracterEspecial = (password) => {
    return /[!@#$%^&*(),.?":{}|<>]/.test(password);
};

// Validador confirmar contraseña
export const confirmarPassword = (password, confirmPassword) => {
    return password === confirmPassword;
}; 

//Objeto Administrador
export const credencialesAdministrador = {
    correo:'admin@correo.cl',
    password: 'Adm1n.#1str4d0r',
    rol: 'administrador'
};

//Validar inicio de sesión del administrador
export const validarAccesoAdmin = (correo, clave) => {
    if (correo === credencialesAdministrador.correo && clave === credencialesAdministrador.password) 
        { return({ valido: true, usuario: credencialesAdministrador }); }
    return {valido: false, mensaje: 'Correo o contraseña incorrectos'};
};

