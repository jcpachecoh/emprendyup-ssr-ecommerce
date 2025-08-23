You are a frontend developer assistant using Vibe Coding.
Your task is to **improve the landing page of EmprendyUp (https://www.emprendyup.com/)** keeping the current styles (colors, fonts, Tailwind classes) but enhancing the layout with modern sections, smooth animations, and lead capture actions.

### Requirements:

1. **Keep styles and brand consistency**
   - Maintain the current color palette and typography.
   - Reuse existing Tailwind classes whenever possible.

2. **Hero Section**
   - Add a main headline: "Tu emprendimiento con más alcance, tecnología y comunidad".
   - Add a subheadline: "Crea tu tienda en línea con tu marca, intégrala al marketplace colaborativo y potencia tu crecimiento con inteligencia artificial."
   - Add a primary CTA button with gradient + hover animation: "Quiero crear mi tienda".
   - Animate headline, subheadline, and CTA with **Framer Motion fade-in from bottom**.
   - Add floating animation to hero image/mockup using **Framer Motion keyframes**.

3. **Features Section (grid of benefits)**
   - Add a responsive grid (2–3 columns) with icons + titles:  
     🛒 Tienda online + Marketplace colaborativo  
     🤝 Acompañamiento en creación de tienda  
     📊 Métricas de ventas y visitas  
     📇 CRM integrado  
     🤖 IA para generar contenido  
     💬 Chatbot WhatsApp  
     🌎 Comunidad con capacitaciones y eventos
   - Each card must animate with **Framer Motion staggered fade-up on scroll**.

4. **How it Works Section**
   - Add a 3-step horizontal layout with icons:
     1. Crea tu tienda en minutos
     2. Conecta tu marca al marketplace
     3. Vende más con apoyo de la comunidad
   - Each step animates with **Framer Motion hover scale-up effect**.

5. **Lead Capture Section**
   - Insert a form with fields: Nombre, Email, WhatsApp.
   - Add CTA: "Quiero unirme a la comunidad".
   - Animate form container with **Framer Motion slide-up on scroll**.
   - Add optional bonus text: “Beneficios exclusivos para los primeros emprendedores”.

6. **Community / Testimonials Section**
   - Add a slider or grid with testimonials (placeholder data).
   - Each testimonial card animates with **Framer Motion fade-in + slight scale** when visible.

7. **Footer Enhancements**
   - Keep existing footer but add logos of payment methods and social media icons.
   - Animate footer entrance with **Framer Motion fade-in from bottom**.

### Animations (use **Framer Motion** everywhere):

- Hero text: `initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}`
- Features: staggered children with `variants` for smooth sequence.
- Buttons: `whileHover={{ scale: 1.05 }}` + gradient transitions.
- Images: floating / parallax using `animate={{ y: [0, -10, 0] }}` with infinite loop.
- Forms: slide-in on scroll with intersection observer + Framer Motion controls.

### Goal:

The final landing must look modern, interactive, and optimized to convert visitors into leads without losing EmprendyUp’s brand identity, using **Framer Motion** as the animation framework.
