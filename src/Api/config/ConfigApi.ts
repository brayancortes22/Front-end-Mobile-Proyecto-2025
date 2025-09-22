
/**
 * Configuración centralizada de endpoints de la API para el proyecto Sena.
 *
 * Este archivo define la URL base de la API y agrupa los endpoints por entidad o módulo.
 * Permite importar y utilizar rutas de la API de forma consistente en todos los servicios.
 *
 * Uso:
 *   import { ENDPOINTS } from "../config/ConfigApi";
 *   fetch(ENDPOINTS.user.getUser)
 *
 * Variables:
 *   - API_BASE_URL: URL base configurable por variable de entorno VITE_API_BASE_URL.
 *   - ENDPOINTS: Objeto con rutas agrupadas por entidad (person, user, rol, form, module, etc).
 *
 * Estructura de ENDPOINTS:
 *   - person: Endpoints para gestión de personas (aprendiz, etc).
 *   - user: Endpoints para usuarios (login, recuperación, CRUD).
 *   - menu: Endpoints para menú dinámico según rol.
 *   - rol: Endpoints para roles y permisos.
 *   - form: Endpoints para formularios.
 *   - module: Endpoints para módulos y formularios asociados.
 *   - aprendiz: Endpoints para aprendices.
 *   - instructor: Endpoints para instructores.
 *   - regional, center, sede, program, KnowledgeArea, ficha, permission: Endpoints para entidades generales.
 *
 * Ejemplo de uso:
 *   fetch(ENDPOINTS.rol.getRoles)
 *   fetch(ENDPOINTS.user.deleteUser.replace('{id}', userId))
 */


/**
 * URL base de la API. Se puede configurar por variable de entorno VITE_API_BASE_URL.
 * Por defecto apunta a "http://django:8000/api/" para entorno local con Docker.
 */
import Constants from 'expo-constants';

/**
 * URL base de la API. Se intenta leer de varias fuentes según el entorno:
 *  - import.meta.env.VITE_API_BASE_URL (Vite / web)
 *  - process.env.VITE_API_BASE_URL (si está disponible)
 *  - Constants.expoConfig?.extra?.VITE_API_BASE_URL (expo app config)
 * Si ninguna está definida, se usa el fallback "http://django:8000/api/".
 */
const getEnvVar = () => {
  // Node / other environments
  if (typeof process !== 'undefined' && (process.env as any)?.VITE_API_BASE_URL) {
    return (process.env as any).VITE_API_BASE_URL;
  }

  // Web builds can expose a global (set by index.html) to pass env vars to runtime
  // e.g. in web index.html include: <script>window.__VITE_API_BASE_URL = 'https://...'</script>
  if (typeof globalThis !== 'undefined' && (globalThis as any).__VITE_API_BASE_URL) {
    return (globalThis as any).__VITE_API_BASE_URL;
  }

  // Expo constants (app.config extra)
  try {
    const expoExtra = (Constants && (Constants as any).expoConfig && (Constants as any).expoConfig.extra) || (Constants && (Constants as any).manifest && (Constants as any).manifest.extra);
    if (expoExtra && expoExtra.VITE_API_BASE_URL) return expoExtra.VITE_API_BASE_URL;
  } catch (e) {
    // ignore
  }

  return undefined;
};

const API_BASE_URL = getEnvVar() || "http://django:8000/api/";


/**
 * ENDPOINTS: Objeto que agrupa todas las rutas de la API por entidad o módulo.
 * Cada propiedad corresponde a un grupo de endpoints relacionados.
 * Las rutas pueden contener parámetros entre llaves (ej: {id}) que deben ser reemplazados dinámicamente.
 */
export const ENDPOINTS = {
  /** Endpoints para gestión de personas (aprendiz, etc) */
  person: {
    registerAprendiz: `${API_BASE_URL}security/persons/register-aprendiz/`,
    // Otros endpoints de persona

    IdPerson: `${API_BASE_URL}security/persons/{id}/`,
  },
  /** Endpoints para usuarios (login, recuperación, CRUD) */
  user: {
    validateLogin: `${API_BASE_URL}security/users/validate-institutional-login/`,
    requestPasswordReset: `${API_BASE_URL}security/users/request-password-reset/`, // Envia el código y lo compara
    resetPassword: `${API_BASE_URL}security/users/reset-password/`, // Actualiza la contraseña
    // Otros endpoints de usuario
    getUser: `${API_BASE_URL}security/users/`,
    getUserId: `${API_BASE_URL}security/users/{id}/`,
    deleteUser: `${API_BASE_URL}security/users/{id}/soft-delete/`,
  },
  /** Endpoints para menú dinámico según rol */
  menu: {
    getMenuItems: `${API_BASE_URL}security/rol-form-permissions/{id}/get-menu/`,
  },
  /** Endpoints para roles y permisos */
  rol: {
    getRoles: `${API_BASE_URL}security/roles/`,
    deleteRole: `${API_BASE_URL}security/roles/{id}/soft-delete/`,
    getRolUser: `${API_BASE_URL}security/roles/roles-with-user-count/`,
    postRolPermissions: `${API_BASE_URL}security/rol-form-permissions/create-role-with-permissions/`,
    getRolPermissions: `${API_BASE_URL}security/rol-form-permissions/{id}/get-role-with-permissions/`,
    putRolFormPerms: `${API_BASE_URL}security/rol-form-permissions/{id}/update-role-with-permissions/`,
    getRolesFormsPerms: `${API_BASE_URL}security/rol-form-permissions/permission-matrix/`,
    deleteRolUsers: `${API_BASE_URL}security/roles/{id}/logical-delete-with-users/`
  },
  
  /** Endpoints para formularios */
  form: {
    getForm: `${API_BASE_URL}security/forms/`,
    deleteForm: `${API_BASE_URL}security/forms/{id}/`,
    post :`${API_BASE_URL}security/forms/`,
  },
  /** Endpoints para módulos y formularios asociados */
  module: {
    getModule: `${API_BASE_URL}security/modules/`,
    deleteModule: `${API_BASE_URL}security/modules/{id}/`,
    post: `${API_BASE_URL}security/form-modules/create-module-with-forms/`,
    getModuleForms: `${API_BASE_URL}security/form-modules/{id}/get-module-with-forms/`,
    putModuleForms: `${API_BASE_URL}security/form-modules/{id}/update-module-with-forms/`,
  },
  
  /** Endpoints para aprendices */
  aprendiz: {
    allAprendiz: `${API_BASE_URL}general/aprendices/Create-Aprendiz/create/`,
    getAllAprendiz: `${API_BASE_URL}general/aprendices/`,
    getIdAprendiz: `${API_BASE_URL}general/aprendices/{id}/Create-Aprendiz/GetById/`,
    putIdAprendiz: `${API_BASE_URL}general/aprendices/{id}/Create-Aprendiz/update/`,
  },
  /** Endpoints para instructores */
  instructor: {
    allInstructores: `${API_BASE_URL}general/instructors/Create-Instructor/create/`,
    getAllInstructores: `${API_BASE_URL}general/instructors/`,
    getIdInstructor: `${API_BASE_URL}general/instructors/{id}/Create-Instructor/Retrieve/`,
    putIdInstructor: `${API_BASE_URL}general/instructors/{id}/Create-Instructor/update/`,

  },
  /** Endpoints para regionales */
  regional: {
    getRegionales: `${API_BASE_URL}general/regionals/`,
  },
  /** Endpoints para centros */
  center: {
    getCenters: `${API_BASE_URL}general/centers/`,
  },
  /** Endpoints para sedes */
  sede: {
    getSedes: `${API_BASE_URL}general/sedes/`,
  },
  /** Endpoints para programas */
  program: {
    allPrograms: `${API_BASE_URL}general/programs/`,
    getProgramFicha: `${API_BASE_URL}general/programs/{id}/fichas/`,
    IdProgram: `${API_BASE_URL}general/programs/{id}/`,
    deleteIdProgram: `${API_BASE_URL}general/programs/{id}/disable-with-fichas/`,
  },
  /** Endpoints para áreas de conocimiento */
  KnowledgeArea: {
    allKnowledgeAreas: `${API_BASE_URL}general/knowledge-areas/`,
    IdKnowledgeArea: `${API_BASE_URL}general/knowledge-areas/{id}/`,
    deleteIdKnowledgeArea: `${API_BASE_URL}general/knowledge-areas/{id}/soft-delete/`,
  },
  /** Endpoints para fichas */
  ficha: {
    allFichas: `${API_BASE_URL}general/fichas/`,
    IdFicha: `${API_BASE_URL}general/fichas/{id}/`,
    deleteIdFicha: `${API_BASE_URL}general/fichas/{id}/soft-delete/`,
  },
  /** Endpoints para permisos */
  permission: {
    getPermissions: `${API_BASE_URL}security/permissions/`,
  },
  // Enums del sistema
  enums: {
    getDocumentTypes: `${API_BASE_URL}security/enums/document-types/`,
    getContractTypes : `${API_BASE_URL}security/enums/contract-types/`,
  },
  // Plantillas Excel para registro masivo
  excelTemplates: {
    instructorTemplate: `${API_BASE_URL}security/excel-templates/instructor-template/`,
    aprendizTemplate: `${API_BASE_URL}security/excel-templates/aprendiz-template/`,
    templateInfo: `${API_BASE_URL}security/excel-templates/template-info/`,
    uploadInstructorExcel: `${API_BASE_URL}security/excel-templates/upload-instructor-excel/`,
    uploadAprendizExcel: `${API_BASE_URL}security/excel-templates/upload-aprendiz-excel/`,
  },
  // Otros grupos de endpoints...
  // Más entidades...
};


/**
 * Exporta la URL base de la API para uso externo.
 */
export default API_BASE_URL;