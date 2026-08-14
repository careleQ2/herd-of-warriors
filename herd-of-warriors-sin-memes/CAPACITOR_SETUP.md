# Configuración de Capacitor para Herd of Warriors

## Paso a Paso - Comandos Exactos

### 1. Instalar Capacitor y CLI
```powershell
npm install --save-dev @capacitor/core @capacitor/cli
```

### 2. Instalar plugins essenciales para Capacitor
```powershell
npm install --save @capacitor/app @capacitor/device @capacitor/status-bar
```

### 3. Inicializar Capacitor
```powershell
npx cap init "Herd of Warriors" "com.herdofwarriors.app" --web-dir dist
```

**NOTA:** Si te pide el `webDir` durante el prompt interactivo, escribe: `dist`

### 4. Instalar plataformas (Android e iOS)
```powershell
npm install --save-dev @capacitor/android @capacitor/ios
```

### 5. Agregar las plataformas al proyecto
```powershell
npx cap add android
npx cap add ios
```

### 6. Compilar el proyecto (genera el build estático)
```powershell
npm run build
```

### 7. Sincronizar Capacitor con los cambios
```powershell
npx cap sync
```

---

## Enrutamiento en Capacitor

Tu proyecto utiliza **TanStack Router**, que es totalmente compatible con Capacitor. 

### ✅ Lo que ya está configurado:
- **Hash-based routing NO es necesario** porque Capacitor sirve la app desde archivos locales (no requiere rutas del servidor)
- El archivo `dist/index.html` será la entrada para todas las rutas
- Capacitor maneja automáticamente la reescritura de rutas para una SPA

### Consideraciones importantes:

1. **URLs internas:** Las rutas relativas (como `/peleadores`, `/siguiendo`) funcionarán perfectamente.
2. **Links internos:** Los componentes `<Link>` de TanStack Router seguirán funcionando sin cambios.
3. **Deep linking (Abrir rutas desde notificaciones/URLs externas):** Puedes configurar si lo necesitas después.

---

## Comandos útiles después de la configuración inicial

### Abrir el proyecto en Android Studio
```powershell
npx cap open android
```

### Abrir el proyecto en Xcode (macOS)
```powershell
npx cap open ios
```

### Sincronizar cambios de web después de editar código
```powershell
npm run build
npx cap sync
```

### Sincronizar solo Capacitor (sin rebuild)
```powershell
npx cap copy
```

---

## Archivos modificados en este setup

- `vite.config.ts` - Agregado `outDir: "dist"` y CORS
- `capacitor.config.ts` - Configuración de Capacitor (creado)

## Notas sobre el build

- Tu proyecto usa **TanStack Start con SSR**. Para Capacitor, el build actual genera archivos estáticos en `dist/`.
- Si en el futuro necesitas cambios en SSR vs. SPA, se pueden manejar con variables de entorno.

---

## Próximos pasos después de ejecutar los comandos:

1. **Para desarrollar localmente:** Usa `npm run dev` como siempre (crea un servidor web)
2. **Para construir para móvil:** Ejecuta `npm run build && npx cap sync`
3. **Para hacer debugging en Android/iOS:** Abre el emulador y ejecuta desde Android Studio o Xcode
