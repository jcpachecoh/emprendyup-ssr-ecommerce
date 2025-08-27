import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import {
  Upload,
  X,
  Send,
  Palette,
  MapPin,
  Phone,
  Mail,
  Building,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  MessageSquare,
  Heart,
  Star,
  ThumbsUp,
} from 'lucide-react';

/** --- Types --- */
interface Message {
  from: 'bot' | 'user';
  text: string;
  type?: 'text' | 'image' | 'color' | 'select' | 'system';
  options?: string[];
  field?: keyof StoreData | string;
  validation?: ValidationRule;
  optional?: boolean;
}
interface ValidationRule {
  type: 'email' | 'phone' | 'url' | 'whatsapp' | 'text' | 'taxId';
  required?: boolean;
  message?: string;
}
interface StoreData {
  name: string;
  description: string;
  logoUrl: string;
  faviconUrl: string;
  bannerUrl: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  department: string;
  country: string;
  businessType: string;
  taxId: string;
  businessName: string;
  facebookUrl: string;
  instagramUrl: string;
  twitterUrl: string;
  youtubeUrl: string;
  tiktokUrl: string;
  whatsappNumber: string;
}

/** --- Questions --- */
const questions = [
  {
    text: '¡Hola! 👋 Soy Alex, tu asistente personal para crear tu tienda online. ¡Estoy súper emocionado de ayudarte! ¿Cuál es el nombre de tu emprendimiento?',
    field: 'name',
    type: 'text' as const,
    validation: { type: 'text' as const, required: true, message: 'El nombre es requerido' },
    encouragement: '¡Qué nombre tan genial! Ya me imagino tu tienda brillando online ✨',
    avatarEmotion: 'excited',
  },
  {
    text: '¡Perfecto! Me encanta ese nombre 😍 Ahora cuéntame brevemente sobre tu negocio. ¿Qué productos o servicios ofreces? ¡Estoy súper curioso!',
    field: 'description',
    type: 'text' as const,
    validation: { type: 'text' as const, required: false },
    optional: true,
    encouragement: '¡Wow! Suena increíble. Tus clientes van a amar esto 💖',
    avatarEmotion: 'curious',
  },
  {
    text: '¡Genial! 🎨 Ahora vamos a darle identidad visual a tu tienda. ¡Esta es mi parte favorita! Sube tu logo principal:',
    field: 'logoUrl',
    type: 'image' as const,
    validation: { type: 'url' as const, required: false },
    optional: true,
    encouragement: '¡Hermoso logo! Va a verse espectacular en tu tienda 🌟',
    avatarEmotion: 'creative',
  },
  {
    text: '¡Excelente! ¿Tienes un favicon? Es el pequeño ícono que aparece en las pestañas del navegador. ¡Los detalles hacen la diferencia! 🎯',
    field: 'faviconUrl',
    type: 'image' as const,
    validation: { type: 'url' as const, required: false },
    optional: true,
    encouragement: '¡Perfecto! Cada detalle cuenta para una experiencia profesional 👌',
    avatarEmotion: 'proud',
  },
  {
    text: '¡Vamos súper bien! 🚀 ¿Tienes una imagen de banner para la portada de tu tienda? ¡Esto va a lucir increíble!',
    field: 'bannerUrl',
    type: 'image' as const,
    validation: { type: 'url' as const, required: false },
    optional: true,
    encouragement: '¡Espectacular! Tu tienda va a tener un impacto visual increíble 🎨',
    avatarEmotion: 'happy',
  },
  {
    text: '🌈 ¡Hora de los colores! Esta es la parte más divertida. Elige tu color principal (será el alma de tu tienda):',
    field: 'primaryColor',
    type: 'color' as const,
    validation: { type: 'text' as const, required: true },
    encouragement: '¡Me encanta esa elección! Ese color transmite mucha personalidad 🎨',
    avatarEmotion: 'creative',
  },
  {
    text: '¡Excelente combinación! 💫 Ahora elige un color secundario (para textos y elementos de apoyo):',
    field: 'secondaryColor',
    type: 'color' as const,
    validation: { type: 'text' as const, required: false },
    optional: true,
    encouragement: '¡Perfecta armonía de colores! Tienes muy buen gusto 🌟',
    avatarEmotion: 'impressed',
  },
  {
    text: '¡Increíble! ✨ Ahora elige un color de acento (para botones y elementos que quieras destacar):',
    field: 'accentColor',
    type: 'color' as const,
    validation: { type: 'text' as const, required: false },
    optional: true,
    encouragement: '¡Boom! 💥 Esa combinación va a llamar la atención de todos',
    avatarEmotion: 'excited',
  },
  {
    text: '📧 ¡Genial! Ahora vamos con la información de contacto. ¿Cuál es tu email principal? ¡Necesitamos que tus clientes puedan encontrarte!',
    field: 'email',
    type: 'text' as const,
    validation: {
      type: 'email' as const,
      required: true,
      message: 'Por favor ingresa un email válido',
    },
    encouragement: '¡Perfecto! Tus clientes podrán contactarte fácilmente 📬',
    avatarEmotion: 'thumbsup',
  },
  {
    text: '📱 ¡Excelente! ¿Cuál es tu número de teléfono? ¡La comunicación directa siempre funciona mejor!',
    field: 'phone',
    type: 'text' as const,
    validation: { type: 'phone' as const, required: false, message: 'Formato: +57 300 123 4567' },
    optional: true,
    encouragement: '¡Genial! Ahora tus clientes tendrán múltiples formas de contactarte 📞',
    avatarEmotion: 'happy',
  },
  {
    text: '📍 ¡Súper! ¿Cuál es tu dirección completa? ¡Si tienes tienda física, esto será muy útil!',
    field: 'address',
    type: 'text' as const,
    validation: { type: 'text' as const, required: false },
    optional: true,
    encouragement: '¡Perfecto! Los clientes locales podrán visitarte fácilmente 🗺️',
    avatarEmotion: 'proud',
  },
  {
    text: '🏙️ ¡Genial! ¿En qué ciudad te encuentras? ¡Me encanta conocer emprendedores de todo el país!',
    field: 'city',
    type: 'text' as const,
    validation: { type: 'text' as const, required: true, message: 'La ciudad es requerida' },
    encouragement: '¡Qué ciudad tan increíble! Seguro hay muchos clientes esperándote 🌆',
    avatarEmotion: 'curious',
  },
  {
    text: '🗺️ ¡Excelente! ¿En qué departamento/estado? ¡Estoy mapeando tu ubicación para optimizar tu tienda!',
    field: 'department',
    type: 'text' as const,
    validation: { type: 'text' as const, required: true, message: 'El departamento es requerido' },
    encouragement: '¡Perfecto! Ya tengo una idea clara de tu ubicación 📍',
    avatarEmotion: 'thumbsup',
  },
  {
    text: '🏢 ¡Genial! Información legal (¡no te preocupes, es rápido!): ¿Qué tipo de negocio es?',
    field: 'businessType',
    type: 'select' as const,
    options: ['Persona Natural', 'SAS', 'LTDA', 'SA', 'Fundación', 'Cooperativa'],
    validation: { type: 'text' as const, required: true },
    encouragement: '¡Excelente elección! Todo va quedando perfectamente estructurado 📋',
    avatarEmotion: 'impressed',
  },
  {
    text: '📄 ¡Casi terminamos! ¿Cuál es tu número de identificación tributaria (NIT/RUT)? ¡Es opcional pero ayuda mucho!',
    field: 'taxId',
    type: 'text' as const,
    validation: { type: 'taxId' as const, required: false, message: 'Formato: 123456789-1' },
    optional: true,
    encouragement: '¡Genial! Todo está quedando súper profesional 💼',
    avatarEmotion: 'proud',
  },
  {
    text: '🏛️ ¿Cuál es la razón social de tu empresa? (Si aplica) ¡Los nombres oficiales dan mucha confianza!',
    field: 'businessName',
    type: 'text' as const,
    validation: { type: 'text' as const, required: false },
    optional: true,
    encouragement: '¡Perfecto! Suena muy profesional y confiable 🌟',
    avatarEmotion: 'happy',
  },
  {
    text: '📱 ¡Ahora lo divertido! Redes sociales (opcional): ¿Tienes Facebook? ¡Vamos a conectar todos tus canales!',
    field: 'facebookUrl',
    type: 'text' as const,
    validation: {
      type: 'url' as const,
      required: false,
      message: 'Ejemplo: https://facebook.com/tupagina',
    },
    optional: true,
    encouragement: '¡Fantástico! Facebook va a ayudarte a llegar a más clientes 👥',
    avatarEmotion: 'excited',
  },
  {
    text: '📸 ¡Súper! ¿Tienes Instagram? ¡Las fotos de tus productos van a verse increíbles!',
    field: 'instagramUrl',
    type: 'text' as const,
    validation: {
      type: 'url' as const,
      required: false,
      message: 'Ejemplo: https://instagram.com/tuusuario',
    },
    optional: true,
    encouragement: '¡Wow! Instagram va a ser perfecto para mostrar tus productos 📷',
    avatarEmotion: 'creative',
  },
  {
    text: '🐦 ¡Genial! ¿Tienes Twitter/X? ¡Perfecto para noticias y conectar con tu audiencia!',
    field: 'twitterUrl',
    type: 'text' as const,
    validation: {
      type: 'url' as const,
      required: false,
      message: 'Ejemplo: https://twitter.com/tuusuario',
    },
    optional: true,
    encouragement: '¡Excelente! Twitter te ayudará a mantener a tus clientes informados 🗣️',
    avatarEmotion: 'thumbsup',
  },
  {
    text: '🎥 ¡Increíble! ¿Tienes YouTube? ¡Los videos son súper poderosos para mostrar productos!',
    field: 'youtubeUrl',
    type: 'text' as const,
    validation: {
      type: 'url' as const,
      required: false,
      message: 'Ejemplo: https://youtube.com/c/tucanal',
    },
    optional: true,
    encouragement: '¡Fantástico! YouTube va a ser una herramienta increíble para tu negocio 🎬',
    avatarEmotion: 'impressed',
  },
  {
    text: '🎵 ¡Qué bien! ¿Tienes TikTok? ¡La creatividad no tiene límites ahí!',
    field: 'tiktokUrl',
    type: 'text' as const,
    validation: {
      type: 'url' as const,
      required: false,
      message: 'Ejemplo: https://tiktok.com/@tuusuario',
    },
    optional: true,
    encouragement: '¡Increíble! TikTok va a llevar tu creatividad al siguiente nivel 🎭',
    avatarEmotion: 'excited',
  },
  {
    text: '📞 ¡Último paso! ¿Tienes WhatsApp Business? ¡Es perfecto para atención al cliente directa!',
    field: 'whatsappNumber',
    type: 'text' as const,
    validation: {
      type: 'whatsapp' as const,
      required: false,
      message: 'Formato: +57 300 123 4567',
    },
    optional: true,
    encouragement: '¡Perfecto! WhatsApp va a hacer que la comunicación sea súper fluida 💬',
    avatarEmotion: 'happy',
  },
];

/** --- Defaults --- */
const defaultStoreData: StoreData = {
  name: '',
  description: '',
  logoUrl: '',
  faviconUrl: '',
  bannerUrl: '',
  primaryColor: '#3B82F6',
  secondaryColor: '#1F2937',
  accentColor: '#10B981',
  backgroundColor: '#FFFFFF',
  textColor: '#111827',
  email: '',
  phone: '',
  address: '',
  city: '',
  department: '',
  country: 'Colombia',
  businessType: '',
  taxId: '',
  businessName: '',
  facebookUrl: '',
  instagramUrl: '',
  twitterUrl: '',
  youtubeUrl: '',
  tiktokUrl: '',
  whatsappNumber: '',
};

/** --- 3D Avatar --- */
function Avatar3D({ emotion, isVisible }: { emotion: string; isVisible: boolean }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const avatarRef = useRef<THREE.Group | null>(null);
  const animationIdRef = useRef<number | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [emotionLabel, setEmotionLabel] = useState('');

  const emotionLabels: Record<string, string> = {
    excited: '🎉 Excited',
    happy: '😊 Happy',
    creative: '🎨 Creative',
    thumbsup: '👍 Thumbs Up',
    curious: '🤔 Curious',
    default: '😌 Neutral',
  };

  useEffect(() => {
    setEmotionLabel(emotionLabels[emotion] || emotionLabels['default']);
  }, [emotion]);

  useEffect(() => {
    if (!mountRef.current) return;

    setIsLoading(true);

    // Scene setup with improved settings
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a1a2e);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(75, 250 / 300, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(250, 300);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    rendererRef.current = renderer;
    mountRef.current.appendChild(renderer.domElement);

    // Enhanced lighting for better visual appeal
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(3, 3, 3);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    scene.add(directionalLight);

    // Rim light for better depth
    const rimLight = new THREE.DirectionalLight(0x74b9ff, 0.5);
    rimLight.position.set(-3, 2, -2);
    scene.add(rimLight);

    // Avatar creation with improved materials
    const avatarGroup = new THREE.Group();
    avatarRef.current = avatarGroup;

    // Head with better material
    const headGeometry = new THREE.SphereGeometry(0.45, 32, 32);
    const headMaterial = new THREE.MeshPhongMaterial({
      color: 0xfdbcb4,
      shininess: 30,
      specular: 0x111111,
    });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.y = 1.5;
    head.castShadow = true;
    head.receiveShadow = true;
    avatarGroup.add(head);

    // Eyes with better design
    const eyeGeometry = new THREE.SphereGeometry(0.08, 16, 16);
    const eyeMaterial = new THREE.MeshPhongMaterial({
      color: 0x2c3e50,
      shininess: 100,
      specular: 0x444444,
    });
    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-0.18, 1.55, 0.35);
    avatarGroup.add(leftEye);

    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(0.18, 1.55, 0.35);
    avatarGroup.add(rightEye);

    // Eye highlights for life-like appearance
    const highlightGeometry = new THREE.SphereGeometry(0.02, 8, 8);
    const highlightMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const leftHighlight = new THREE.Mesh(highlightGeometry, highlightMaterial);
    leftHighlight.position.set(-0.15, 1.6, 0.42);
    avatarGroup.add(leftHighlight);

    const rightHighlight = new THREE.Mesh(highlightGeometry, highlightMaterial);
    rightHighlight.position.set(0.21, 1.6, 0.42);
    avatarGroup.add(rightHighlight);

    // Dynamic smile based on emotion
    const smileGeometry = new THREE.TorusGeometry(
      emotion === 'excited' ? 0.2 : 0.15,
      0.025,
      8,
      16,
      Math.PI
    );
    const smileMaterial = new THREE.MeshPhongMaterial({
      color: emotion === 'excited' ? 0xff4757 : 0xff6b6b,
      shininess: 50,
    });
    const smile = new THREE.Mesh(smileGeometry, smileMaterial);
    smile.position.set(0, 1.35, 0.35);
    smile.rotation.z = Math.PI;
    avatarGroup.add(smile);

    // Body with gradient effect simulation
    const bodyGeometry = new THREE.CylinderGeometry(0.35, 0.45, 1.4, 12);
    const bodyMaterial = new THREE.MeshPhongMaterial({
      color: 0x4a90e2,
      shininess: 30,
      specular: 0x222222,
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 0.3;
    body.castShadow = true;
    body.receiveShadow = true;
    avatarGroup.add(body);

    // Arms with improved geometry
    const armGeometry = new THREE.CylinderGeometry(0.08, 0.12, 0.9, 12);
    const armMaterial = new THREE.MeshPhongMaterial({
      color: 0xfdbcb4,
      shininess: 20,
    });
    const leftArm = new THREE.Mesh(armGeometry, armMaterial);
    leftArm.position.set(-0.6, 0.7, 0);
    leftArm.rotation.z = 0.4;
    leftArm.castShadow = true;
    avatarGroup.add(leftArm);

    const rightArm = new THREE.Mesh(armGeometry, armMaterial);
    rightArm.position.set(0.6, 0.7, 0);
    rightArm.rotation.z = -0.4;
    rightArm.castShadow = true;
    avatarGroup.add(rightArm);

    // Legs
    const legGeometry = new THREE.CylinderGeometry(0.1, 0.14, 1.1, 12);
    const legMaterial = new THREE.MeshPhongMaterial({
      color: 0x2c3e50,
      shininess: 10,
    });
    const leftLeg = new THREE.Mesh(legGeometry, legMaterial);
    leftLeg.position.set(-0.22, -0.8, 0);
    leftLeg.castShadow = true;
    avatarGroup.add(leftLeg);

    const rightLeg = new THREE.Mesh(legGeometry, legMaterial);
    rightLeg.position.set(0.22, -0.8, 0);
    rightLeg.castShadow = true;
    avatarGroup.add(rightLeg);

    scene.add(avatarGroup);
    camera.position.set(0, 1.2, 3.5);

    // Enhanced particles system
    const particleCount = 30;
    const particles = new THREE.Group();
    for (let i = 0; i < particleCount; i++) {
      const particleGeometry = new THREE.SphereGeometry(0.02, 6, 6);
      const particleMaterial = new THREE.MeshPhongMaterial({
        color: Math.random() > 0.5 ? 0x74b9ff : 0xfdcb6e,
        transparent: true,
        opacity: Math.random() * 0.5 + 0.3,
        emissive: Math.random() > 0.7 ? 0x222222 : 0x000000,
      });
      const p = new THREE.Mesh(particleGeometry, particleMaterial);
      p.position.set((Math.random() - 0.5) * 4, Math.random() * 3, (Math.random() - 0.5) * 2);
      p.userData = {
        speed: Math.random() * 0.02 + 0.01,
        phase: Math.random() * Math.PI * 2,
      };
      particles.add(p);
    }
    scene.add(particles);

    let time = 0;
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      time += 0.016; // More consistent timing

      if (avatarRef.current) {
        const hoverMultiplier = isHovered ? 1.5 : 1;

        switch (emotion) {
          case 'excited':
            avatarRef.current.position.y = Math.sin(time * 5) * 0.15 * hoverMultiplier;
            avatarRef.current.rotation.y = Math.sin(time * 2) * 0.3;
            avatarRef.current.rotation.z = Math.sin(time * 3) * 0.05;
            break;
          case 'happy':
            avatarRef.current.position.y = Math.sin(time * 2) * 0.08 * hoverMultiplier;
            avatarRef.current.rotation.y = Math.sin(time) * 0.15;
            break;
          case 'creative':
            avatarRef.current.rotation.y = Math.sin(time * 0.8) * 0.4;
            avatarRef.current.children[0].rotation.x = Math.sin(time * 2) * 0.15;
            avatarRef.current.position.y = Math.sin(time * 1.5) * 0.05 * hoverMultiplier;
            break;
          case 'thumbsup':
            if (avatarRef.current.children[7]) {
              // Right arm
              avatarRef.current.children[7].rotation.z = -0.1 + Math.sin(time * 4) * 0.3;
              avatarRef.current.children[7].rotation.x = Math.sin(time * 2) * 0.1;
            }
            avatarRef.current.position.y = Math.sin(time * 1.5) * 0.05 * hoverMultiplier;
            break;
          case 'curious':
            avatarRef.current.children[0].rotation.x = Math.sin(time * 2) * 0.25;
            avatarRef.current.children[0].rotation.z = Math.sin(time * 1.5) * 0.1;
            avatarRef.current.position.y = Math.sin(time * 1.2) * 0.04 * hoverMultiplier;
            break;
          default:
            avatarRef.current.position.y = Math.sin(time * 1.5) * 0.04 * hoverMultiplier;
            avatarRef.current.rotation.y = Math.sin(time * 0.5) * 0.08;
        }
      }

      // Enhanced particle animation
      particles.children.forEach((particle, index) => {
        const userData = particle.userData;
        particle.rotation.x += userData.speed;
        particle.rotation.y += userData.speed * 0.7;
        particle.position.y += Math.sin(time + userData.phase) * 0.003;
        particle.position.x += Math.cos(time + userData.phase) * 0.002;

        // Fade particles in and out
        const material = particle.material as THREE.MeshPhongMaterial;
        material.opacity = 0.3 + Math.sin(time * 2 + userData.phase) * 0.2;
      });

      renderer.render(scene, camera);
    };

    // Simulate loading time for better UX
    setTimeout(() => {
      setIsLoading(false);
      animate();
    }, 800);

    return () => {
      if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      scene.clear();
    };
  }, [emotion, isHovered]);

  if (!isVisible) return null;

  return (
    <div className="relative group">
      {/* Loading State */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-900 to-indigo-900 rounded-xl border-2 border-purple-400 z-10">
          <div className="flex flex-col items-center space-y-3">
            <div className="w-8 h-8 border-3 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-white text-sm font-medium">Loading Avatar...</p>
          </div>
        </div>
      )}

      {/* Avatar Container */}
      <div
        ref={mountRef}
        className={`rounded-xl overflow-hidden shadow-2xl border-2 transition-all duration-300 cursor-pointer transform
          ${isHovered ? 'border-purple-300 shadow-purple-500/30 scale-105' : 'border-purple-400 shadow-purple-500/20'}
          ${isLoading ? 'opacity-0' : 'opacity-100'}
        `}
        style={{
          width: '250px',
          height: '300px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />

      {/* Status Indicator */}
      <div className="absolute top-2 right-2 flex items-center space-x-1">
        <div className="bg-green-500 rounded-full w-3 h-3 relative">
          <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-75"></div>
        </div>
        <span className="text-xs text-white/80 font-medium bg-black/20 px-2 py-1 rounded-full backdrop-blur-sm">
          Live
        </span>
      </div>

      {/* Emotion Label */}
      <div
        className={`absolute bottom-2 left-2 right-2 transition-all duration-300 ${
          isHovered || !isLoading ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}
      >
        <div className="bg-black/40 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/20">
          <p className="text-white text-sm font-medium text-center">{emotionLabel}</p>
        </div>
      </div>

      {/* Hover Tooltip */}
      <div
        className={`absolute -top-12 left-1/2 transform -translate-x-1/2 transition-all duration-300 pointer-events-none ${
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}
      >
        <div className="bg-gray-800 text-white text-xs px-3 py-2 rounded-lg shadow-lg whitespace-nowrap">
          Click to interact • Hover for details
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
        </div>
      </div>
    </div>
  );
}

/** --- Small UI helpers --- */
function FileUpload({
  onFile,
  accept = 'image/*',
}: {
  onFile: (fileUrl: string) => void;
  accept?: string;
}) {
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      await new Promise((resolve) => setTimeout(resolve, 800));
      const fileUrl = URL.createObjectURL(file);
      setPreview(fileUrl);
      onFile(fileUrl);
      setIsUploading(false);
    }
  };

  return (
    <div className="mt-2">
      {!preview ? (
        <label className="block border-2 border-dashed border-indigo-300 rounded-lg p-4 text-center cursor-pointer hover:border-indigo-500 transition-colors bg-indigo-50">
          <input type="file" accept={accept} onChange={handleFileChange} className="hidden" />
          {isUploading ? (
            <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
          ) : (
            <Upload className="w-6 h-6 text-indigo-400 mx-auto mb-2" />
          )}
          <p className="text-sm text-indigo-600">
            {isUploading ? 'Subiendo...' : 'Haz clic para subir archivo'}
          </p>
        </label>
      ) : (
        <div className="relative inline-block">
          <img
            src={preview}
            alt="Preview"
            className="w-20 h-20 object-cover rounded-lg border-2 border-indigo-300"
          />
          <button
            onClick={() => {
              setPreview(null);
              onFile('');
            }}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}
    </div>
  );
}

function ColorPicker({ value, onChange }: { value: string; onChange: (color: string) => void }) {
  const presetColors = [
    '#3B82F6',
    '#EF4444',
    '#10B981',
    '#F59E0B',
    '#8B5CF6',
    '#EC4899',
    '#6B7280',
    '#1F2937',
    '#06B6D4',
    '#84CC16',
    '#F97316',
    '#A855F7',
  ];
  return (
    <div className="mt-2 space-y-3">
      <div className="flex gap-2 flex-wrap">
        {presetColors.map((color) => (
          <button
            key={color}
            onClick={() => onChange(color)}
            className={`w-10 h-10 rounded-full border-4 transition-all hover:scale-110 ${
              value === color ? 'border-gray-900 scale-110 shadow-lg' : 'border-gray-300'
            }`}
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-10 h-10 rounded-lg border-2 border-indigo-300"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 px-3 py-2 border-2 border-indigo-300 rounded-lg text-sm font-mono focus:border-indigo-500 focus:outline-none"
          placeholder="#000000"
        />
      </div>
    </div>
  );
}

function SelectInput({
  options,
  onSelect,
}: {
  options: string[];
  onSelect: (value: string) => void;
}) {
  return (
    <div className="mt-2 grid grid-cols-2 gap-2">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onSelect(option)}
          className="px-4 py-3 bg-gradient-to-r from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 rounded-lg text-sm transition-all border-2 border-indigo-200 hover:border-indigo-400 transform hover:scale-105"
        >
          {option}
        </button>
      ))}
    </div>
  );
}

/** --- Main Component --- */
export default function EnhancedAvatarStoreChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [input, setInput] = useState('');
  const [storeData, setStoreData] = useState<StoreData>(defaultStoreData);
  const [isTyping, setIsTyping] = useState(false);
  const [progress, setProgress] = useState(0);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [avatarEmotion, setAvatarEmotion] = useState('happy');
  const [showEncouragement, setShowEncouragement] = useState(false);
  const [lastEncouragement, setLastEncouragement] = useState('');

  const endReached = currentStep >= questions.length;
  const activeQuestion = questions[currentStep];

  /** --- Validation --- */
  const validateInput = (
    value: string,
    validation: ValidationRule
  ): { isValid: boolean; error?: string } => {
    // Allow empty if not required
    if (!validation.required && (!value || value.trim() === '')) {
      return { isValid: true };
    }
    if (validation.required && (!value || value.trim() === '')) {
      return { isValid: false, error: validation.message || 'Este campo es requerido' };
    }

    const v = value.trim();

    switch (validation.type) {
      case 'email': {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;
        return re.test(v)
          ? { isValid: true }
          : { isValid: false, error: validation.message || 'Email inválido' };
      }
      case 'phone': {
        // Permite formatos con +, espacios y grupos
        const re = /^\+?\d[\d\s()-]{6,}$/;
        return re.test(v)
          ? { isValid: true }
          : { isValid: false, error: validation.message || 'Teléfono inválido' };
      }
      case 'whatsapp': {
        const re = /^\+?\d[\d\s()-]{6,}$/;
        return re.test(v)
          ? { isValid: true }
          : { isValid: false, error: validation.message || 'WhatsApp inválido' };
      }
      case 'url': {
        try {
          // Allow protocol-less like facebook.com/user → prepend https
          const url = v.startsWith('http') ? v : `https://${v}`;
          new URL(url);
          return { isValid: true };
        } catch {
          return { isValid: false, error: validation.message || 'URL inválida' };
        }
      }
      case 'taxId': {
        // NIT/RUT básico: dígitos con guion de verificación opcional
        const re = /^\d{5,12}(-\d)?$/;
        return re.test(v)
          ? { isValid: true }
          : { isValid: false, error: validation.message || 'NIT/RUT inválido' };
      }
      case 'text':
      default:
        return v.length > 0
          ? { isValid: true }
          : { isValid: false, error: validation.message || 'Texto inválido' };
    }
  };

  /** --- Helpers --- */
  const pushBot = async (text: string, extra?: Partial<Message>) => {
    setIsTyping(true);
    await new Promise((r) => setTimeout(r, 400));
    setMessages((m) => [...m, { from: 'bot', text, type: 'text', ...extra }]);
    setIsTyping(false);
  };

  const advanceProgress = (step: number) => {
    const pct = Math.round((step / questions.length) * 100);
    setProgress(Math.min(100, pct));
  };

  /** --- Mount: greet with first question --- */
  useEffect(() => {
    pushBot(questions[0].text, {
      type: questions[0].type,
      field: questions[0].field,
      options: (questions[0] as any).options,
    });
    setAvatarEmotion('excited');
    advanceProgress(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** --- When step changes, ask next question --- */
  useEffect(() => {
    if (currentStep > 0 && currentStep < questions.length) {
      const q = questions[currentStep];
      setAvatarEmotion(q.avatarEmotion);
      pushBot(q.text, { type: q.type, field: q.field, options: (q as any).options });
      advanceProgress(currentStep);
    }
    if (endReached) {
      setAvatarEmotion('thumbsup');
      pushBot('¡Listo! 🎉 Ya tengo toda la información. Aquí tienes el resumen de tu tienda:', {
        type: 'system',
      });
      setShowEncouragement(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep]);

  /** --- Answer handling --- */
  const handleAnswer = async (value: string) => {
    if (endReached) return;

    const q = questions[currentStep];
    const { validation } = q;

    if (validation) {
      const res = validateInput(value, validation);
      if (!res.isValid) {
        setValidationError(res.error || 'Revisa este campo');
        return;
      }
    }

    // Clear error
    setValidationError(null);

    // Commit user message
    setMessages((m) => [...m, { from: 'user', text: value }]);

    // Update store data
    setStoreData((prev) => ({
      ...prev,
      [q.field as keyof StoreData]: value,
    }));

    // Encouragement
    if ((q as any).encouragement) {
      setLastEncouragement((q as any).encouragement);
      setShowEncouragement(true);
      setTimeout(() => setShowEncouragement(false), 1600);
    }

    // Next step
    setCurrentStep((s) => s + 1);
    setInput('');
  };

  /** --- UI field icon mapping (for summary) --- */
  const FieldIcon = ({ field }: { field: keyof StoreData | string }) => {
    switch (field) {
      case 'email':
        return <Mail className="w-4 h-4" />;
      case 'phone':
        return <Phone className="w-4 h-4" />;
      case 'address':
        return <MapPin className="w-4 h-4" />;
      case 'businessName':
      case 'businessType':
      case 'taxId':
        return <Building className="w-4 h-4" />;
      case 'facebookUrl':
        return <Facebook className="w-4 h-4" />;
      case 'instagramUrl':
        return <Instagram className="w-4 h-4" />;
      case 'twitterUrl':
        return <Twitter className="w-4 h-4" />;
      case 'youtubeUrl':
        return <Youtube className="w-4 h-4" />;
      default:
        return <MessageSquare className="w-4 h-4" />;
    }
  };

  /** --- Render input for current question --- */
  const renderInput = () => {
    if (endReached) return null;
    const q = activeQuestion;
    switch (q.type) {
      case 'image':
        return (
          <FileUpload
            onFile={(url) => {
              // Auto-submit once user selects a file (optional fields allow empty)
              if (!url && q.optional) return;
              handleAnswer(url || '');
            }}
            accept="image/*"
          />
        );
      case 'color':
        return (
          <div className="space-y-2">
            <ColorPicker
              value={(storeData[q.field as keyof StoreData] as string) || '#3B82F6'}
              onChange={(c) => setInput(c)}
            />
            <button
              onClick={() =>
                handleAnswer(
                  input || (storeData[q.field as keyof StoreData] as string) || '#3B82F6'
                )
              }
              className="mt-2 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
            >
              <Palette className="w-4 h-4" /> Usar este color
            </button>
          </div>
        );
      case 'select':
        return <SelectInput options={q.options || []} onSelect={(val) => handleAnswer(val)} />;
      case 'text':
      default:
        return (
          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleAnswer(input);
              }}
              placeholder="Escribe tu respuesta…"
              className="flex-1 px-4 py-3 border-2 border-indigo-200 rounded-lg focus:outline-none focus:border-indigo-500"
            />
            <button
              onClick={() => handleAnswer(input)}
              className="px-4 py-3 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-40"
              disabled={activeQuestion.validation?.required && input.trim() === ''}
              aria-label="Enviar"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        );
    }
  };

  /** --- Summary Card --- */
  const Summary = () => {
    const c = storeData;
    const colorChip = (hex: string, label: string) => (
      <div className="flex items-center gap-3">
        <span className="inline-block w-6 h-6 rounded border" style={{ backgroundColor: hex }} />
        <span className="text-sm font-mono">
          {label}: {hex}
        </span>
      </div>
    );

    return (
      <div
        className="rounded-2xl shadow-xl border overflow-hidden"
        style={{ background: c.backgroundColor || '#fff', color: c.textColor || '#111827' }}
      >
        {/* Hero / banner preview */}
        <div className="relative h-40 w-full">
          {c.bannerUrl ? (
            <img src={c.bannerUrl} alt="Banner" className="w-full h-full object-cover" />
          ) : (
            <div
              className="w-full h-full"
              style={{
                background: `linear-gradient(135deg, ${c.primaryColor} 0%, ${c.accentColor} 100%)`,
              }}
            />
          )}
          <div className="absolute inset-0 bg-black/15" />
          <div className="absolute bottom-3 left-4 flex items-center gap-3">
            {c.logoUrl ? (
              <img
                src={c.logoUrl}
                alt="Logo"
                className="w-12 h-12 rounded-xl border-2 border-white object-cover"
              />
            ) : (
              <div className="w-12 h-12 rounded-xl border-2 border-white bg-white/70 flex items-center justify-center font-bold">
                {c.name?.slice(0, 1) || 'L'}
              </div>
            )}
            <div>
              <h3 className="font-semibold text-white drop-shadow">{c.name || 'Tu tienda'}</h3>
              <p className="text-white/90 text-xs">
                {c.description || 'Descripción de tu negocio'}
              </p>
            </div>
          </div>
        </div>

        {/* Info grid */}
        <div className="p-4 grid md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <h4 className="font-semibold flex items-center gap-2">
              <Mail className="w-4 h-4" /> Contacto
            </h4>
            {c.email && (
              <div className="text-sm flex items-center gap-2">
                <Mail className="w-4 h-4" /> {c.email}
              </div>
            )}
            {c.phone && (
              <div className="text-sm flex items-center gap-2">
                <Phone className="w-4 h-4" /> {c.phone}
              </div>
            )}
            {(c.address || c.city || c.department) && (
              <div className="text-sm flex items-center gap-2">
                <MapPin className="w-4 h-4" /> {c.address} {c.city && `• ${c.city}`}{' '}
                {c.department && `• ${c.department}`} {c.country && `• ${c.country}`}
              </div>
            )}
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold flex items-center gap-2">
              <Building className="w-4 h-4" /> Empresa
            </h4>
            {c.businessName && <div className="text-sm">Razón social: {c.businessName}</div>}
            {c.businessType && <div className="text-sm">Tipo: {c.businessType}</div>}
            {c.taxId && <div className="text-sm">NIT/RUT: {c.taxId}</div>}
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold flex items-center gap-2">
              <Palette className="w-4 h-4" /> Branding
            </h4>
            <div className="space-y-1">
              {colorChip(c.primaryColor, 'Primario')}
              {c.secondaryColor && colorChip(c.secondaryColor, 'Secundario')}
              {c.accentColor && colorChip(c.accentColor, 'Acento')}
            </div>
          </div>
        </div>

        {/* Socials */}
        {(c.facebookUrl || c.instagramUrl || c.twitterUrl || c.youtubeUrl || c.tiktokUrl) && (
          <div className="px-4 pb-4">
            <h4 className="font-semibold mb-2">Redes</h4>
            <div className="flex flex-wrap gap-3 text-sm">
              {c.facebookUrl && (
                <a
                  href={c.facebookUrl}
                  target="_blank"
                  className="inline-flex items-center gap-1 underline"
                >
                  <Facebook className="w-4 h-4" /> Facebook
                </a>
              )}
              {c.instagramUrl && (
                <a
                  href={c.instagramUrl}
                  target="_blank"
                  className="inline-flex items-center gap-1 underline"
                >
                  <Instagram className="w-4 h-4" /> Instagram
                </a>
              )}
              {c.twitterUrl && (
                <a
                  href={c.twitterUrl}
                  target="_blank"
                  className="inline-flex items-center gap-1 underline"
                >
                  <Twitter className="w-4 h-4" /> X/Twitter
                </a>
              )}
              {c.youtubeUrl && (
                <a
                  href={c.youtubeUrl}
                  target="_blank"
                  className="inline-flex items-center gap-1 underline"
                >
                  <Youtube className="w-4 h-4" /> YouTube
                </a>
              )}
              {c.tiktokUrl && (
                <a
                  href={c.tiktokUrl}
                  target="_blank"
                  className="inline-flex items-center gap-1 underline"
                >
                  TikTok
                </a>
              )}
            </div>
          </div>
        )}

        {/* CTA preview */}
        <div className="p-4 border-t flex flex-wrap gap-2">
          <button
            className="px-4 py-2 rounded-lg text-white"
            style={{ backgroundColor: storeData.accentColor || '#10B981' }}
          >
            Comprar ahora
          </button>
          <button
            className="px-4 py-2 rounded-lg border"
            style={{ borderColor: storeData.primaryColor, color: storeData.primaryColor }}
          >
            Ver catálogo
          </button>
        </div>
      </div>
    );
  };

  /** --- Chat bubble --- */
  const ChatBubble = ({ msg }: { msg: Message }) => {
    const isUser = msg.from === 'user';
    return (
      <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
        <div
          className={`max-w-[80%] rounded-2xl px-4 py-3 shadow ${
            isUser
              ? 'bg-indigo-600 text-white rounded-br-sm'
              : 'bg-white text-gray-900 border rounded-bl-sm'
          }`}
        >
          <div className="text-sm whitespace-pre-wrap">{msg.text}</div>
        </div>
      </div>
    );
  };

  /** --- Layout --- */
  return (
    <div className="grid lg:grid-cols-[280px_1fr] gap-4">
      {/* Left: Avatar & progress */}
      <div className="sticky top-4 space-y-4">
        <Avatar3D emotion={avatarEmotion} isVisible />
        <div className="p-3 bg-white rounded-xl border shadow">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 font-medium">
              Progreso
              <Star className="w-4 h-4 text-yellow-500" />
            </div>
            <div className="text-sm text-gray-600">{Math.min(progress, 100)}%</div>
          </div>
          <div className="w-full h-2 rounded-full bg-gray-200 overflow-hidden">
            <div
              className="h-full rounded-full transition-all"
              style={{
                width: `${Math.min(progress, 100)}%`,
                background: `linear-gradient(90deg, ${storeData.primaryColor} 0%, ${storeData.accentColor} 100%)`,
              }}
            />
          </div>
          {showEncouragement && (
            <div className="mt-3 text-xs text-green-700 bg-green-50 border border-green-200 px-3 py-2 rounded-lg flex items-center gap-2">
              <ThumbsUp className="w-4 h-4" /> {lastEncouragement}
            </div>
          )}
        </div>
        {!endReached && (
          <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-xl text-xs text-indigo-900">
            Consejo: Puedes dejar campos opcionales vacíos y continuar más tarde.
          </div>
        )}
      </div>

      {/* Right: Chat & input */}
      <div className="space-y-4">
        <div className="p-4 bg-gradient-to-br from-slate-50 to-white border rounded-2xl min-h-[360px] flex flex-col gap-3">
          {messages.map((m, i) => (
            <ChatBubble key={i} msg={m} />
          ))}
          {isTyping && (
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.2s]" />
              <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" />
              <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:0.2s]" />
              <span>Alex está escribiendo…</span>
            </div>
          )}
        </div>

        {!endReached ? (
          <div className="p-4 bg-white border rounded-2xl space-y-2">
            {validationError && (
              <div className="text-sm text-red-700 bg-red-50 border border-red-200 px-3 py-2 rounded-lg">
                {validationError}
              </div>
            )}
            <div className="text-sm text-gray-700 mb-2">
              Paso {currentStep + 1} de {questions.length}
            </div>
            {renderInput()}
            {/* Skip optional */}
            {activeQuestion?.optional && (
              <button
                onClick={() => handleAnswer('')}
                className="mt-2 text-xs underline text-gray-500 hover:text-gray-700"
              >
                Saltar (opcional)
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <Summary />
            <div className="flex flex-wrap gap-2">
              <button
                className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
                onClick={() => {
                  setCurrentStep(0);
                  setStoreData(defaultStoreData);
                  setMessages([]);
                  setProgress(0);
                  setInput('');
                  setValidationError(null);
                  setAvatarEmotion('happy');
                  pushBot(questions[0].text, {
                    type: questions[0].type,
                    field: questions[0].field,
                    options: (questions[0] as any).options,
                  });
                }}
              >
                Empezar de nuevo
              </button>
              <button
                className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50"
                onClick={() => {
                  // Emit result – replace with your save logic
                  console.log('StoreData:', storeData);
                  alert('🎉 Datos listos. Revisa la consola para ver el objeto completo.');
                }}
              >
                Exportar datos
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
