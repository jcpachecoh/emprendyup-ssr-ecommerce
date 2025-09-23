/* eslint-disable @typescript-eslint/no-unused-vars, no-console */
'use client';
import React, { useState, useEffect, useRef } from 'react';
import {
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
} from 'lucide-react';
import FileUpload from './FileUpload';
import { gql, useMutation } from '@apollo/client';
import { useSessionStore } from '@/lib/store/dashboard';
import StoreSummary from './StoreSummary';
// router not used in this component

interface Message {
  from: 'bot' | 'user';
  text: string;
  type?: 'text' | 'image' | 'color' | 'select';
  options?: string[];
  field?: string;
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
  userId: string;
  storeId: string;
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
  status: string;
}

const questions = [
  {
    text: '¡Hola! 👋 Soy tu asistente para crear tu tienda online. ¿Cuál es el nombre de tu emprendimiento?',
    field: 'name',
    type: 'text' as const,
    validation: { type: 'text' as const, required: true, message: 'El nombre es requerido' },
  },
  {
    text: 'Elige un identificador único (storeId) para tu tienda: una sola palabra sin espacios.',
    field: 'storeId',
    type: 'text' as const,
    validation: { type: 'text' as const, required: true, message: 'El identificador es requerido' },
  },
  {
    text: 'Perfecto! Ahora cuéntame brevemente sobre tu negocio. ¿Qué productos o servicios ofreces?',
    field: 'description',
    type: 'text' as const,
    validation: { type: 'text' as const, required: false },
    optional: true,
  },
  {
    text: '¡Genial! Ahora vamos a darle identidad visual a tu tienda. Sube tu logo principal:',
    field: 'logoUrl',
    type: 'image' as const,
    validation: { type: 'url' as const, required: false },
    optional: true,
  },

  {
    text: '🎨 ¡Hora de los colores! Elige tu color principal (será el color dominante de tu tienda):',
    field: 'primaryColor',
    type: 'color' as const,
    validation: { type: 'text' as const, required: true },
  },
  {
    text: 'Ahora elige un color secundario (para textos y elementos de apoyo):',
    field: 'secondaryColor',
    type: 'color' as const,
    validation: { type: 'text' as const, required: false },
    optional: true,
  },
  {
    text: 'Elige un color de acento (para botones y elementos destacados):',
    field: 'accentColor',
    type: 'color' as const,
    validation: { type: 'text' as const, required: false },
    optional: true,
  },
  {
    text: '📧 Información de contacto: ¿Cuál es tu email principal?',
    field: 'email',
    type: 'text' as const,
    validation: {
      type: 'email' as const,
      required: true,
      message: 'Por favor ingresa un email válido',
    },
  },
  {
    text: '📱 ¿Cuál es tu número de teléfono?',
    field: 'phone',
    type: 'text' as const,
    validation: { type: 'phone' as const, required: false, message: 'Formato: +57 300 123 4567' },
    optional: true,
  },
  {
    text: '📍 ¿Cuál es tu dirección completa?',
    field: 'address',
    type: 'text' as const,
    validation: { type: 'text' as const, required: false },
    optional: true,
  },
  {
    text: '¿En qué ciudad te encuentras?',
    field: 'city',
    type: 'select' as const,
    options: [
      'Bogotá',
      'Medellín',
      'Cali',
      'Barranquilla',
      'Cartagena',
      'Bucaramanga',
      'Manizales',
      'Pereira',
      'Cúcuta',
      'Santa Marta',
    ],
    validation: { type: 'text' as const, required: true, message: 'La ciudad es requerida' },
  },
  {
    text: '¿En qué departamento?',
    field: 'department',
    type: 'select' as const,
    options: [
      'Amazonas',
      'Antioquia',
      'Atlántico',
      'Bolívar',
      'Boyacá',
      'Caldas',
      'Caquetá',
      'Casanare',
      'Cauca',
      'Cesar',
      'Chocó',
      'Córdoba',
      'Cundinamarca',
      'Guaviare',
      'Guainía',
      'Huila',
      'La Guajira',
      'Magdalena',
      'Meta',
      'Nariño',
      'Norte de Santander',
      'Putumayo',
      'Quindío',
      'Risaralda',
      'San Andrés y Providencia',
      'Santander',
      'Sucre',
      'Tolima',
      'Valle del Cauca',
      'Vaupés',
      'Vichada',
    ],
    validation: { type: 'text' as const, required: true, message: 'El departamento es requerido' },
  },
  {
    text: '🏢 Información legal: ¿Qué tipo de negocio es?',
    field: 'businessType',
    type: 'select' as const,
    options: ['Persona Natural', 'SAS', 'LTDA', 'SA', 'Fundación', 'Cooperativa'],
    validation: { type: 'text' as const, required: true },
  },

  {
    text: '¿Cuál es tu número de identificación tributaria (NIT/RUT)?',
    field: 'taxId',
    type: 'text' as const,
    validation: { type: 'taxId' as const, required: false, message: 'Formato: 123456789-1' },
    optional: true,
  },
  {
    text: '¿Cuál es la razón social de tu empresa? (Si aplica)',
    field: 'businessName',
    type: 'text' as const,
    validation: { type: 'text' as const, required: false },
    optional: true,
  },
  {
    text: '📱 Redes sociales (opcional): ¿Tienes Facebook? Comparte tu URL:',
    field: 'facebookUrl',
    type: 'text' as const,
    validation: {
      type: 'url' as const,
      required: false,
      message: 'Ejemplo: https://facebook.com/tupagina',
    },
    optional: true,
  },
  {
    text: '📸 ¿Tienes Instagram? Comparte tu URL:',
    field: 'instagramUrl',
    type: 'text' as const,
    validation: {
      type: 'url' as const,
      required: false,
      message: 'Ejemplo: https://instagram.com/tuusuario',
    },
    optional: true,
  },
  {
    text: '🐦 ¿Tienes Twitter/X? Comparte tu URL:',
    field: 'twitterUrl',
    type: 'text' as const,
    validation: {
      type: 'url' as const,
      required: false,
      message: 'Ejemplo: https://twitter.com/tuusuario',
    },
    optional: true,
  },
  {
    text: '🎥 ¿Tienes YouTube? Comparte tu URL:',
    field: 'youtubeUrl',
    type: 'text' as const,
    validation: {
      type: 'url' as const,
      required: false,
      message: 'Ejemplo: https://youtube.com/c/tucanal',
    },
    optional: true,
  },
  {
    text: '🎵 ¿Tienes TikTok? Comparte tu URL:',
    field: 'tiktokUrl',
    type: 'text' as const,
    validation: {
      type: 'url' as const,
      required: false,
      message: 'Ejemplo: https://tiktok.com/@tuusuario',
    },
    optional: true,
  },
  {
    text: '📞 Por último, ¿tienes WhatsApp Business? Comparte tu número:',
    field: 'whatsappNumber',
    type: 'text' as const,
    validation: {
      type: 'whatsapp' as const,
      required: false,
      message: 'Formato: +57 300 123 4567',
    },
    optional: true,
  },
];

const defaultStoreData: StoreData = {
  name: '',
  userId: '',
  storeId: '',
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
  status: 'active',
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// @ts-ignore - suppress unused parameter-name warning in the function type annotation
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
  ];

  return (
    <div className="mt-2 space-y-3">
      <div className="flex gap-2 flex-wrap">
        {presetColors.map((color) => (
          <button
            key={color}
            onClick={() => onChange(color)}
            className={`w-8 h-8 rounded-full border-2 transition-transform ${
              value === color ? 'border-gray-800 scale-110' : 'border-gray-300'
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
          className="w-8 h-8 rounded border"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 px-3 py-1 border rounded text-sm font-mono"
          placeholder="#000000"
        />
      </div>
    </div>
  );
}

// GraphQL mutation to create a store
const CREATE_STORE = gql`
  mutation CreateStore($input: CreateStoreInput!) {
    createStore(input: $input) {
      id
      storeId
      name
      platform
      shopUrl
      status
      userId
      createdAt
      logoUrl
      faviconUrl
      bannerUrl
      primaryColor
      secondaryColor
      accentColor
      backgroundColor
      textColor
      email
      phone
      address
      city
      department
      country
      businessType
      taxId
      businessName
      facebookUrl
      instagramUrl
      twitterUrl
      youtubeUrl
      tiktokUrl
      whatsappNumber
      status
    }
  }
`;

// @ts-ignore - suppress unused parameter-name warning in the function type annotation
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
          className="px-3 py-2 bg-blue-50 hover:bg-blue-100 text-black rounded-lg text-sm transition-colors border hover:border-blue-300"
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default function InteractiveChatStore() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [input, setInput] = useState('');
  const [storeData, setStoreData] = useState<StoreData>(defaultStoreData);
  const [isTyping, setIsTyping] = useState(false);
  const [progress, setProgress] = useState(0);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);
  const [createdStoreId, setCreatedStoreId] = useState<string | null>(null);
  const chatRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const [showSummary, setShowSummary] = useState(false);

  const [createStoreMutation] = useMutation(CREATE_STORE);
  const session = useSessionStore();
  // hydrate session from server cookie if not present
  useEffect(() => {
    (async () => {
      try {
        if (!session?.user && session?.setUser) {
          const res = await fetch('/api/auth/me');
          if (!res.ok) return;
          const data = await res.json();
          const payload = data?.user?.payload;
          if (payload) {
            const userObj = {
              id: payload.sub || payload.user_id || payload.id || '',
              name: data.user?.name || payload.name || payload.email || '',
              email: payload.email || '',
              role: payload.role || 'user',
            } as any;
            session.setUser(userObj);
          }
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.warn('Failed to hydrate session from /api/auth/me', err);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // router not required here but kept for potential navigation flows
  // const router = useRouter();

  // Validation functions
  const validateInput = (
    value: string,
    validation: ValidationRule
  ): { isValid: boolean; error?: string } => {
    if (!validation.required && (!value || value.trim() === '')) {
      return { isValid: true };
    }

    if (validation.required && (!value || value.trim() === '')) {
      return { isValid: false, error: validation.message || 'Este campo es requerido' };
    }

    switch (validation.type) {
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          return { isValid: false, error: 'Por favor ingresa un email válido' };
        }
        break;

      case 'phone':
        const phoneRegex = /^(\+?\d{1,3}[\s-]?)?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{4}$/;
        if (value && !phoneRegex.test(value.replace(/\s/g, ''))) {
          return { isValid: false, error: 'Formato válido: +57 300 123 4567' };
        }
        break;

      case 'whatsapp':
        const whatsappRegex = /^(\+?\d{1,3}[\s-]?)?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{4}$/;
        if (value && !whatsappRegex.test(value.replace(/\s/g, ''))) {
          return { isValid: false, error: 'Formato válido: +57 300 123 4567' };
        }
        break;

      case 'url':
        if (value && value.trim() !== '') {
          // Accept blob: and data: temporary URLs (used by browser previews)
          if (
            value.startsWith('blob:') ||
            value.startsWith('data:') ||
            /s3[.-]amazonaws[.-]com/.test(value)
          ) {
            break;
          }

          const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
          if (!urlRegex.test(value)) {
            return { isValid: false, error: 'Por favor ingresa una URL válida' };
          }
        }
        break;

      case 'taxId':
        if (value && value.trim() !== '') {
          const taxIdRegex = /^\d{8,12}(-\d)?$/;
          if (!taxIdRegex.test(value)) {
            return { isValid: false, error: 'Formato válido: 123456789-1' };
          }
        }
        break;

      case 'text':
        if (validation.required && value.trim().length < 2) {
          return { isValid: false, error: 'Debe tener al menos 2 caracteres' };
        }
        break;
    }

    return { isValid: true };
  };

  useEffect(() => {
    // Initial bot message with typing animation
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages([
        {
          from: 'bot',
          text: questions[0].text,
          type: questions[0].type,
          options: questions[0].options,
          field: questions[0].field,
        },
      ]);
    }, 1000);
  }, []);

  useEffect(() => {
    setProgress((currentStep / questions.length) * 100);
  }, [currentStep]);

  // Auto-scroll to bottom on any message or typing change
  useEffect(() => {
    if (!bottomRef.current || !chatRef.current) return;
    try {
      bottomRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    } catch (e) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const addBotMessage = (questionIndex: number) => {
    if (questionIndex >= questions.length) {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            from: 'bot',
            text: '🎉 ¡Felicitaciones! Tu tienda está lista para ser creada. Hemos recopilado toda la información necesaria.',
            type: 'text',
          },
        ]);
        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.log('✅ Datos completos de la tienda:', storeData);
        }
      }, 1500);
      return;
    }

    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const question = questions[questionIndex];
      setMessages((prev) => [
        ...prev,
        {
          from: 'bot',
          text: question.text,
          type: question.type,
          options: question.options,
          field: question.field,
        },
      ]);
    }, 800);
  };

  const handleResponse = (value: string) => {
    const currentQuestion = questions[currentStep];
    const field = currentQuestion.field as keyof StoreData;

    // Normalize storeId if asking for it
    if (field === 'storeId') {
      let normalized = value.trim().toLowerCase();
      // replace spaces and hyphens with underscore, remove invalid chars
      normalized = normalized.replace(/[\s-]+/g, '_').replace(/[^a-z0-9_]/g, '');
      value = normalized;
    }

    // Validate input
    if (currentQuestion.validation) {
      const validation = validateInput(value, currentQuestion.validation);
      if (!validation.isValid) {
        setValidationError(validation.error || 'Entrada inválida');
        return;
      }
    }

    setValidationError(null);

    // 💬 Mensaje del usuario
    let displayValue = value;
    if ((!value || value.trim() === '') && currentQuestion.optional) {
      displayValue = '⏭️ Saltado';
    }
    setMessages((prev) => [...prev, { from: 'user', text: displayValue, type: 'text' }]);

    // 📦 Guardar en storeData
    setStoreData((prev) => ({ ...prev, [field]: value }));

    // 🚀 Avanzar o mostrar resumen
    if (currentStep + 1 < questions.length) {
      // Todavía hay más preguntas
      setCurrentStep((prev) => prev + 1);
      addBotMessage(currentStep + 1);
    } else {
      // ✅ Última pregunta → abrir StoreSummary automáticamente
      setCurrentStep(questions.length);
      setShowSummary(true);
    }

    // 🧹 Reset input
    setInput('');
  };

  const handleSkip = () => {
    const currentQuestion = questions[currentStep];
    if (currentQuestion.optional) {
      setValidationError(null);
      handleResponse('');
    }
  };

  const handleSend = () => {
    if (!input.trim() && !questions[currentStep]?.optional) return;
    handleResponse(input);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const renderMessageContent = (msg: Message) => {
    if (msg.from === 'user') {
      return <span>{msg.text}</span>;
    }

    switch (msg.type) {
      case 'image':
        return (
          <div>
            <span>{msg.text}</span>
            {currentStep === questions.findIndex((q) => q.field === msg.field) && (
              <div>
                <FileUpload
                  onFile={(url) => {
                    console.log('Image uploaded:', url);
                    // Actualizar storeData inmediatamente para mostrar preview
                    const field = msg.field as keyof StoreData;
                    setStoreData((prev) => ({ ...prev, [field]: url }));
                    // Avanzar después de un breve delay
                    setTimeout(() => handleResponse(url), 800);
                  }}
                  accept="image/*"
                />

                {storeData[msg.field as keyof StoreData] && (
                  <div className="mt-3">
                    <img
                      src={storeData[msg.field as keyof StoreData] as string}
                      alt="Logo preview"
                      className="h-20 w-20 object-contain rounded-lg border"
                    />
                    {/* Botón para continuar */}
                    <button
                      onClick={() =>
                        handleResponse(storeData[msg.field as keyof StoreData] as string)
                      }
                      className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm flex items-center gap-2"
                    >
                      <span>✓</span>
                      Continuar con esta imagen
                    </button>
                  </div>
                )}

                {msg.optional && (
                  <button
                    onClick={handleSkip}
                    className="mt-3 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors text-sm flex items-center gap-2"
                  >
                    <span>⏭️</span>
                    Saltar imagen
                  </button>
                )}
              </div>
            )}
          </div>
        );
      case 'color':
        return (
          <div>
            <span>{msg.text}</span>
            {currentStep === questions.findIndex((q) => q.field === msg.field) && (
              <div>
                <ColorPicker
                  value={storeData[msg.field as keyof StoreData] as string}
                  onChange={handleResponse}
                />
                {msg.optional && (
                  <button
                    onClick={handleSkip}
                    className="mt-3 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors text-sm flex items-center gap-2"
                  >
                    <span>⏭️</span>
                    Usar color por defecto
                  </button>
                )}
              </div>
            )}
          </div>
        );

      case 'select':
        return (
          <div>
            <span>{msg.text}</span>
            {currentStep === questions.findIndex((q) => q.field === msg.field) && msg.options && (
              <div>
                <SelectInput options={msg.options} onSelect={handleResponse} />
                {msg.optional && (
                  <button
                    onClick={handleSkip}
                    className="mt-3 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors text-sm flex items-center gap-2"
                  >
                    <span>⏭️</span>
                    Saltar selección
                  </button>
                )}
              </div>
            )}
          </div>
        );

      default:
        return <span>{msg.text}</span>;
    }
  };

  const getMessageIcon = (field?: string) => {
    const iconMap: { [key: string]: React.ReactNode } = {
      email: <Mail className="w-4 h-4" />,
      phone: <Phone className="w-4 h-4" />,
      address: <MapPin className="w-4 h-4" />,
      city: <MapPin className="w-4 h-4" />,
      department: <MapPin className="w-4 h-4" />,
      businessType: <Building className="w-4 h-4" />,
      primaryColor: <Palette className="w-4 h-4" />,
      secondaryColor: <Palette className="w-4 h-4" />,
      accentColor: <Palette className="w-4 h-4" />,
      facebookUrl: <Facebook className="w-4 h-4" />,
      instagramUrl: <Instagram className="w-4 h-4" />,
      twitterUrl: <Twitter className="w-4 h-4" />,
      youtubeUrl: <Youtube className="w-4 h-4" />,
      whatsappNumber: <MessageSquare className="w-4 h-4" />,
    };
    return iconMap[field || ''] || null;
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-slate-900 min-h-screen">
      <div className="bg-slate-800 rounded-3xl shadow-2xl overflow-hidden">
        {/* Header with progress */}
        <div className="bg-gradient-to-r from-indigo-900 to-slate-800 p-6 text-white">
          <h1 className="text-2xl font-bold mb-2 text-white">Creador de Tienda Online</h1>
          <div className="w-full bg-slate-700 rounded-full h-2 mb-2">
            <div
              className="bg-indigo-500 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-slate-300">
            Paso {currentStep + 1} de {questions.length} • {Math.round(progress)}% completado
          </p>
        </div>
        {/* Chat Area */}
        <div ref={chatRef} className="h-96 overflow-y-auto p-6 space-y-4 bg-slate-800">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-md p-4 rounded-2xl shadow-sm transform transition-all duration-300 hover:scale-[1.02] ${
                  msg.from === 'bot'
                    ? 'bg-slate-700 border-l-4 border-indigo-500 text-slate-200 animate-slide-in-left'
                    : 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white animate-slide-in-right'
                }`}
              >
                {msg.from === 'bot' && (
                  <div className="flex items-center gap-2 mb-2">
                    {getMessageIcon(msg.field)}
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  </div>
                )}
                {renderMessageContent(msg)}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-slate-700 p-4 rounded-2xl shadow-sm animate-pulse">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" />
                  <div
                    className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"
                    style={{ animationDelay: '0.1s' }}
                  />
                  <div
                    className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"
                    style={{ animationDelay: '0.2s' }}
                  />
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
        {/* Input Area */}
        {currentStep < questions.length &&
          !['image', 'color', 'select'].includes(questions[currentStep]?.type) && (
            <div className="p-6 bg-slate-800 border-t border-slate-700">
              {validationError && (
                <div className="mb-4 p-3 bg-red-900/40 border-l-4 border-red-500 text-red-300 rounded animate-pulse">
                  <div className="flex items-center gap-2">
                    <span className="text-red-400">⚠️</span>
                    {validationError}
                  </div>
                  {questions[currentStep]?.validation?.message && (
                    <p className="text-sm mt-1 text-red-300">
                      💡 {questions[currentStep]?.validation?.message}
                    </p>
                  )}
                </div>
              )}

              <div className="flex gap-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value);
                    setValidationError(null);
                  }}
                  onKeyPress={handleKeyPress}
                  placeholder={`Responde: ${questions[currentStep]?.text.split('?')[0]}...`}
                  className={`flex-1 px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors text-slate-200 placeholder-slate-400 ${
                    validationError
                      ? 'border-red-500 focus:border-red-400'
                      : 'border-slate-700 focus:border-indigo-500'
                  }`}
                />

                <div className="flex gap-2">
                  {questions[currentStep]?.optional && (
                    <button
                      onClick={handleSkip}
                      className="px-4 py-3 bg-slate-700 text-slate-200 rounded-xl hover:bg-slate-600 transition-all duration-200 transform hover:scale-105 flex items-center gap-2"
                      title="Saltar pregunta opcional"
                    >
                      <span>⏭️</span>
                      Saltar
                    </button>
                  )}

                  <button
                    onClick={handleSend}
                    disabled={!input.trim() && !questions[currentStep]?.optional}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Enviar
                  </button>
                </div>
              </div>

              {questions[currentStep]?.optional && (
                <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">
                  <span>💡</span>
                  Esta pregunta es opcional - puedes saltarla si no aplica
                </p>
              )}
            </div>
          )}

        {currentStep >= questions.length && (
          <div className="mt-6">
            {createdStoreId ? (
              // Mensaje de éxito cuando la tienda ya fue creada
              <div className="text-center space-y-4 py-6">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-white text-2xl">✓</span>
                </div>
                <h2 className="text-xl font-bold text-white">¡Tu tienda ha sido creada!</h2>
                <p className="text-slate-300">
                  Ahora puedes administrar y personalizar tu tienda desde el panel de
                  administración.
                </p>
                <a
                  href={`http://${createdStoreId}.emprendyup/admin/store`}
                  className="inline-block px-8 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors font-semibold transform hover:scale-105"
                >
                  Ir al panel de administración
                </a>
              </div>
            ) : (
              // Botón para revisar datos antes de crear (cuando aún no se ha creado)
              <>
                <button
                  onClick={() => setShowSummary(true)}
                  className="px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors"
                  disabled={creating}
                >
                  {creating ? 'Creando tienda...' : 'Revisar datos antes de crear'}
                </button>

                {/* Modal StoreSummary */}
                <StoreSummary
                  open={showSummary}
                  onClose={() => setShowSummary(false)}
                  data={storeData}
                  onConfirm={async (updatedData) => {
                    setCreateError(null);
                    setCreating(true);
                    try {
                      const input = {
                        ...updatedData,
                        status: 'active',
                        userId: session?.user?.id || 'anonymous',
                      };
                      const { data } = await createStoreMutation({ variables: { input } });
                      const created = data?.createStore;
                      if (created) {
                        setCreatedStoreId(created.storeId);
                        session.setCurrentStore?.(created as any);
                        session.addStore?.(created as any);
                      }
                      setShowSummary(false);
                    } catch (err: any) {
                      setCreateError(err?.message || 'Error al crear la tienda');
                    } finally {
                      setCreating(false);
                    }
                  }}
                />
              </>
            )}

            {/* Mostrar error si existe */}
            {createError && (
              <div className="mt-4 p-3 bg-red-900 border border-red-700 text-red-300 rounded">
                {createError}
              </div>
            )}

            {/* Mostrar estado de creación */}
            {creating && (
              <div className="mt-4 p-3 bg-blue-900 border border-blue-700 text-blue-300 rounded flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-blue-300 border-t-transparent rounded-full animate-spin"></div>
                Creando tienda...
              </div>
            )}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-slide-in-left {
          animation: slide-in-left 0.5s ease-out;
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
