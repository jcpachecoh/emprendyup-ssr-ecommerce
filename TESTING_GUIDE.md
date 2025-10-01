# 🧪 Guía de Testing - Sistema de Lead Generation

## Introducción

Esta guía te ayudará a probar y validar que todos los componentes del sistema de lead generation funcionan correctamente antes del lanzamiento en producción.

## 🚀 Testing Rápido

### 1. Configuración Inicial

```bash
# 1. Clona o actualiza el repositorio
git pull origin main

# 2. Instala dependencias
npm install

# 3. Configura variables de entorno
cp .env.example .env.local
```

### 2. Variables de Entorno Requeridas

```env
# Slack Integration (OBLIGATORIO)
NEXT_PUBLIC_SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK
NEXT_PUBLIC_DASHBOARD_URL=https://emprendyup.com/dashboard

# Google Analytics (RECOMENDADO)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Testing (DESARROLLO)
SLACK_TEST_KEY=your-secret-test-key-here
```

### 3. Ejecutar el Proyecto

```bash
npm run dev
```

## 🔍 Tests Disponibles

### A. Test Manual - Landing Page

1. **Visita la landing page:**

   ```
   http://localhost:3000/landing-leads
   ```

2. **Prueba con parámetros UTM:**

   ```
   http://localhost:3000/captura-leads?utm_source=google&utm_medium=cpc&utm_campaign=test&utm_term=emprendedores&utm_content=hero-cta
   ```

3. **Verifica que:**
   - [ ] La página carga correctamente
   - [ ] Los parámetros UTM se capturan (revisa localStorage)
   - [ ] El formulario funciona y envía datos
   - [ ] Se muestra mensaje de éxito/error apropiado

### B. Test de Slack Automation

1. **Panel de Testing:**

   ```
   http://localhost:3000/testing
   ```

2. **Test por API:**

   ```bash
   curl -X POST "http://localhost:3000/api/test-slack?key=development" \
   -H "Content-Type: application/json" \
   -d '{"type": "test"}'
   ```

3. **Verifica que:**
   - [ ] La notificación llega a Slack
   - [ ] El formato del mensaje es correcto
   - [ ] Los botones de acción funcionan
   - [ ] Los datos UTM se incluyen correctamente

### C. Test de Google Analytics

1. **Abrir Google Analytics Real-Time:**
   - Ve a tu cuenta de GA4
   - Navega a Reports > Realtime

2. **Generar eventos:**
   - Visita `/captura-leads` con parámetros UTM
   - Completa y envía el formulario
   - Navega por la página

3. **Verifica que:**
   - [ ] Aparecen usuarios en tiempo real
   - [ ] Los eventos personalizados se registran
   - [ ] Los parámetros UTM se capturan correctamente

## 🛠️ URLs de Prueba

### Campañas de Google Ads

```
http://localhost:3000/captura-leads?utm_source=google&utm_medium=cpc&utm_campaign=emprendedores-2024&utm_term=crear-tienda-online&utm_content=anuncio-principal
```

### Campañas de Facebook

```
http://localhost:3000/captura-leads?utm_source=facebook&utm_medium=social&utm_campaign=emprendedores-facebook&utm_content=carousel-video
```

### Email Marketing

```
http://localhost:3000/captura-leads?utm_source=newsletter&utm_medium=email&utm_campaign=newsletter-mensual&utm_content=cta-principal
```

### Instagram Orgánico

```
http://localhost:3000/captura-leads?utm_source=instagram&utm_medium=social&utm_campaign=contenido-organico&utm_content=stories
```

### LinkedIn Ads

```
http://localhost:3000/captura-leads?utm_source=linkedin&utm_medium=social&utm_campaign=emprendedores-b2b&utm_content=sponsored-post
```

## 🐛 Solución de Problemas

### Problema: Slack no recibe notificaciones

**Diagnóstico:**

```bash
# Verifica la configuración
curl -X GET "http://localhost:3000/api/test-slack"
```

**Soluciones:**

1. Verifica que `NEXT_PUBLIC_SLACK_WEBHOOK_URL` esté configurado
2. Confirma que el webhook de Slack sea válido
3. Revisa la consola del navegador para errores
4. Verifica que el canal de Slack permita webhooks

### Problema: UTM tracking no funciona

**Diagnóstico:**

1. Abre DevTools > Application > Local Storage
2. Busca la key `utm_data`
3. Verifica que los parámetros se almacenen

**Soluciones:**

1. Verifica que visitas la página con parámetros UTM
2. Confirma que JavaScript esté habilitado
3. Revisa que localStorage esté disponible

### Problema: Google Analytics no registra eventos

**Diagnóstico:**

1. Instala Google Analytics Debugger (extensión de Chrome)
2. Revisa Network tab para llamadas a Google Analytics
3. Verifica el ID de medición

**Soluciones:**

1. Confirma que `NEXT_PUBLIC_GA_MEASUREMENT_ID` esté configurado
2. Verifica que el ID sea correcto (formato: G-XXXXXXXXXX)
3. Espera unos minutos para que los datos aparezcan en GA4

## 📊 Validación de Producción

### Pre-lanzamiento Checklist

- [ ] **Configuración**
  - [ ] Variables de entorno configuradas en producción
  - [ ] Webhook de Slack funcional
  - [ ] Google Analytics configurado y probado
- [ ] **Funcionalidad**
  - [ ] Landing page carga correctamente
  - [ ] Formulario envía datos sin errores
  - [ ] Notificaciones Slack llegan inmediatamente
  - [ ] Analytics tracking funciona
- [ ] **Performance**
  - [ ] Página carga en menos de 3 segundos
  - [ ] Imágenes optimizadas
  - [ ] No hay errores de consola
- [ ] **SEO & Marketing**
  - [ ] Meta tags configurados
  - [ ] URL amigable funcionando
  - [ ] UTM tracking operativo
- [ ] **Security**
  - [ ] Panel de testing no accesible en producción
  - [ ] API keys no expuestas en cliente
  - [ ] HTTPS habilitado

### Post-lanzamiento Monitoring

1. **Primera Semana:**
   - Monitorea Slack diariamente para notificaciones
   - Revisa Google Analytics para tráfico y conversiones
   - Verifica que no hay errores 500 en los logs

2. **Primera Mes:**
   - Analiza conversion rate
   - Optimiza campañas basado en datos UTM
   - Ajusta formulario si es necesario

## 🎯 Métricas Clave

### Tracking de Conversión

- **Page Views:** Visitas a `/captura-leads`
- **Form Starts:** Usuarios que comienzan el formulario
- **Form Completions:** Envíos exitosos
- **Slack Notifications:** Notificaciones enviadas exitosamente

### Análisis de Fuentes

- **UTM Sources:** Google, Facebook, Email, etc.
- **UTM Mediums:** CPC, Social, Email, etc.
- **UTM Campaigns:** Performance por campaña específica

## 📞 Soporte

Si encuentras problemas durante el testing:

1. **Revisa la consola del navegador** para errores de JavaScript
2. **Verifica los logs del servidor** para errores de backend
3. **Usa las herramientas de debugging** incluidas en el proyecto
4. **Contacta al equipo de desarrollo** con detalles específicos del error

---

**¡Importante!** Recuerda desactivar o restringir el acceso al panel de testing (`/testing`) antes del lanzamiento en producción.
