# 🚀 Landing Page para Captura de Leads - EmprendyUp

Esta landing page está específicamente diseñada para la captura y conversión de leads con tracking UTM completo y notificaciones automáticas a Slack.

## 📋 Características

### ✅ **Landing Page Completa**

- Header minimalista y enfocado en conversión
- Footer personalizado con enlaces esenciales
- Diseño responsivo optimizado para móviles
- Animaciones suaves con Framer Motion

### ✅ **Tracking UTM Avanzado**

- Captura automática de parámetros UTM de la URL
- Almacenamiento en localStorage para persistencia
- Integración con Google Analytics 4
- Tracking de eventos de conversión

### ✅ **Notificaciones Slack**

- Notificaciones instantáneas de nuevos leads
- Información completa del lead en formato estructurado
- Datos UTM incluidos para análisis de fuentes
- Botones de acción directa (email, dashboard)

### ✅ **Formulario Optimizado**

- Validación en tiempo real
- Estados de carga mejorados
- Doble confirmación de envío
- Mensaje de éxito personalizado

## 🔧 Configuración

### 1. Variables de Entorno

Copia `.env.example` a `.env.local` y configura:

```bash
# Slack Webhook (obligatorio para notificaciones)
NEXT_PUBLIC_SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK

# URL del dashboard (para botones en Slack)
NEXT_PUBLIC_DASHBOARD_URL=https://emprendyup.com/dashboard

# Google Analytics (opcional)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### 2. Configurar Slack Webhook

1. Ve a https://your-workspace.slack.com/apps/A0F7XDUAZ-incoming-webhooks
2. Crea un nuevo webhook para el canal deseado
3. Copia la URL del webhook a la variable de entorno

### 3. Estructura de Archivos

```
src/app/impulsa-tu-emprendimiento/
├── page.tsx                 # Página principal de la landing
├── components/
│   ├── LandingHeader.tsx    # Header minimalista
│   └── LandingFooter.tsx    # Footer personalizado
└── README.md               # Esta documentación

src/lib/services/
└── slack.ts                # Servicio de notificaciones Slack

src/types/
└── gtag.d.ts              # Tipos TypeScript para Google Analytics
```

## 🎯 Uso de la Landing Page

### URLs con Tracking UTM

```bash
# Ejemplo de URL con parámetros UTM
https://emprendyup.com/impulsa-tu-emprendimiento?utm_source=google&utm_medium=cpc&utm_campaign=emprendedores-2024&utm_term=crear-tienda&utm_content=anuncio-principal

# Parámetros soportados:
# utm_source    - Fuente del tráfico (google, facebook, email, etc.)
# utm_medium    - Medio de marketing (cpc, email, social, etc.)
# utm_campaign  - Campaña específica
# utm_term      - Términos de búsqueda (para SEM)
# utm_content   - Variante del contenido
```

### Analytics Tracking

La página automáticamente registra:

- Page views con datos UTM
- Eventos de conversión al completar el formulario
- Métricas de engagement

## 📊 Datos Capturados

### Información del Lead

- Nombre completo
- Email de contacto
- Nombre de la empresa
- Teléfono/WhatsApp
- Categoría del negocio
- Ubicación (país/ciudad)
- Descripción del negocio
- Fuente de referencia
- Website (opcional)

### Datos de Tracking

- UTM Source, Medium, Campaign
- UTM Term y Content
- Timestamp de registro
- IP y geolocalización (si está habilitado)

## 🔔 Notificaciones Slack

### Formato del Mensaje

Las notificaciones incluyen:

```
🎯 Nuevo Lead Registrado!

Nombre: Juan Pérez
Email: juan@empresa.com
Empresa: Mi Empresa SAS
Teléfono: +57 300 123 4567
Categoría: TECHNOLOGY
Ubicación: Bogotá, Colombia

Descripción del Negocio:
Desarrollo de software para pequeñas empresas...

Cómo nos encontró: GOOGLE
Website: https://miempresa.com

Información de Tracking:
UTM Source: google | Medium: cpc | Campaign: emprendedores-2024

📅 Registrado: 1 Oct 2025, 10:30 AM | 🌐 EmprendyUp Platform

[📧 Contactar Lead] [💼 Ver Dashboard]
```

### Personalización

Puedes personalizar las notificaciones editando:

- `src/lib/services/slack.ts` - Formato del mensaje
- Campos mostrados
- Botones de acción
- Estilo y emojis

## 🚀 Despliegue

### Desarrollo Local

```bash
npm run dev
# La landing estará disponible en:
# http://localhost:3000/impulsa-tu-emprendimiento
```

### Producción

```bash
npm run build
npm start
```

### Testing de Slack

Para probar las notificaciones:

```typescript
import { slackService } from '@/lib/services/slack';

// Enviar notificación de prueba
await slackService.sendTestNotification();
```

## 📈 Optimización

### SEO y Performance

- Meta tags optimizados para conversión
- Imágenes optimizadas con Next.js Image
- Lazy loading automático
- Core Web Vitals optimizados

### Conversión

- Call-to-Action prominentes
- Trust indicators visibles
- Formulario simplificado
- Validación en tiempo real

### Analytics

- Google Analytics 4 integrado
- Eventos personalizados
- Funnels de conversión
- Attribution tracking

## 🛠️ Mantenimiento

### Logs y Debugging

- Notificaciones Slack logueadas en consola
- Errores de formulario capturados
- Analytics events tracked

### Updates

- Actualizar campos del formulario en `LeadCaptureSectionNew.tsx`
- Modificar formato Slack en `slack.ts`
- Ajustar tracking en `captura-leads/page.tsx`

## 📞 Soporte

Para dudas sobre la implementación:

- Revisar logs de consola
- Verificar variables de entorno
- Probar webhook de Slack manualmente
- Validar configuración de Google Analytics

---

**¡Tu landing page para captura de leads está lista! 🎉**
