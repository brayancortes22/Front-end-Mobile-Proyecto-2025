# Instructivo para instalar y ejecutar el proyecto en un celular Android

## Requisitos previos

- Celular Android con depuración USB activada (ver instrucciones abajo)
- Cable USB o conexión WiFi en la misma red que tu PC
- APK del dev-client generado por EAS Build
- Herramienta `adb` instalada en tu PC ([descargar Platform Tools](https://developer.android.com/studio/releases/platform-tools))
- Node.js y npm instalados en tu PC

### ¿Cómo activar la depuración USB?
1. Ve a **Ajustes > Acerca del teléfono** y toca 7 veces sobre "Número de compilación" para activar las opciones de desarrollador.
2. Ve a **Ajustes > Sistema > Opciones de desarrollador** y activa **Depuración USB**.
3. Conecta el celular por USB y acepta el mensaje de autorización en pantalla.

### ¿Cómo instalar adb y añadirlo al PATH?
1. Descarga [Platform Tools](https://developer.android.com/studio/releases/platform-tools) y extrae la carpeta.
2. Añade la ruta de la carpeta `platform-tools` al PATH del sistema:
   - En Windows: Panel de control > Sistema > Configuración avanzada > Variables de entorno > PATH > Editar > Añadir la ruta.
   - O ejecuta en PowerShell:
     ```powershell
     setx PATH "$env:PATH;C:\ruta\a\platform-tools"
     ```
3. Verifica que adb funciona:
   ```powershell
   adb devices
   ```
   Deberías ver tu dispositivo listado.

## 1. Descargar el APK del dev-client

1. Ve al enlace de tu build EAS:
   - [Enlace de ejemplo](https://expo.dev/accounts/bscl/projects/sena-mobile-app/builds/46e55ddb-02bf-4ec0-9c9f-cd8f4ad115e1)
2. Descarga el archivo `.apk` desde esa página.

## 2. Instalar el APK en tu celular

### Opción A: Usando `adb` (recomendado)
1. Conecta tu celular por USB y acepta la depuración.
2. Verifica que el dispositivo aparece con:
   ```powershell
   adb devices
   ```
3. Instala el APK:
   ```powershell
   adb install -r C:\ruta\a\app-development.apk
   ```
   (Reemplaza la ruta por la ubicación real del APK)
   Si ves un error de permisos, activa "Instalar apps por USB" en las opciones de desarrollador.

### Opción B: Manual
1. Copia el APK al almacenamiento del celular.
2. Ábrelo desde el explorador de archivos y acepta la instalación (activa "instalar apps desconocidas" si lo pide).
   - En algunos dispositivos, ve a **Ajustes > Seguridad > Instalar apps desconocidas** y permite la instalación desde el explorador de archivos.

## 3. Ejecutar el servidor de desarrollo en tu PC

1. Abre una terminal en la carpeta del proyecto.
2. Ejecuta:
   ```powershell
   npx expo start --dev-client
   ```
3. Escanea el QR con la app instalada o abre la app desde el celular.
   - Si el QR no aparece, abre la app manualmente y verifica que la IP del Metro Bundler (ejemplo: `http://192.168.1.8:8081`) sea accesible desde el celular.
   - Si usas WiFi, asegúrate que ambos dispositivos estén en la misma red y que el firewall permita conexiones entrantes al puerto 8081.

## 4. Ver logs Hermes (opcional)

1. Abre otra terminal y ejecuta:
   ```powershell
   adb logcat *:S ReactNative:V ReactNativeJS:V
   ```
2. Aquí verás los `console.log` y errores JS nativos.
3. Para filtrar solo tus logs, puedes usar:
   ```powershell
   adb logcat | findstr ReactNativeJS
   ```

## 5. Solución de problemas comunes

- **La app no conecta:**
   - Verifica que el celular y la PC estén en la misma red WiFi.
   - Desactiva datos móviles para evitar conflictos.
   - Revisa el firewall de Windows y permite el puerto 8081.
- **El QR no funciona:**
   - Abre la app manualmente y verifica la IP del Metro Bundler.
   - Usa la opción "Abrir con dirección" en la app si está disponible.
- **No tienes `adb`:**
   - Instala Platform Tools y añade la carpeta a tu PATH (ver arriba).
- **Errores de versión o dependencias:**
   - Ejecuta:
      ```powershell
      npx expo doctor --fix-dependencies
      ```
- **Permisos de instalación:**
   - Activa "Instalar apps por USB" y "Instalar apps desconocidas" en el celular.
- **No ves logs Hermes:**
   - Asegúrate que la app fue compilada con Hermes activado (`app.json` debe tener "jsEngine": "hermes").

---

¿Dudas o problemas? Consulta la documentación oficial de Expo:
- [Expo Dev Client](https://docs.expo.dev/clients/installation/)
- [EAS Build](https://docs.expo.dev/build/introduction/)
- [Hermes](https://docs.expo.dev/guides/using-hermes/)
