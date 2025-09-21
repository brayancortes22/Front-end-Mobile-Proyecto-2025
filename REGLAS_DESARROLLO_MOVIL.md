# Reglas de Desarrollo - SENA Mobile App

## Información General del Proyecto

**Aplicación móvil del SENA desarrollada con React Native + Expo**
- **Framework**: React Native 0.81.4 con Expo ~54.0.0
- **Lenguaje**: TypeScript
- **Estado**: Redux Toolkit
- **Navegación**: React Navigation v6
- **UI Library**: React Native Paper + NativeWind (Tailwind)
- **Formularios**: React Hook Form

---

## 1. Estructura del Proyecto

```
src/
├── Api/                    # Servicios y configuración de API
│   ├── config/            # Configuración de endpoints
│   ├── Services/          # Servicios por entidad
│   └── types/             # Tipos TypeScript para APIs
├── components/            # Componentes reutilizables
│   └── ui/               # Componentes base del UI
├── constants/            # Constantes y temas
├── hooks/               # Custom hooks
├── layout/              # Layouts de la aplicación
├── navigation/          # Configuración de navegación
├── screens/            # Pantallas de la aplicación
├── styles/             # Estilos globales
└── utils/              # Funciones utilitarias
```

---

## documentacion del codigo

JSDoc es un estándar para documentar funciones, clases, componentes, props, etc., en JavaScript y TypeScript, incluyendo React.
Con él puedes especificar:

@param → describe los parámetros de una función o props de un componente.

@returns / @return → describe lo que devuelve la función o componente.

Otros como @example, @deprecated, @typedef, etc.

## 2. Sistema de Diseño

### Colores (Definidos en `src/constants/theme.ts`)

```typescript
// Colores SENA Brand
senaGreen: '#00A859'      // Verde principal SENA
senaGreenHover: '#008a4a' // Verde hover
senaGreenLight: '#D4EDDA' // Verde claro

// Colores del sistema Material Design 3
primary: '#00A859'
secondary: '#6C757D'
surface: '#FFFFFF'
background: '#FFFFFF'
error: '#DC3545'
```

### Tipografía
- Usar las variantes de Material Design 3
- Mantener consistencia con los tamaños definidos en el theme

### Espaciado
- Utilizar sistema de espaciado consistente (múltiplos de 8px)
- Aprovechar las utilidades de NativeWind para espaciado

---

## 3. Convenciones de Código

### Nomenclatura de Archivos
- **Componentes**: PascalCase (`LoginForm.tsx`, `UserProfile.tsx`)
- **Servicios**: PascalCase (`User.ts`, `Aprendiz.ts`)
- **Utilities**: camelCase (`validationLogin.ts`)
- **Types**: camelCase con `.types.ts` (`user.types.ts`)

### Estructura de Componentes

```typescript
// Plantilla base para componentes
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';

interface ComponentNameProps {
  // Props aquí
}

export const ComponentName: React.FC<ComponentNameProps> = ({
  // destructuring props
}) => {
  return (
    <View style={styles.container}>
      {/* JSX aquí */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // estilos aquí
  },
});

export default ComponentName;
```

### Estructura de Pantallas

```typescript
// Plantilla base para pantallas
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const ScreenName: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Contenido de la pantalla */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    padding: 16,
  },
});

export default ScreenName;
```

---

## 4. Gestión de Estado

### Redux Toolkit
- Usar `createSlice` para crear reducers
- Implementar middleware para llamadas async con `createAsyncThunk`
- Mantener estado normalizado

### Estado Local
- Usar `useState` para estado simple del componente
- Usar `useReducer` para estado complejo local
- Implementar custom hooks para lógica reutilizable

---

## 5. Llamadas a API

### Configuración Base
```typescript
// src/Api/config/ConfigApi.ts
export const API_BASE_URL = 'http://localhost:8000/api';
export const API_TIMEOUT = 10000;
```

### Servicios
- Un archivo por entidad en `src/Api/Services/`
- Usar async/await para operaciones asíncronas
- Implementar manejo de errores consistente
- Tipado fuerte con TypeScript

---

## 6. Navegación

### React Navigation v6
- Stack Navigator para navegación principal
- Tab Navigator para secciones principales
- Tipado de rutas con TypeScript

```typescript
// Definir tipos de navegación
export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Profile: { userId: string };
};
```

---

## 7. Estilos y UI

### NativeWind (Tailwind CSS)
- Usar clases de Tailwind para estilos básicos
- Mantener consistencia con el sistema de diseño

### React Native Paper
- Usar componentes de Paper como base
- Personalizar theme según marca SENA
- Aprovechar Material Design 3

### StyleSheet
- Usar para estilos complejos o específicos
- Mantener estilos cerca del componente
- Usar constantes para valores reutilizables

---

## 8. Manejo de Formularios

### React Hook Form
- Usar para todos los formularios
- Implementar validación con esquemas
- Manejo consistente de errores

```typescript
import { useForm, Controller } from 'react-hook-form';

const { control, handleSubmit, formState: { errors } } = useForm();
```

---

## 9. Gestión de Assets

### Imágenes
- Almacenar en `assets/images/`
- Usar formatos optimizados (WebP cuando sea posible)
- Implementar lazy loading para listas

### Iconos - Bootstrap Icons

**Librería Principal**: Bootstrap Icons via `react-native-vector-icons`

#### Configuración
```bash
# Instalar dependencias necesarias
npm install react-native-vector-icons
npm install --save-dev @types/react-native-vector-icons
```

#### Implementación
```typescript
// Importar Bootstrap Icons
import Icon from 'react-native-vector-icons/MaterialIcons';
// Para Bootstrap Icons específicamente, usar:
import BootstrapIcon from 'react-native-vector-icons/MaterialIcons';

// Componente wrapper recomendado
interface IconProps {
  name: string;
  size?: number;
  color?: string;
  style?: any;
}

export const BSIcon: React.FC<IconProps> = ({
  name,
  size = 24,
  color = '#000',
  style
}) => (
  <Icon name={name} size={size} color={color} style={style} />
);
```

#### Iconos Bootstrap Más Utilizados en SENA
```typescript
// Iconos de navegación
'home'           // bi-house
'person'         // bi-person
'settings'       // bi-gear
'menu'           // bi-list

// Iconos de acciones
'add'            // bi-plus
'edit'           // bi-pencil
'delete'         // bi-trash
'search'         // bi-search
'filter'         // bi-funnel

// Iconos de estado
'check-circle'   // bi-check-circle
'error'          // bi-exclamation-triangle
'info'           // bi-info-circle
'warning'        // bi-warning

// Iconos específicos SENA
'school'         // bi-mortarboard
'book'           // bi-book
'people'         // bi-people
'clipboard'      // bi-clipboard
```

#### Convenciones de Uso
- Tamaño estándar: 24px para iconos principales
- Tamaño pequeño: 16px para iconos secundarios
- Tamaño grande: 32px para iconos destacados
- Color por defecto: usar colores del tema SENA
- Mantener consistencia en toda la aplicación

---

## 10. Testing

### Estrategia de Testing
- Unit tests para utilidades y hooks
- Component tests para componentes reutilizables
- Integration tests para flujos críticos

---

## 11. Performance

### Optimizaciones
- Usar `React.memo` para componentes que no cambian frecuentemente
- Implementar `useMemo` y `useCallback` para cálculos costosos
- Lazy loading para pantallas
- Optimización de imágenes

---

## 12. Convenciones Específicas SENA

### Colores de Marca
- Verde SENA como color primario: `#00A859`
- Mantener accesibilidad en contrastes
- Usar colores de estado consistentes

### UX/UI Guidelines
- Seguir principios de Material Design 3
- Mantener consistencia con la web app
- Priorizar accesibilidad y usabilidad

---

## 13. Control de Versiones

### Git Flow
- Feature branches para nuevas funcionalidades
- Commits descriptivos en español
- Pull requests obligatorios para main

### Estructura de Commits
```
feat: agregar pantalla de login
fix: corregir validación de formulario
docs: actualizar documentación de API
style: ajustar espaciado en componente Button
```

---

## 14. Deploy y Build

### Expo Build
- Configurar builds para Android e iOS
- Variables de entorno para diferentes ambientes
- Versioning automático

---

## 15. Integración con Figma

### Proceso de Implementación
1. Revisar diseño en Figma
2. Identificar componentes reutilizables
3. Extraer tokens de diseño (colores, espaciado, tipografía)
4. Implementar componentes base primero
5. Construir pantallas usando componentes base
6. Revisar y ajustar con el diseño original

### Herramientas
- Usar MCP Figma para extraer código
- Validar medidas y espaciados
- Mantener consistencia con el sistema de diseño

---

**Fecha de creación**: Septiembre 2025  
**Versión**: 1.0  
**Autor**: Equipo de Desarrollo SENA