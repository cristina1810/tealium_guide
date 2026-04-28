# 🚀 Deployment en Vercel - Guía Completa

## Cambios realizados para Vercel

Tu proyecto ahora está configurado para funcionar en **Vercel** con Serverless Functions. Aquí están los cambios principales:

### 📁 Estructura Nueva

```
guide/
├── api/                    # Serverless Functions
│   ├── chat.js            # POST /api/chat
│   ├── chat/reset.js      # POST /api/chat/reset
│   ├── health.js          # GET /api/health
│   └── utils/
│       ├── openai.js
│       └── threadManager.js
├── src/                   # Frontend React
├── vercel.json           # Configuración de Vercel
├── .env.example          # Variables de entorno (usa como template)
└── vite.config.js        # Sin proxy en production
```

### 🔑 Paso 1: Preparar variables de entorno

1. En tu terminal local, copia `.env.example` a `.env.local`:

```bash
cp .env.example .env.local
```

2. Edita `.env.local` con tus credenciales:

```
OPENAI_API_KEY=sk-proj-TU-CLAVE-AQUI
MAIN_AGENT_ID=asst_TU-ID-AQUI
```

### 📤 Paso 2: Subir a GitHub

1. Asegúrate de que `.env.local` está en `.gitignore` (✓ ya está configurado)
2. Sube tu código a GitHub:

```bash
git add .
git commit -m "Configurar para deployment en Vercel"
git push origin main
```

### ⚙️ Paso 3: Conectar Vercel

1. Ve a [vercel.com](https://vercel.com) y loguéate
2. Haz clic en "Add New..." → "Project"
3. Selecciona tu repositorio de GitHub
4. Vercel detectará automáticamente que es un proyecto de Vite
5. Haz clic en "Deploy"

### 🔐 Paso 4: Configurar variables de entorno en Vercel

1. En el dashboard de Vercel, ve a "Settings" → "Environment Variables"
2. Agrega estas variables:
   - **Nombre:** `OPENAI_API_KEY`
     **Valor:** Tu clave de OpenAI (de la que guardaste en `.env.local`)
   - **Nombre:** `MAIN_AGENT_ID`
     **Valor:** Tu ID del assistant

3. Haz clic en "Save"

### ✅ Paso 5: Re-desplegar

Una vez agregadas las variables:

1. Ve a "Deployments"
2. Haz clic en los "..." al lado del deployment
3. Selecciona "Redeploy"

### 🧪 Verificar que funciona

1. Una vez desplegado, abre tu URL de Vercel
2. Prueba el chat - debería conectarse a OpenAI sin errores
3. Verifica que el health check funciona: `https://tu-proyecto.vercel.app/api/health`

## ⚠️ Notas Importantes

### Threads de OpenAI en Producción

Los threads de OpenAI se guardan en memoria (Map). Esto significa que:

- **Problema:** Si el serverless function se reinicia, se pierden los threads
- **Solución a futuro:** Guardar threads en una base de datos

Para agregar base de datos:

1. Usa MongoDB Atlas (gratis hasta cierto punto)
2. Modifica `api/utils/threadManager.js` para guardar/recuperar threads de la BD

### CORS

Ya está configurado para permitir requests desde cualquier origen. Si necesitas restringir:

- Modifica los headers en `api/chat.js` y `api/chat/reset.js`

### Seguridad

✓ Las claves de API están protegidas en Vercel (no se exponen)
✓ `.env.local` no se sube a Git (está en `.gitignore`)
✓ No hay servidor Express ejecutándose innecesariamente

## 🐛 Si algo no funciona

### Error: "MAIN_AGENT_ID no configurado"

- Verifica que agregaste las variables de entorno en Vercel Settings
- Re-deploya el proyecto después de agregar las variables

### Error: "API key no válida"

- Revisa que copiastela clave correctamente (sin espacios)
- Verifica que la clave sigue siendo válida en https://platform.openai.com/api-keys

### Los endpoints no responden

- Verifica que los archivos en `/api` están correctamente creados
- Revisa los logs en Vercel Dashboard → Logs

## 📚 Comandos útiles

```bash
# Desarrollo local (con proxy a puerto 3001)
npm run dev

# Build para producción
npm run build

# Preview local del build
npm preview

# Ver logs en tiempo real (requiere Vercel CLI)
vercel logs --follow
```

¡Listo! Tu proyecto debería estar deployado en Vercel 🎉
