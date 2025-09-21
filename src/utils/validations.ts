// Utilidades de validación para la aplicación

/**
 * Valida si un email es válido del dominio SENA
 * @param email Email a validar
 * @returns true si es válido, false en caso contrario
 */
export const isValidSenaEmail = (email: string): boolean => {
  const senaEmailRegex = /^[a-zA-Z0-9._%+-]+@soy\.sena\.edu\.co$/;
  return senaEmailRegex.test(email);
};

/**
 * Valida si una contraseña cumple con los requisitos de seguridad
 * - Al menos 8 caracteres
 * - Al menos una letra mayúscula
 * - Al menos una letra minúscula
 * - Al menos un número
 * - Al menos un carácter especial
 * @param password Contraseña a validar
 * @returns true si es válida, false en caso contrario
 */
export const isValidPassword = (password: string): boolean => {
  if (!password || password.length < 8) {
    return false;
  }

  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  return hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar;
};

/**
 * Valida si un número de documento es válido
 * @param documentNumber Número de documento
 * @returns true si es válido, false en caso contrario
 */
export const isValidDocumentNumber = (documentNumber: string): boolean => {
  // Verificar que solo contenga números y tenga entre 7 y 12 dígitos
  const documentRegex = /^\d{7,12}$/;
  return documentRegex.test(documentNumber);
};

/**
 * Valida si un nombre es válido
 * @param name Nombre a validar
 * @returns true si es válido, false en caso contrario
 */
export const isValidName = (name: string): boolean => {
  // Permitir letras, espacios, acentos y algunos caracteres especiales
  const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'-]{2,50}$/;
  return nameRegex.test(name.trim());
};

/**
 * Valida si un número de teléfono es válido (Colombia)
 * @param phone Número de teléfono
 * @returns true si es válido, false en caso contrario
 */
export const isValidPhone = (phone: string): boolean => {
  // Formato colombiano: 10 dígitos, puede empezar con 3 (móvil) o código de área
  const phoneRegex = /^[1-9]\d{9}$/;
  return phoneRegex.test(phone.replace(/\s|-/g, ''));
};

/**
 * Valida si un código de verificación es válido
 * @param code Código de verificación
 * @returns true si es válido, false en caso contrario
 */
export const isValidVerificationCode = (code: string): boolean => {
  // 6 dígitos numéricos
  const codeRegex = /^\d{6}$/;
  return codeRegex.test(code);
};