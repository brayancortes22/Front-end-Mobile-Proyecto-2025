import { isSenaEmail } from '../utils/validationlogin';

type FormDataShape = {
  email?: string;
  firstName?: string;
  middleName?: string; // nombre segundo - opcional
  lastName?: string;
  secondLast?: string; // apellido segundo - opcional
  documentType?: string;
  documentNumber?: string;
  phone?: string;
  [key: string]: any;
};

type ErrorsShape = {
  [K in keyof FormDataShape]?: string;
};

/**
 * Hook con validadores reutilizables para formularios.
 * - Los segundos nombres/apellidos son opcionales.
 * - Los primeros nombres/apellidos son obligatorios y deben tener al menos 2 caracteres.
 */
export function useValidators() {
  const validateEmail = (value?: string) => {
    if (!value) return 'El correo es requerido';
    if (!isSenaEmail(value)) return 'Correo institucional inválido';
    return '';
  };

  const validateName = (value?: string, required = true) => {
    if (!value) return required ? 'El nombre es requerido' : '';
    if (value.trim().length < 2) return 'Debe tener al menos 2 caracteres';
    return '';
  };

  const validateLastName = (value?: string, required = true) => {
    if (!value) return required ? 'El apellido es requerido' : '';
    if (value.trim().length < 2) return 'Debe tener al menos 2 caracteres';
    return '';
  };

  const validateDocumentType = (value?: string) => {
    if (!value) return 'Selecciona el tipo de documento';
    return '';
  };

  const validateDocumentNumber = (value?: string) => {
    if (!value) return 'El número de documento es requerido';
    if (!/^[0-9]+$/.test(value)) return 'El número de documento debe ser numérico';
    if (value.length < 6) return 'El número de documento debe tener al menos 6 dígitos';
    return '';
  };

  const validatePhone = (value?: string) => {
    if (!value) return 'El teléfono es requerido';
    if (!/^[0-9]+$/.test(value)) return 'El teléfono debe ser numérico';
    if (value.length < 10) return 'El teléfono debe tener al menos 10 dígitos';
    return '';
  };

  const validateField = (field: string, value: any, formData?: FormDataShape) => {
    switch (field) {
      case 'email':
        return validateEmail(value);
      case 'firstName':
        return validateName(value, true);
      case 'middleName':
        return validateName(value, false);
      case 'lastName':
        return validateLastName(value, true);
      case 'secondLast':
        return validateLastName(value, false);
      case 'documentType':
        return validateDocumentType(value);
      case 'documentNumber':
        return validateDocumentNumber(value);
      case 'phone':
        return validatePhone(value);
      default:
        return '';
    }
  };

  const validateForm = (formData: FormDataShape): ErrorsShape => {
    const errors: ErrorsShape = {};
    errors.email = validateEmail(formData.email);
    errors.firstName = validateName(formData.firstName, true);
    errors.middleName = validateName(formData.middleName, false);
    errors.lastName = validateLastName(formData.lastName, true);
    errors.secondLast = validateLastName(formData.secondLast, false);
    errors.documentType = validateDocumentType(formData.documentType);
    errors.documentNumber = validateDocumentNumber(formData.documentNumber);
    errors.phone = validatePhone(formData.phone);
    return errors;
  };

  return {
    validateField,
    validateForm,
  } as const;
}

export type { FormDataShape, ErrorsShape };
