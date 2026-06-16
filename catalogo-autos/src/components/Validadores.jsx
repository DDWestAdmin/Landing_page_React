// Validadores.jsx

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