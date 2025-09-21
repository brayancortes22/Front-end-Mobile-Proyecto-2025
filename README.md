# SENA Mobile App - React Native

Este es el proyecto móvil desarrollado en React Native con Expo para el sistema de autogestión SENA.

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js (versión 18 o superior)
- npm o yarn
- Expo CLI (`npm install -g @expo/cli`)
- Android Studio (para Android) o Xcode (para iOS)

### Instalación
```bash
# Instalar dependencias
npm install

# Iniciar el servidor de desarrollo
npm start

# Para Android
npm run android

# Para iOS (solo en macOS)
npm run ios
```

## 📱 Desarrollo

### Estructura del Proyecto
```
src/
├── components/     # Componentes reutilizables
├── screens/        # Pantallas de la aplicación
├── navigation/     # Configuración de navegación
├── store/          # Estado global (Redux)
├── services/       # Servicios API
├── utils/          # Utilidades
├── types/          # Tipos TypeScript
├── constants/      # Constantes y temas
└── hooks/          # Hooks personalizados
```

### Comandos Disponibles
- `npm start` - Inicia el servidor de desarrollo
- `npm run android` - Ejecuta en Android
- `npm run ios` - Ejecuta en iOS
- `npm run web` - Ejecuta en navegador web
- `npm run lint` - Ejecuta el linter
- `npm test` - Ejecuta las pruebas

## 🎨 Sistema de Diseño

El proyecto utiliza:
- **UI Library:** React Native Paper (Material Design 3)
- **Navegación:** React Navigation 6
- **Estado:** Redux Toolkit
- **Estilos:** StyleSheet nativo + theming

### Colores Principales
- Verde SENA: `#00A859`
- Texto: `#212529`
- Fondo: `#FFFFFF`

## 📋 Funcionalidades

### Módulos Principales
- ✅ Autenticación (Login/Logout)
- ✅ Dashboard principal
- ✅ Perfil de usuario
- ✅ Configuración
- 🔄 Registro de asistencia (En desarrollo)
- 🔄 Consulta de horarios (En desarrollo)
- 🔄 Notificaciones (En desarrollo)

## 🔧 Configuración de Desarrollo

### Variables de Entorno
Crear archivo `.env` en la raíz:
```
API_BASE_URL=http://localhost:8000/api
```

### Testing
```bash
npm test
```

### Build para Producción
```bash
# Android
npm run build:android

# iOS
npm run build:ios
```

## 📖 Documentación

- [Reglas de Diseño](./.cursor/rules/design_system_rules.mdc)
- [React Native Paper](https://reactnativepaper.com/)
- [React Navigation](https://reactnavigation.org/)
- [Expo Documentation](https://docs.expo.dev/)

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es parte del sistema de autogestión SENA.

---

**Nota:** Este es un proyecto móvil complementario al sistema web. Para instalar las dependencias, ejecuta `npm install` en la carpeta del proyecto.