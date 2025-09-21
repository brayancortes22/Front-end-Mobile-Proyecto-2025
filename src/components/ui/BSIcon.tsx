import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface BSIconProps {
  /**
   * Nombre del icono de Bootstrap/Material
   * Ejemplos: 'home', 'person', 'settings', 'menu', 'add', 'edit', 'delete', etc.
   */
  name: string;
  /**
   * Tamaño del icono en píxeles
   * - 16px: iconos pequeños/secundarios
   * - 24px: iconos estándar (por defecto)
   * - 32px: iconos grandes/destacados
   */
  size?: number;
  /**
   * Color del icono
   * Por defecto usa el color primario del tema SENA
   */
  color?: string;
  /**
   * Estilos adicionales para el contenedor del icono
   */
  style?: any;
  /**
   * Función a ejecutar cuando se toca el icono
   */
  onPress?: () => void;
}

/**
 * Componente wrapper para iconos de Bootstrap usando react-native-vector-icons
 * 
 * Proporciona una interfaz consistente para todos los iconos de la aplicación
 * siguiendo las convenciones del sistema de diseño SENA.
 * 
 * @example
 * // Icono básico
 * <BSIcon name="home" />
 * 
 * @example
 * // Icono personalizado
 * <BSIcon 
 *   name="person" 
 *   size={32} 
 *   color="#00A859" 
 *   onPress={() => navigation.navigate('Profile')}
 * />
 */
export const BSIcon: React.FC<BSIconProps> = ({
  name,
  size = 24,
  color = '#00A859', // Color verde SENA por defecto
  style,
  onPress,
}) => {
  return (
    <Icon
      name={name}
      size={size}
      color={color}
      style={style}
      onPress={onPress}
      suppressHighlighting={true}
    />
  );
};

/**
 * Iconos predefinidos para componentes comunes
 */
export const SenaIcons = {
  // Navegación
  home: 'home',
  profile: 'person',
  settings: 'settings',
  menu: 'menu',
  back: 'arrow-back',
  
  // Acciones
  add: 'add',
  edit: 'edit',
  delete: 'delete',
  search: 'search',
  filter: 'filter-list',
  save: 'save',
  
  // Estado
  success: 'check-circle',
  error: 'error',
  warning: 'warning',
  info: 'info',
  
  // Educación/SENA específicos
  school: 'school',
  book: 'menu-book',
  people: 'people',
  assignment: 'assignment',
  class: 'class',
  schedule: 'schedule',
  
  // Utilidades
  visibility: 'visibility',
  visibilityOff: 'visibility-off',
  download: 'download',
  upload: 'upload',
  refresh: 'refresh',
  
  // Comunicación
  email: 'email',
  phone: 'phone',
  message: 'message',
  
  // Seguridad
  lock: 'lock',
  lockOpen: 'lock-open',
  
  // Documentos
  document: 'description',
  pdf: 'picture-as-pdf',
  excel: 'table-chart',
  
  // Navegación y UI
  keyboardArrowDown: 'keyboard-arrow-down',
  keyboardArrowUp: 'keyboard-arrow-up',
} as const;

export default BSIcon;