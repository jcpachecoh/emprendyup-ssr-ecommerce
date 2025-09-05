'use client';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface Message {
  from: 'bot' | 'user';
  text: string;
  error?: boolean;
}

const questions = [
  { key: 'name', text: '¿Cuál es el nombre de tu emprendimiento?' },
  { key: 'subdomain', text: 'Elige un subdominio para tu tienda (ejemplo: mitienda).' },
  { key: 'logo', text: 'Por favor sube tu logo o describe cómo es.' },
  { key: 'colors', text: '¿Cuáles son los colores principales de tu marca?' },
  { key: 'categories', text: '¿Qué categorías de productos tendrás?' },
  { key: 'vision', text: '¿Cuál es la visión de tu emprendimiento?' },
];

export default function ChatTienda() {
  const [messages, setMessages] = useState<Message[]>([
    { from: 'bot', text: '👋 Hola, te ayudaré a crear tu tienda. Vamos paso a paso.' },
    { from: 'bot', text: questions[0].text },
  ]);
  const [step, setStep] = useState(0);
  const [input, setInput] = useState('');
  const [storeData, setStoreData] = useState<any>({});
  const [botTyping, setBotTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Autoscroll al final
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, botTyping]);

  // Validación de subdominio
  const validateSubdomain = (value: string): string | null => {
    const regex = /^[a-z0-9-]{3,30}$/;
    if (!regex.test(value)) {
      return '❌ El subdominio solo puede tener letras minúsculas, números o guiones (3–30 caracteres).';
    }
    if (value.startsWith('-') || value.endsWith('-')) {
      return '❌ El subdominio no puede empezar ni terminar con guion.';
    }
    // Simulación: "demo" ya está tomado
    if (value === 'demo') {
      return '⚠️ Este subdominio ya está en uso. Prueba con otro (ej: demo-shop).';
    }
    return null;
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const currentQuestion = questions[step];

    // Si estamos en la pregunta de subdominio → validar
    if (currentQuestion.key === 'subdomain') {
      const error = validateSubdomain(input.trim());
      if (error) {
        setMessages((prev) => [...prev, { from: 'user', text: input }]);
        setMessages((prev) => [...prev, { from: 'bot', text: error, error: true }]);
        setInput('');
        return;
      }
    }

    // Mensaje del usuario
    setMessages((prev) => [...prev, { from: 'user', text: input }]);

    // Guardar respuesta
    setStoreData((prev: any) => ({
      ...prev,
      [currentQuestion.key]: input,
    }));

    setInput('');

    const nextStep = step + 1;
    if (nextStep < questions.length) {
      setBotTyping(true);
      setTimeout(() => {
        setMessages((prev) => [...prev, { from: 'bot', text: questions[nextStep].text }]);
        setStep(nextStep);
        setBotTyping(false);
      }, 1000);
    } else {
      setMessages((prev) => [
        ...prev,
        { from: 'bot', text: '✅ ¡Perfecto! Ya tengo toda la información de tu tienda 🎉' },
      ]);
      console.log('📦 Datos finales de la tienda:', storeData);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-slate-900 rounded-2xl shadow-lg">
      {/* Chat */}
      <div className="h-96 overflow-y-auto space-y-3 mb-4 p-4 border rounded-lg bg-slate-50 dark:bg-slate-800 flex flex-col">
        {messages.map((msg, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`p-3 rounded-xl max-w-xs ${
              msg.from === 'bot'
                ? msg.error
                  ? 'bg-red-100 text-red-800 self-start'
                  : 'bg-blue-100 text-slate-800 self-start'
                : 'bg-green-500 text-white self-end'
            }`}
          >
            {msg.text}
          </motion.div>
        ))}

        {botTyping && (
          <div className="self-start text-slate-400 italic text-sm">El bot está escribiendo...</div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Escribe tu respuesta..."
          className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSend}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Enviar
        </button>
      </div>
    </div>
  );
}
