# 📱 AutoGestión SENA - Mobile App (React Native)

## 🚀 Descripción del Proyecto

Aplicación móvil desarrollada en **React Native + TypeScript + Expo + NativeWind** para el sistema de AutoGestión del Centro de Industria, Empresa y Servicios (CIES) del SENA. Esta aplicación consume la misma API REST desarrollada en Python/Django que el frontend web.

---

## 📁 Estructura Detallada del Proyecto

### 🗂️ **Carpetas Principales**

#### **`/assets`** - Recursos Estáticos
```
assets/
├── fonts/           # Fuentes personalizadas
├── icons/           # Iconos de la aplicación
└── images/          # Imágenes estáticas
    └── logoSenaVerde.png  # Logo institucional del SENA
```
**📋 Propósito**: Archivos de recursos que se empaquetan con la aplicación. Aquí se colocan:
- Logo institucional del SENA
- Iconos de la aplicación
- Fuentes personalizadas
- Imágenes corporativas

---

#### **`/src`** - Código Fuente Principal

##### **`/src/Api`** - Configuración y Servicios de API 🌐
```
Api/
├── config/
│   └── ConfigApi.ts    # Configuración base de la API (URL, headers, interceptors)
├── services/
│   └── User.ts        # Servicios específicos para cada endpoint
└── types/
    └── index.ts       # Tipos TypeScript para la API
```

**📋 Propósito**:
- **`ConfigApi.ts`**: Configurar la conexión con la API Django
  - URL base: `http://10.0.2.2:8000/api/` (localhost para Android)
  - Headers de autenticación con AsyncStorage
  - Manejo de errores específico para móvil
  - Configuración para desarrollo y producción

- **`services/User.ts`**: Funciones para consumir cada endpoint:
  ```typescript
  // Ejemplos de servicios adaptados para React Native
  export const authService = {
    login: (credentials) => POST('/security/auth/login/'),
    logout: () => AsyncStorage.multiRemove(['authToken', 'userData']),
    isAuthenticated: () => AsyncStorage.getItem('authToken'),
  }
  ```

- **`types/index.ts`**: Tipos TypeScript específicos para React Native:
  ```typescript
  // Tipos de navegación
  export interface NavigationProps {
    navigation: any;
    route?: any;
  }
  
  // Tipos de AsyncStorage
  export const STORAGE_KEYS = {
    AUTH_TOKEN: 'authToken',
    USER_DATA: 'userData',
  } as const;
  ```

---

##### **`/src/components`** - Componentes Reutilizables 🧩
```
components/
├── ui/
│   ├── Button.tsx     # Botón personalizado con variantes
│   └── Input.tsx      # Input con validación y iconos
├── LoginForm.tsx      # Formulario de login adaptado para móvil
└── SenaLogo.tsx       # Logo institucional component
```

**📋 Propósito**:
- **`ui/`**: Componentes básicos del sistema de diseño
  - **`Button.tsx`**: Botón con variantes (primary, secondary, outline, danger)
  - **`Input.tsx`**: Input con soporte para iconos, validación y estados de error

- **Componentes específicos**:
  - **`LoginForm.tsx`**: Formulario de login con validación y manejo de estados
  - **`SenaLogo.tsx`**: Logo institucional adaptado para React Native

**🔧 Equivalencias Web → Móvil**:
- **Radix UI Components** → **React Native Paper + Componentes Custom**
- **HTML/CSS** → **React Native StyleSheet**
- **CSS Classes** → **StyleSheet Objects**

---

##### **`/src/screens`** - Pantallas de la Aplicación 📱
```
screens/
├── HomeScreen.tsx        # Dashboard principal
├── LoginScreen.tsx       # Pantalla de autenticación
├── ProfileScreen.tsx     # Perfil del usuario
└── SettingsScreen.tsx    # Configuración de la app
```

**📋 Propósito**: Pantallas completas de la aplicación
- **`HomeScreen.tsx`**: Dashboard con navegación y estadísticas
- **`ProfileScreen.tsx`**: Perfil del usuario con información personal
- **`SettingsScreen.tsx`**: Configuración y preferencias
- **`LoginScreen.tsx`**: Pantalla de autenticación

**🔧 Equivalencias Web → Móvil**:
- **Páginas Web (pages/)** → **Screens**
- **React Router** → **React Navigation**
- **Scroll Containers** → **ScrollView**
- **Modal Dialogs** → **React Native Modal/Alert**

---

##### **`/src/navigation`** - Configuración de Navegación 🧭
```
navigation/
└── AppNavigator.tsx    # Configuración principal de navegación
```

**📋 Propósito**:
- **`AppNavigator.tsx`**: Configuración de React Navigation
  - Stack Navigator para autenticación
  - Tab Navigator para navegación principal
  - Configuración de rutas y parámetros

**🔧 Equivalencias Web → Móvil**:
- **React Router DOM** → **React Navigation v6**
- **Browser History** → **Stack/Tab Navigators**
- **URL Routes** → **Screen Names**

---

##### **`/src/utils`** - Utilidades y Helpers 🛠️
```
utils/
└── validationlogin.ts  # Validaciones para formularios
```

**📋 Propósito**:
- **`validationlogin.ts`**: Funciones de validación
  - Validación de correos institucionales (@soy.sena.edu.co)
  - Validación de contraseñas seguras
  - Validación de números de identificación
  - Validación de números telefónicos colombianos

---

##### **`/src/constants`** - Constantes y Configuración 📋
```
constants/
└── theme.ts           # Tema y colores de la aplicación
```

**📋 Propósito**:
- **`theme.ts`**: Configuración del tema visual
  - Colores institucionales del SENA
  - Configuración de React Native Paper
  - Espaciados y tipografías

---

##### **`/src/hooks`** - React Hooks Personalizados 🎣
```
hooks/
└── (vacío - por implementar)
```

**📋 Propósito**: Hooks reutilizables para:
- Gestión de autenticación
- Manejo de formularios
- Estados de carga
- Conectividad de red

---

#### **`/explicacion-estructura`** - Documentación 📚
```
explicacion-estructura/
└── README.md          # Este archivo de documentación
```

---

## 🔧 Tecnologías y Equivalencias

### **Principales Dependencias**

#### **🎨 Estilos y UI**
- **Web**: Tailwind CSS + Radix UI
- **Móvil**: NativeWind + React Native Paper + Componentes Custom

#### **🧭 Navegación**
- **Web**: React Router DOM
- **Móvil**: React Navigation v6 (Stack + Tab Navigators)

#### **🔗 Gestión de Estado**
- **Web**: Context API / Zustand
- **Móvil**: AsyncStorage + Context API

#### **📱 Específico de React Native**
- **Expo**: Plataforma de desarrollo
- **React Native Vector Icons**: Iconos (MaterialIcons)
- **AsyncStorage**: Almacenamiento local
- **React Native Safe Area**: Manejo de áreas seguras

#### **🌐 API y Networking**
- **Compartido**: Fetch API nativo
- **Autenticación**: JWT con AsyncStorage

---

## 🚀 Comandos Disponibles

### **Desarrollo**
```bash
# Instalar dependencias
npm install

# Iniciar desarrollo
npm start

# Ejecutar en Android
npm run android

# Ejecutar en iOS
npm run ios

# Ejecutar en web
npm run web
```

### **Build y Deploy**
```bash
# Build para Android
npm run build:android

# Build para iOS
npm run build:ios

# Lint
npm run lint
```

---

## 📦 Estructura de Navegación

### **Stack Principal**
```
Login → Main (Tabs)
```

### **Tab Navigation**
```
Main/
├── Home (Inicio)
├── Profile (Perfil)
└── Settings (Configuración)
```

### **Pantallas Adicionales**
```
Modales y Screens:
├── EditProfile
├── ChangePassword
├── ForgotPassword
├── Register
├── Admin
└── MassRegistration
```

---

## 🎨 Sistema de Diseño

### **Colores Institucionales**
```typescript
const colors = {
  'sena-green': '#6AB344',      // Verde principal SENA
  'sena-orange': '#FF7B00',     // Naranja secundario
  'sena-dark-green': '#2D5016', // Verde oscuro
  'sena-light-green': '#E8F5E8', // Verde claro
}
```

### **Componentes UI**
- **Button**: 4 variantes (primary, secondary, outline, danger)
- **Input**: Con soporte para iconos y validación
- **Cards**: Para información y estadísticas
- **Headers**: Con gradientes institucionales

---

## 📱 Características Específicas Móviles

### **Autenticación**
- Login con credenciales institucionales
- Almacenamiento seguro de tokens (AsyncStorage)
- Logout automático por seguridad

### **Navegación**
- Tab navigation para acceso rápido
- Stack navigation para flujos complejos
- Botones de retroceso nativos

### **UX/UI Móvil**
- Diseño responsivo para diferentes tamaños
- Teclado adaptable (KeyboardAvoidingView)
- Scroll suave en listas largas
- Pull-to-refresh en pantallas principales

### **Notificaciones**
- Toast messages para feedback
- Alertas nativas para confirmaciones
- Estados de carga con indicadores

---

## 🔐 Seguridad

### **Autenticación**
- JWT tokens almacenados de forma segura
- Validación de correos institucionales
- Sesiones con expiración automática

### **Datos**
- Comunicación HTTPS con la API
- Validación de entrada en todos los formularios
- Manejo seguro de datos sensibles

---

## 🐛 Debug y Testing

### **Desarrollo**
- React Native Debugger
- Expo Dev Tools
- Console logging para API calls

### **Testing** (Por implementar)
- Jest para unit testing
- Detox para E2E testing
- Flipper para debugging avanzado

---

## 📈 Próximas Funcionalidades

### **Corto Plazo**
- [ ] Autenticación biométrica
- [ ] Notificaciones push
- [ ] Modo offline básico
- [ ] Tema oscuro

### **Mediano Plazo**
- [ ] Sincronización en tiempo real
- [ ] Carga de archivos/imágenes
- [ ] Reportes y gráficos
- [ ] Modo offline completo

### **Largo Plazo**
- [ ] Multi-idioma
- [ ] Integración con calendarios
- [ ] Geolocalización
- [ ] Análitics de uso

---

## 👥 Contribución

Para contribuir al proyecto:

1. **Fork** el repositorio
2. **Crear** una rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. **Commit** los cambios (`git commit -am 'Agregar nueva funcionalidad'`)
4. **Push** a la rama (`git push origin feature/nueva-funcionalidad`)
5. **Crear** un Pull Request

---

## 📄 Licencia

Este proyecto está bajo la licencia del SENA - Centro de Industria, Empresa y Servicios.

---

## 📞 Soporte

Para soporte técnico:
- **Email**: soporte.cies@sena.edu.co
- **Documentación**: [Wiki del proyecto]
- **Issues**: [GitHub Issues]

---

*Desarrollado con ❤️ para el SENA - CIES*