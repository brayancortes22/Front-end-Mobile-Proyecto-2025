// Validaciones para el login institucional

/**
 * Valida si el email es un correo institucional del SENA
 * @param email - Email a validar
 * @returns true si es un email institucional válido
 */
export const isSenaEmail = (email: string): boolean => {
  if (!email) return false;
  
  const senaEmailRegex = /^[a-zA-Z0-9._%+-]+@(soy\.sena\.edu\.co|sena\.edu\.co)$/;
  return senaEmailRegex.test(email.toLowerCase().trim());
};

/**
 * Valida si la contraseña cumple con los requisitos mínimos
 * @param password - Contraseña a validar
 * @returns true si la contraseña es válida
 */
export const isValidPassword = (password: string): boolean => {
  if (!password) return false;
  
  // Mínimo 8 caracteres
  return password.length >= 8;
};

/**
 * Valida si un número de identificación es válido
 * @param identification - Número de identificación
 * @returns true si es válido
 */
export const isValidIdentification = (identification: string): boolean => {
  if (!identification) return false;
  
  // Solo números y mínimo 6 dígitos
  const identificationRegex = /^\d{6,}$/;
  return identificationRegex.test(identification);
};

/**
 * Valida si un número de teléfono es válido (formato colombiano)
 * @param phone - Número de teléfono
 * @returns true si es válido
 */
export const isValidPhone = (phone: string): boolean => {
  if (!phone) return false;
  
  // Formato colombiano: 10 dígitos empezando por 3
  const phoneRegex = /^3\d{9}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

/**
 * Valida si un nombre es válido
 * @param name - Nombre a validar
 * @returns true si es válido
 */
export const isValidName = (name: string): boolean => {
  if (!name) return false;
  
  // Solo letras, espacios y mínimo 2 caracteres
  const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,}$/;
  return nameRegex.test(name.trim());
};

/**
 * Valida si una contraseña es segura (requisitos avanzados)
 * @param password - Contraseña a validar
 * @returns objeto con validación y mensaje
 */
export const validateSecurePassword = (password: string): { isValid: boolean; message: string } => {
  if (!password) {
    return { isValid: false, message: 'La contraseña es requerida' };
  }
  
  if (password.length < 8) {
    return { isValid: false, message: 'La contraseña debe tener al menos 8 caracteres' };
  }
  
  if (!/[A-Z]/.test(password)) {
    return { isValid: false, message: 'La contraseña debe contener al menos una mayúscula' };
  }
  
  if (!/[a-z]/.test(password)) {
    return { isValid: false, message: 'La contraseña debe contener al menos una minúscula' };
  }
  
  if (!/\d/.test(password)) {
    return { isValid: false, message: 'La contraseña debe contener al menos un número' };
  }
  
  return { isValid: true, message: 'Contraseña válida' };
};